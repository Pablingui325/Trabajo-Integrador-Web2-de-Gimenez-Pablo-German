import express from "express";
import { enviarMensaje, verChat } from "../controller/messageController.js";
import { doubleCsrfProtection } from "../configuration/csrfConfig.js";

const router = express.Router();

// Ruta para procesar el envío de un mensaje
router.post("/send", doubleCsrfProtection, enviarMensaje);

// Ruta para ver el chat con un usuario específico
router.get("/chat/:chatUserId", verChat);

export default router;
