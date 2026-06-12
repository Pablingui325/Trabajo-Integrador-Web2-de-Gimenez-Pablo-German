import express from "express";
import {
  listarColecciones,
  crearColecciónPersonalizada,
  guardarEnColeccion,
} from "../controller/collectionController.js";
import { doubleCsrfProtection } from "../configuration/csrfConfig.js";

const router = express.Router();

// Muestra las colecciones y elementos favoritos exclusivos del usuario logueado
router.get("/collections", listarColecciones);

// Acción para crear una nueva lista/carpeta (ej: "Inspiración")
router.post(
  "/collections/create",
  doubleCsrfProtection,
  crearColecciónPersonalizada,
);

// Acción para meter una foto dentro de una colección (Valida que no esté duplicada)
router.post("/collections/add", doubleCsrfProtection, guardarEnColeccion);

export default router;
