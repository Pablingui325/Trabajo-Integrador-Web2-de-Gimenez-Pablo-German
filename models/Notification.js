import { DataTypes, Model } from "sequelize";
import sequelize from "./config.js";

export class Notification extends Model {}

Notification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM("comment", "rate", "interest", "follow"),
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    photoId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Queda nulo si el tipo de evento es 'follow'
    },
    photoTitle: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Notification",
    tableName: "notification",
    timestamps: true,
  },
);
