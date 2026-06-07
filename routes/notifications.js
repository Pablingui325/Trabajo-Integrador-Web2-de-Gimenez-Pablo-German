import express from "express";
import { doubleCsrfProtection } from "../app.js";

const router = express.Router();

// Estructura global en memoria para pruebas temporales
export let mockNotifications = [
  {
    id: 1,
    userId: "usuario_actual_id", // Simula el ID del usuario logueado
    type: "comment",
    sender: { userName: "marcos_foto" },
    photoId: 101,
    photoTitle: "Atardecer Atómico",
    isRead: false,
    createdAt: "Hace 5 minutos",
  },
  {
    id: 2,
    userId: "usuario_actual_id",
    type: "interest",
    sender: { userName: "comprador_anon" },
    photoId: 102,
    photoTitle: "Retrato Urbano",
    isRead: false,
    createdAt: "Hace 1 hora",
  },
];

// Obtener el listado de notificaciones del usuario
router.get("/notifications", (req, res) => {
  // Filtramos las notificaciones que pertenecen al usuario activo
  const userNotifs = mockNotifications.filter(
    (n) => n.userId === "usuario_actual_id",
  );

  res.render("notifications", {
    notifications: userNotifs,
    user: { loggedIn: true }, // Mock de sesión activa para el nav
  });
});

// Marcar notificación como leída (Punto obligatorio del requerimiento 5)
router.post("/notifications/:id/read", doubleCsrfProtection, (req, res) => {
  const notifId = parseInt(req.params.id);

  const notification = mockNotifications.find((n) => n.id === notifId);
  if (notification) {
    notification.isRead = true;
  }

  res.redirect("/notifications");
});

export default router;
