import { Notification, User } from "../models/sync.js";

// 1. Obtener las notificaciones del usuario actual
export const obtenerNotificaciones = async (req, res) => {
  const usuarioId = req.session.usuarioId; // Obtenemos el ID del usuario en sesión

  if (!usuarioId) {
    return res.redirect("/login");
  }

  try {
    // Buscamos en PostgreSQL las notificaciones dirigidas a este usuario
    const notificaciones = await Notification.findAll({
      where: { usuarioDestinoId: usuarioId },
      order: [["fecha", "DESC"]], // Las más recientes primero
    });

    // Le pasamos las notificaciones reales a la vista de Pug
    res.render("notifications", { notificaciones });
  } catch (error) {
    console.error("Error al obtener notificaciones:", error);
    res.status(500).send("Error en el servidor.");
  }
};

// 2. Marcar una notificación como leída (Requisito Obligatorio del TPI)
export const marcarComoLeida = async (req, res) => {
  const { id } = req.params; // ID de la notificación enviado por la URL

  try {
    const notificacion = await Notification.findByPk(id);
    if (notificacion) {
      notificacion.leida = true; // O el nombre de columna que uses (ej: estado)
      await notificacion.save();
    }
    res.redirect("/notifications");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar la notificación.");
  }
};
