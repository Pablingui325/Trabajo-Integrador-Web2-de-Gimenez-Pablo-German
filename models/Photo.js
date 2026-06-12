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
      type: DataTypes.STRING, // Ampliado por si las URLs de almacenamiento son largas
      allowNull: false,
    },
    licenseType: {
      type: DataTypes.ENUM("copyright", "no_copyright"), // Sincronizado en minúsculas con Pug y Rutas
      allowNull: false,
    },
    watermarkText: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    commentsOpen: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Pasa a true si reportCount > 3 (Congela visualización pública)
    },
    // Datos de Negociación Comercial
    isForSale: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0.0,
    },
    // Contadores denormalizados para optimizar las consultas del Home y Búsqueda
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
    timestamps: true,
  },
);
