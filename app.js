import "dotenv/config";
import express from "express";
import {
  doubleCsrfProtection,
  generateCsrfToken,
} from "./configuration/csrfConfig.js";

import authRutes from "./routes/auth.js";
import photoRutes from "./routes/photos.js";
import notificationRoutes from "./routes/notifications.js";
import collectionRoutes from "./routes/collections.js";
import messageRoutes from "./routes/messages.js";
import userRoutes from "./routes/users.js";
import sequelize from "./models/config.js";
import "./models/sync.js";

const app = express();
const PORT = process.env.PORT;

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(COOKIE_SECRET));

app.use((req, res, next) => {
  res.locals.csrfToken = generateCsrfToken(req, res);
  next();
});

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.use("/", authRutes);
app.use("/", photoRutes);
app.use("/", notificationRoutes);
app.use("/", collectionRoutes);
app.use("/", messageRoutes);
app.use("/", userRoutes);

app.use((error, req, res, next) => {
  if (error.code === "EBADCSRFTOKEN") {
    return res.status(403).render("inicioSesion", {
      error: "Error de seguridad: Formulario vencido. Intentalo de nuevo.",
    });
  }
  console.error(error);
  res.status(500).send("Ocurrio un error interno en el servidor.");
});

//CONEXION A BD
async function main() {
  try {
    await sequelize.sync({ force: true });
    console.log("Base de datos sincronizada correctamente.");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto:${PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar o sincronizar la base de datos:", error);
  }
}

main();
