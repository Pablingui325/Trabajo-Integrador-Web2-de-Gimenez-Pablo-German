import { DataTypes, Model } from "sequelize";
import sequelize from "./config.js";

export class Report extends Model {}

Report.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    targetType: {
      type: DataTypes.ENUM("Photo", "Comment"),
      allowNull: false, // Define si la denuncia va a una foto o a un comentario
    },
    targetId: {
      type: DataTypes.INTEGER,
      allowNull: false, // ID de la foto o comentario denunciado
    },
    reason: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Report",
    tableName: "report",
    timestamps: true,
  },
);
