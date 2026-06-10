import express from "express";
import { doubleCsrfProtection } from "../configuration/csrfConfig.js";

const router = express.Router();

// Estructuras en memoria para almacenar las colecciones y favoritos
let mockCollections = [];
let mockFavorites = [];

// Renderizar la vista de colecciones y favoritos del usuario
router.get("/collections", (req, res) => {
  res.render("collections", {
    collections: mockCollections,
    favorites: mockFavorites,
    user: { loggedIn: true },
  });
});

// Crear una nueva colección personalizada (ej: "Paisajes")
router.post("/collections/create", doubleCsrfProtection, (req, res) => {
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.redirect("/collections");
  }

  const newCollection = {
    id: Date.now(),
    name: name.trim(),
    photos: [], // Arreglo vacío listo para recibir fotos
  };

  mockCollections.push(newCollection);
  res.redirect("/collections");
});

// Añadir una foto a una colección específica con validación de duplicados
router.post("/collections/add-photo", doubleCsrfProtection, (req, res) => {
  const { collectionId, photoId } = req.body;

  const targetCollection = mockCollections.find(
    (c) => c.id === parseInt(collectionId),
  );

  if (!targetCollection) {
    return res.status(404).send("La colección seleccionada no existe.");
  }

  // REQUERIMIENTO ESTRICTO 6: No se puede guardar la misma publicación dos veces en la misma colección
  const alreadyExists = targetCollection.photos.some(
    (p) => p.id === parseInt(photoId),
  );

  if (alreadyExists) {
    console.log(
      `Validación: La foto ${photoId} ya está en la colección "${targetCollection.name}"`,
    );
    // Aquí puedes retornar un error o simplemente redirigir evitando la duplicidad
    return res.redirect("/collections");
  }

  // Mock de la foto que se va a guardar (en producción vendrá de la Base de Datos)
  const photoToSave = {
    id: parseInt(photoId),
    url: "/images/default-photo.png", // URL temporal de respaldo
    title: "Publicación Guardada",
  };

  targetCollection.photos.push(photoToSave);
  res.redirect("/collections");
});

// Guardar una publicación como favorita general
router.post("/favorites/add", doubleCsrfProtection, (req, res) => {
  const { photoId } = req.body;
  const idNum = parseInt(photoId);

  // Evitar duplicados en favoritos generales
  if (!mockFavorites.some((p) => p.id === idNum)) {
    mockFavorites.push({
      id: idNum,
      url: "/images/default-photo.png",
      title: "Favorito General",
    });
  }

  res.redirect("/collections");
});

export default router;
