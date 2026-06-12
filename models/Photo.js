import { DataTypes, Model } from "sequelize";
import sequelize from "./config.js";

export class Photo extends Model {}

Photo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    licenseType: {
      type: DataTypes.ENUM("Copyright", "Sin Copyright"),
      allowNull: false,
    },
    watermarkText: {
      type: DataTypes.STRING(100),
      allowNull: true, // Solo si es Copyright y el autor quiere personalizarlo
    },
    commentsOpen: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Se congela la edición si tiene denuncias
    },
    // Contadores denormalizados para optimizar el Home y las búsquedas potentes
    ratingAverage: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    ratingCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    reportCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Photo",
    tableName: "photo",
    timestamps: true, // Habilita createdAt y updatedAt automáticamente
  },
);
