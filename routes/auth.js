import express from "express";
import { doubleCsrfProtection } from "../app.js";

const router = express.Router();

const mockUsers = [];

router.get("/login", (req, res) => {
  res.render("inicioSesion", {
    error: null,
    success: null,
  });
});

router.post("/login", doubleCsrfProtection, (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).render("inicioSesion", {
      error: "Por favor, completa todos los campos obligatorios.",
    });
  }
  if (email === "admin" && password === "123456") {
    return res.redirect("/feed");
  }

  res.status(401).render("inicioSesion", {
    error: "Credenciales incorrectas. Verificá tu correo y contraseña.",
  });
});

router.get("/signup", (req, res) => {
  res.render("crearUsuario", {
    error: null,
  });
});

router.post("/signup", doubleCsrfProtection, (req, res) => {
  const { email, userName, password, confirmPassword, terms } = req.body;

  if (!terms) {
    return res.status(400).render("crearUsuario", {
      error:
        "Debés leer y aceptar las normas de comportamiento de Fotaza para registrarte.",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).render("crearUsuario", {
      error: "Las contraseñas no coinciden. Intenta de nuevo.",
    });
  }

  if (password.length < 6) {
    return res.status(400).render("crearUsuario", {
      error: "La contraseña es muy débil. Debe tener al menos 6 caracteres.",
    });
  }

  const newUser = {
    id: Date.now(),
    email,
    userName,
    createdAt: new Date(),
  };
  mockUsers.push(newUser);

  console.log("Nuevo usuario registrado en el sistema:", newUser);

  res.render("inicioSesion", {
    success: `¡Cuenta creada con éxito para @${userName}! Ya podés iniciar sesión de forma segura.`,
    error: null,
  });
});

router.get("/logout", (req, res) => {
  res.redirect("/login");
});

export default router;
