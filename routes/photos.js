import express from "express";
import {
  mostrarFeed,
  mostrarDetalleFoto,
  crearPublicacion,
  comentarFoto,
  denunciarFoto,
  valorarFoto,
  buscarFotos,
} from "../controller/photoController.js";
import { doubleCsrfProtection } from "../configuration/csrfConfig.js";

const router = express.Router();

// --- GESTIÓN DE CONTENIDOS (Vistas y Acciones) ---

// Muestra las publicaciones en la Home (manejando el balance con/sin Copyright)
router.get("/feed", mostrarFeed);

// Formulario para subir una foto nueva
router.get("/upload", (req, res) => res.render("upload"));
// Acción de crear la publicación (Guarda en la BD la imagen, etiquetas y licencia)
router.post("/upload", doubleCsrfProtection, crearPublicacion);

// Ver el detalle de una foto específica (pasa la foto, sus comentarios y valoraciones)
router.get("/photo-detail/:id", mostrarDetalleFoto);

// Agregar un comentario a una publicación
router.post("/photo-detail/:id/comment", doubleCsrfProtection, comentarFoto);

// Denunciar una publicación o comentario (Activa la lógica de las 3 denuncias y baja automática)
router.post("/photo-detail/:id/report", doubleCsrfProtection, denunciarFoto);

// Valorar una imagen (Controla que el usuario vote una sola vez y calcula el promedio)
router.post("/photo-detail/:id/rate", doubleCsrfProtection, valorarFoto);

// --- MOTOR DE BÚSQUEDA ---
// Procesa los filtros combinados ingresados en search.pug
router.get("/search/results", buscarFotos);

export default router;
