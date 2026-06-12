import express from "express";
import {
  obtenerNotificaciones,
  marcarComoLeida,
} from "../controller/notificationController.js";

const router = express.Router();

// Cambiamos tu función anónima por la llamada al controlador de la BD
router.get("/notifications", obtenerNotificaciones);

// Nueva ruta POST o GET necesaria para cumplir con: "Debe poder marcarse una notificación como leída"
router.post("/notifications/read/:id", marcarComoLeida);

export default router;
