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
    eventType: {
      type: DataTypes.ENUM("Comment", "Rating", "Interested", "Follow"),
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    referenceId: {
      type: DataTypes.INTEGER,
      allowNull: true, // ID de la foto o entidad relacionada al evento si aplica
    },
  },
  {
    sequelize,
    modelName: "Notification",
    tableName: "notification",
    timestamps: true,
  },
);
