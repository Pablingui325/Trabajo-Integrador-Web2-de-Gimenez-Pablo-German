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
    reason: {
      type: DataTypes.ENUM(
        "derechos_autor",
        "contenido_inapropiado",
        "acoso_odio",
        "spam",
        "otro",
      ),
      allowNull: false,
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    photoId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Relación directa con la foto denunciada (enviada desde el input hidden)
    },
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Queda nulo si la denuncia fue hecha directamente a la publicación y no a un comentario
    },
  },
  {
    sequelize,
    modelName: "Report",
    tableName: "report",
    timestamps: true,
  },
);
