import express from "express";
import {
  registrarUsuario,
  loginUsuario,
} from "../controller/authController.js";
import { doubleCsrfProtection } from "../configuration/csrfConfig.js";

const router = express.Router();

const mockUsers = [];

router.get("/login", (req, res) => res.render("inicioSesion", { error: null }));
router.post("/login", doubleCsrfProtection, loginUsuario);

router.get("/signup", (req, res) =>
  res.render("crearUsuario", { error: null }),
);
router.post("/signup", doubleCsrfProtection, registrarUsuario);

export default router;
