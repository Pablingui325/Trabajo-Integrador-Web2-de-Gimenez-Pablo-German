import User from "../models/User.js";
import Photo from "../models/Photo.js";

export const verPerfil = async (req, res) => {
  const { id } = req.params; // ID del usuario cuyo perfil queremos ver
  const miId = req.session.usuarioId;

  try {
    const usuarioPerfil = await User.findByPk(id, {
      include: [
        { model: Photo, as: "Photos" }, // Traer sus publicaciones
        { model: User, as: "Seguidores" }, // Para contar fans
      ],
    });

    if (!usuarioPerfil) {
      return res.status(404).send("Usuario no encontrado");
    }

    // Verificar si yo ya sigo a este usuario
    const loSigo = usuarioPerfil.Seguidores.some((seg) => seg.id === miId);

    res.render("profile", {
      usuario: usuarioPerfil,
      loSigo,
      miId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar el perfil");
  }
};

export const toggleSeguir = async (req, res) => {
  const { id } = req.params; // ID del usuario a seguir/dejar de seguir
  const miId = req.session.usuarioId;

  if (!miId) return res.redirect("/login");
  if (parseInt(id) === miId)
    return res.status(400).send("No podés seguirte a vos mismo");

  try {
    const yo = await User.findByPk(miId);
    const creador = await User.findByPk(id);
    const yaLoSigo = await yo.hasSeguido(creador);

    if (yaLoSigo) {
      await yo.removeSeguido(creador); // Dejar de seguir
    } else {
      await yo.addSeguido(creador); // Seguir
    }

    res.redirect(`/user/profile/${id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al procesar la acción de seguimiento");
  }
};
