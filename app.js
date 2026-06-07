import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import { doubleCsrf } from "csrf-csrf";

import authRutes from "./routes/auth.js";
import photoRutes from "./routes/photos.js";
import notificationRoutes from "./routes/notifications.js";
import collectionRoutes from "./routes/collections.js";

const app = express();
const PORT = process.env.PORT;
const COOKIE_SECRET = process.env.COOKIE_SECRET;

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(COOKIE_SECRET));

export const { doubleCsrfProtection, generateCsrfToken } = doubleCsrf({
  getSecret: () => COOKIE_SECRET,
  cookieName: "x-csrf-token",
  cookieOptions: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  },
  size: 64,
  ignoredMethods: ["GET", "HEAD", "OPTIONS"],
  getTokenFromRequest: (req) => req.body._csrf,
  getSessionIdentifier: (req) => "fotaza-session-id",
});

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

app.use((error, req, res, next) => {
  if (error.code === "EBADCSRFTOKEN") {
    return res.status(403).render("inicioSesion", {
      error: "Error de seguridad: Formulario vencido. Intentalo de nuevo.",
    });
  }
  console.error(error);
  res.status(500).send("Ocurrio un error interno en el servidor.");
});

app.listen(PORT, (err) => {
  if (err) {
    console.error("Error al iniciar el servidor:", err);
    return;
  }
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
