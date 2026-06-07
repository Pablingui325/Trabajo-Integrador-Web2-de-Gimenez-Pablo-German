import express from "express";
import multer from "multer";
import path from "path";
import { doubleCsrfProtection } from "../app.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("El archivo subido no es una imagen válida."), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Arreglo global en memoria para simular la base de datos de publicaciones
export let mockPhotos = [];

// 1. RUTA GET: Renderizar el formulario de subida (upload.pug)
router.get("/upload", (req, res) => {
  res.render("upload", {
    user: { loggedIn: true }, // Simulación de sesión activa
  });
});

// 2. RUTA POST: Procesar la publicación de la foto (Requerimiento 2)
// NOTA: 'upload.single' procesa el archivo ANTES de que el validador CSRF verifique el body
router.post(
  "/upload",
  upload.single("photoFile"),
  doubleCsrfProtection,
  (req, res) => {
    const {
      title,
      description,
      tags,
      licenseType,
      watermarkText,
      isForSale,
      price,
    } = req.body;

    // Validación de archivo obligatorio
    if (!req.file) {
      return res.status(400).render("upload", {
        error: "Debes seleccionar un archivo de imagen válido para publicar.",
        user: { loggedIn: true },
      });
    }

    // Validación de negocio: El requerimiento exige al menos 1 etiqueta
    if (!tags || tags.trim() === "") {
      return res.status(400).render("upload", {
        error: "Debes asociar al menos una etiqueta (tag) a tu publicación.",
        user: { loggedIn: true },
      });
    }

    // Procesar las etiquetas ingresadas por comas en un arreglo limpio de strings
    const processedTags = tags
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag) => tag !== "");

    // REQUERIMIENTO 2: Configuración estricta de licencias y marcas de agua
    const hasCopyright = licenseType === "copyright";

    // Si tiene copyright, guardamos el texto de la marca de agua (o uno por defecto)
    let finalWatermarkText = null;
    if (hasCopyright) {
      finalWatermarkText =
        watermarkText && watermarkText.trim() !== ""
          ? watermarkText.trim()
          : "© Fotaza Protegido";
    }

    // Estructura de la publicación conforme al pliego de requerimientos mínimos
    const newPhoto = {
      id: Date.now(),
      url: `/uploads/${req.file.filename}`, // Ruta web accesible del archivo guardado
      title: title.trim(),
      description: description ? description.trim() : "",
      tags: processedTags,
      hasCopyright: hasCopyright,
      hasWatermark: hasCopyright, // Habilita el renderizado visual de la marca de agua
      watermarkText: finalWatermarkText,
      isForSale: isForSale === "true",
      price: isForSale === "true" ? parseFloat(price) || 0 : null,
      ratingAverage: 0, // Inicia sin votaciones (Req 2)
      ratingCount: 0,
      commentsCount: 0,
      denunciasCount: 0, // Para el sistema de control del validador de contenidos
      isFrozen: false, // Bloquea modificaciones si recibe una denuncia
      author: {
        userName: "fotografo_demo",
        avatarUrl: "/images/default-avatar.png",
      },
      createdAt: new Date().toLocaleDateString(),
    };

    // Guardar en nuestro almacenamiento temporal
    mockPhotos.push(newPhoto);
    console.log(
      "Nueva publicación guardada de forma segura en memoria:",
      newPhoto,
    );

    // Redirigir al Home para visualizar el contenido publicado
    res.redirect("/home");
  },
);

export default router;
