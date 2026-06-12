import { Comment, Photo, User } from "../models/sync.js";

// 1. Enviar o iniciar mensaje de "Me interesa"
export const enviarMensaje = async (req, res) => {
  const { receiverId, contenido } = req.body;
  const senderId = req.session.usuarioId; // Obtenido de la sesión del usuario logueado

  if (!senderId) return res.redirect("/login");

  try {
    await Message.create({
      senderId,
      receiverId,
      contenido:
        contenido ||
        "Hola, me interesa adquirir tu imagen. ¿Cómo podemos coordinar?",
    });

    // Redireccionar a la bandeja de entrada o al chat específico
    res.redirect(`/messages/chat/${receiverId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al enviar mensaje");
  }
};

// 2. Mostrar la conversación entre dos usuarios
export const verChat = async (req, res) => {
  const { chatUserId } = req.params; // El ID del otro usuario
  const miId = req.session.usuarioId;

  if (!miId) return res.redirect("/login");

  try {
    // Buscar todos los mensajes enviados entre ellos dos
    const mensajes = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: miId, receiverId: chatUserId },
          { senderId: chatUserId, receiverId: miId },
        ],
      },
      order: [["createdAt", "ASC"]], // Orden cronológico
      include: [{ model: User, as: "Remitente", attributes: ["userName"] }],
    });

    const otroUsuario = await User.findByPk(chatUserId);

    res.render("message", { mensajes, otroUsuario, miId });
  } catch (error) {
    res.status(500).send("Error al cargar el chat");
  }
};
