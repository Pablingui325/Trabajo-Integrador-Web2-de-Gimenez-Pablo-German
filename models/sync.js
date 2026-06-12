import { User } from "./User.js";
import { Photo } from "./Photo.js";
import { Comment } from "./Comment.js";
import { Report } from "./Report.js";
import { Message } from "./Message.js";
import { Notification } from "./Notification.js";
import { Collection } from "./Collection.js";

// Relación Usuario <-> Fotos (Autoría)
User.hasMany(Photo, { foreignKey: "userId", as: "photos" });
Photo.belongsTo(User, { foreignKey: "userId", as: "author" });

// Relación Fotos <-> Comentarios <-> Usuarios
Photo.hasMany(Comment, { foreignKey: "photoId", as: "comments" });
Comment.belongsTo(Photo, { foreignKey: "photoId" });

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId", as: "commenter" });

// Denuncias (Reportes)
User.hasMany(Report, { foreignKey: "userId" });
Report.belongsTo(User, { foreignKey: "userId", as: "reporter" });

// Sincronizado con la estructura relacional directa
Photo.hasMany(Report, { foreignKey: "photoId", as: "reports" });
Report.belongsTo(Photo, { foreignKey: "photoId", as: "reportedPhoto" });

//Valoraciones (Muchos a Muchos: Evita votos duplicados)
User.belongsToMany(Photo, {
  through: "Rating",
  foreignKey: "userId",
  as: "ratedPhotos",
});
Photo.belongsToMany(User, {
  through: "Rating",
  foreignKey: "photoId",
  as: "voters",
});

// Mensajería Privada (Negociación Comercial)
User.hasMany(Message, { foreignKey: "senderId", as: "sentMessages" });
User.hasMany(Message, { foreignKey: "receiverId", as: "receivedMessages" });
Message.belongsTo(User, { foreignKey: "senderId", as: "sender" });
Message.belongsTo(User, { foreignKey: "receiverId", as: "receiver" });

// Vinculación esencial de la foto que originó el chat privado comercial
Photo.hasMany(Message, { foreignKey: "photoId", as: "commercialMessages" });
Message.belongsTo(Photo, { foreignKey: "photoId", as: "linkedPhoto" });

// Seguidores (Muchos a Muchos Autovinculada)
User.belongsToMany(User, {
  through: "Follower",
  as: "followers",
  foreignKey: "followingId",
  otherKey: "followerId",
});

User.belongsToMany(User, {
  through: "Follower",
  as: "following",
  foreignKey: "followerId",
  otherKey: "followingId",
});

// Notificaciones (Flujo del Feed de Actividad)
User.hasMany(Notification, { foreignKey: "receiverId", as: "notifications" });
User.hasMany(Notification, {
  foreignKey: "senderId",
  as: "triggeredNotifications",
});
Notification.belongsTo(User, { foreignKey: "receiverId", as: "receiver" });
Notification.belongsTo(User, { foreignKey: "senderId", as: "actor" });

// Relación opcional directa con la foto que originó la notificación
Photo.hasMany(Notification, {
  foreignKey: "photoId",
  as: "photoNotifications",
});
Notification.belongsTo(Photo, { foreignKey: "photoId", as: "targetPhoto" });

// Colecciones y Favoritos
User.hasMany(Collection, { foreignKey: "userId", as: "collections" });
Collection.belongsTo(User, { foreignKey: "userId" });

// Relación Muchos a Muchos: Álbumes del usuario
Collection.belongsToMany(Photo, {
  through: "CollectionPhotos",
  foreignKey: "collectionId",
  as: "photos",
});
Photo.belongsToMany(Collection, {
  through: "CollectionPhotos",
  foreignKey: "photoId",
  as: "collections",
});

// Favoritos directos (Mesa de luz / Guardados rápidos de la comunidad)
User.belongsToMany(Photo, {
  through: "Favorites",
  foreignKey: "userId",
  as: "favoritePhotos",
});
Photo.belongsToMany(User, {
  through: "Favorites",
  foreignKey: "photoId",
  as: "favoritedBy",
});

export { User, Photo, Comment, Report, Message, Notification, Collection };
