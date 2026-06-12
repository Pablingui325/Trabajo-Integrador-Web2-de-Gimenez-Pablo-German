import express from "express";
import { verPerfil, toggleSeguir } from "../controller/userController.js";
import { doubleCsrfProtection } from "../configuration/csrfConfig.js";

const router = express.Router();

// Ver el perfil público de cualquier usuario (para ver sus fotos y sus seguidores)
router.get("/user/profile/:id", verPerfil);

// Ruta para seguir o dejar de seguir a un creador (Toggle)
router.post("/user/follow/:id", doubleCsrfProtection, toggleSeguir);

export default router;
