import { User } from "./User.js";
import { Photo } from "./Photo.js";
import { Comment } from "./Comment.js";
import { Report } from "./Report.js";
import { Message } from "./Message.js";
import { Notification } from "./Notification.js";
import { Collection } from "./Collection.js";

// 1. Relación Usuario <-> Fotos (Autoría)
User.hasMany(Photo, { foreignKey: "userId", as: "photos" });
Photo.belongsTo(User, { foreignKey: "userId", as: "author" });

// 2. Relación Fotos <-> Comentarios
Photo.hasMany(Comment, { foreignKey: "photoId", as: "comments" });
Comment.belongsTo(Photo, { foreignKey: "photoId" });
User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId", as: "commenter" });

// 3. Denuncias (Relación con el usuario que denuncia)
User.hasMany(Report, { foreignKey: "userId" });
Report.belongsTo(User, { foreignKey: "userId", as: "reporter" });

// 4. Valoraciones (Muchos a Muchos entre Usuario y Foto para evitar votos duplicados)
// Guarda el voto individual, alimenta los campos de Photo de forma automatizada
User.belongsToMany(Photo, { through: "Rating", as: "ratedPhotos" });
Photo.belongsToMany(User, { through: "Rating", as: "voters" });

// 5. Mensajería Privada (Remitente y Destinatario)
User.hasMany(Message, { foreignKey: "senderId", as: "sentMessages" });
User.hasMany(Message, { foreignKey: "receiverId", as: "receivedMessages" });
Message.belongsTo(User, { foreignKey: "senderId", as: "Remitente" });
Message.belongsTo(User, { foreignKey: "receiverId", as: "Destinatario" });
Photo.hasMany(Message, { foreignKey: "photoId" }); // Vincula sobre qué foto nació el interés

// 6. Seguidores (Muchos a Muchos autovinculada con la tabla User)
User.belongsToMany(User, {
  through: "Follower",
  as: "followers",
  foreignKey: "followingId",
});
User.belongsToMany(User, {
  through: "Follower",
  as: "following",
  foreignKey: "followerId",
});

// 7. Notificaciones (Quién la recibe y quién disparó la acción)
User.hasMany(Notification, { foreignKey: "receiverId", as: "notifications" });
User.hasMany(Notification, { foreignKey: "senderId", as: "triggerUser" });
Notification.belongsTo(User, { foreignKey: "receiverId" });
Notification.belongsTo(User, { foreignKey: "senderId", as: "actor" });

// 8. Colecciones y Favoritos
User.hasMany(Collection, { foreignKey: "userId", as: "collections" });
Collection.belongsTo(User, { foreignKey: "userId" });

// Colección contiene muchas Fotos / Fotos pertenecen a muchas Colecciones
Collection.belongsToMany(Photo, { through: "CollectionPhotos", as: "photos" });
Photo.belongsToMany(Collection, {
  through: "CollectionPhotos",
  as: "collections",
});

// Favoritos directos del usuario (sin necesidad de crear una colección formal)
User.belongsToMany(Photo, { through: "Favorites", as: "favoritePhotos" });
Photo.belongsToMany(User, { through: "Favorites", as: "favoritedBy" });

export { User, Photo, Comment, Report, Message, Notification, Collection };
