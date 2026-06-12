import { DataTypes, Model } from "sequelize";
import sequelize from "./config.js";

export class Message extends Model {}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    contenido: {
      type: DataTypes.TEXT,
      allowNull: false, // Emparejado con el input oculto que envía "Me interesa comprar tu fotografía..."
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Message",
    tableName: "message",
    timestamps: true,
  },
);
