import { Collection, Photo, User } from "../models/sync.js";

export const collectionController = {
  getMyCollections: async (req, res) => {
    try {
      const userId = req.session?.user?.id || 1;
      const collections = await Collection.findAll({
        where: { userId },
        include: [{ model: Photo, as: "photos" }],
      });
      res.render("collections", { collections });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al cargar tus colecciones");
    }
  },

  // Crear una nueva colección vacía
  createCollection: async (req, res) => {
    try {
      const { name } = req.body;
      const userId = req.session?.user?.id || 1;

      await Collection.create({
        name,
        userId,
      });
      res.redirect("/collections");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al crear la colección");
    }
  },

  // Agregar una foto a una colección
  addPhotoToCollection: async (req, res) => {
    try {
      const { collectionId, photoId } = req.body;
      const collection = await Collection.findByPk(collectionId);
      const photo = await Photo.findByPk(photoId);

      if (!collection || !photo) {
        return res.status(404).send("Colección o Fotografía no encontrada");
      }

      // El método 'addPhoto' lo genera Sequelize automáticamente por la relación belongsToMany
      await collection.addPhoto(photo);
      res.redirect(`/photo-detail/${photoId}`);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al añadir la foto a la colección");
    }
  },
};
