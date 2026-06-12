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
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    reportCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0, //permite al autor moderar o disparar revisiones
    },
  },
  {
    sequelize,
    modelName: "Comment",
    tableName: "comment",
    timestamps: true,
  },
);
