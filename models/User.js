import { DataTypes, Model } from "sequelize";
import sequelize from "./config.js";
import bcrypt from "bcryptjs";

export class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    birthDay: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("Masculino", "Femenino", "Otro"),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      set(value) {
        // este metodo 'set' intercepta la contraseña en texto plano antes de guardarla
        const salt = bcrypt.genSaltSync(10); //genera una clave aleatoria unica (salt)
        const hash = bcrypt.hashSync(value, salt); //mezcla la contraseña con el salt
        this.setDataValue("password", hash); //guarda el resultado encriptado
      },
    },
  },
  {
    sequelize, // necesario para conectarse a la bd
    modelName: "User", //nombre del modelo
    tableName: "user", //nombre de la tabla
    createdAt: true, //cada vez que crea un usuario coloca la fecha de creacion
    deletedAt: true, //cada vez que elimina un usuario coloca la fecha de creacion
  },
);
