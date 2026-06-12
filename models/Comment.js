import { DataTypes, Model } from "sequelize";
import sequelize from "./config.js";

export class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    reportCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // Permite al autor ver de forma organizada cuáles borrar
    },
  },
  {
    sequelize,
    modelName: "Comment",
    tableName: "comment",
    timestamps: true,
  },
);
