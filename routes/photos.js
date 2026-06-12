import { Router } from "express";
import { photoController } from "../controller/photoController.js";
import { doubleCsrfProtection } from "../configuration/csrfConfig.js";

const router = express.Router();

router.get("/feed", photoController);

// Formulario para subir una foto nueva
router.get("/upload", photoController.createPhoto);
// Acción de crear la publicación (Guarda en la BD la imagen, etiquetas y licencia)
router.post("/upload", doubleCsrfProtection);

// Ver el detalle de una foto específica (pasa la foto, sus comentarios y valoraciones)
router.get("/photo-detail/:id", photoController.getPhotoDetail);

// Agregar un comentario a una publicación
router.post("/photo-detail/:id/comment", doubleCsrfProtection);

// Denunciar una publicación o comentario (Activa la lógica de las 3 denuncias y baja automática)
router.post("/photo-detail/:id/report", doubleCsrfProtection);

// Valorar una imagen (Controla que el usuario vote una sola vez y calcula el promedio)
router.post("/photo-detail/:id/rate", doubleCsrfProtection);

// Procesa los filtros combinados ingresados en search.pug
router.get("/search/results", photoController.searchPhotos);

export default router;
