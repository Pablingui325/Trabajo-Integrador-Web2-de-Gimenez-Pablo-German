import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import { doubleCsrf } from "csrf-csrf";
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const COOKIE_SECRET = "un_secreto_muy_largo_y_seguro_123456";
app.use(cookieParser(COOKIE_SECRET));

app.set("view engine", "pug");
app.set("views", "./views");

const { doubleCsrfProtection, generateCsrfToken } = doubleCsrf({
  getSecret: () => COOKIE_SECRET,
  cookieName: "x-csrf-token",
  cookieOptions: {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
  },
  size: 64,
  ignoredMethods: ["GET", "HEAD", "OPTIONS"],
  getTokenFromRequest: (req) => req.body._csrf,
  getSessionIdentifier: (req) =>
    req.cookies[COOKIE_SECRET] || "usuario-anonimo",
});

app.get("/", (req, res, next) => {
  const token = generateCsrfToken(req, res);
  res.locals.csrfToken = token;
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("inicioSesion");
});

app.get("/crear-usuario", (req, res) => {
  res.render("crearUsuario");
});

app.post("/crear-usuario", doubleCsrfProtection, (req, res) => {
  const { firstName, lastName, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).send("Las contraseñas no coinciden");
  }
  res.send(
    `Usuario ${fistName} ${lastName} creado de manera segura. ¡El token CSRF funcionó!`,
  );
});

app.use((error, req, res, next) => {
  if (error.code === "EBADCSRFTOKEN") {
    return res
      .status(403)
      .send("Error de seguridad: Sesión inválida o formulario caducado.");
  }
  next(error);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
