import User from "../models/User.js";
import bcrypt from "bcrypt"; //para encriptar contraseñas antes de guardar

export const registrarUsuario = async (req, res) => {
  const { email, userName, password, confirmPassword, terms } = req.body;

  //validaciones existentes...
  if (!terms) {
    return res
      .status(400)
      .render("crearUsuario", { error: "Debes aceptar los terminos." });
  }
  if (password !== confirmPassword) {
    return res
      .status(400)
      .render("crearUsuario", { error: "Las contraseñas no coinciden." });
  }

  try {
    //verificar si el correo o usuario ya existen en la BD
    const usuarioExiste = await User.findOne({ where: { email } });
    if (usuarioExiste) {
      return res
        .status(400)
        .render("crearUsuario", { error: "El correo ya esta registrado." });
    }

    //encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    //guardar en base de datos
    await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    //redireccionar al login tras el registro exitoso
    res.redirect("/login");
  } catch (error) {
    console.error("Error al registrar:", error);
    res
      .status(500)
      .render("crearUsuario", { error: "Ocurrio un error en el servidor." });
  }
};

export const loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    //buscar en la base de datos
    const usuario = await User.findOne({ where: { email } });
    if (!usuario) {
      return res
        .status(401)
        .render("inicioSesion", { error: "Creedenciales incorrectas." });
    }

    //validar contraseña
    const passwordCorrecto = await bcrypt.compare(password, usuario.password);
    if (!passwordCorrecto) {
      return res
        .status(401)
        .render("inicioSesion", { error: "Credenciales incorrectas." });
    }

    //guardar sesion
    req.session.usuarioId = usuario.id;
    req.session.userName = usuario.userName;

    res.redirect("/feed");
  } catch (error) {
    res.status(500).render("inicioSesion", { error: "Error en el servidor." });
  }
};
