import { DataTypes, Model } from "sequelize";
import sequelize from "./config.js";

export class Collection extends Model {}

Collection.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false, // Ej: "Paisajes", "Ideas"
    },
  },
  {
    sequelize,
    modelName: "Collection",
    tableName: "collection",
    timestamps: true,
  },
);
