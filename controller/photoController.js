import { Photo, User, Comment } from "../models/sync.js";
import { Op } from "sequelize";

export const photoController = {
  getFeed: async (req, res) => {
    try {
      const photos = await Photo.findAll({
        where: { isBlocked: false },
        include: [{ model: User, as: "author", attributes: ["userName"] }],
        order: [["createdAt", "DESC"]],
      });
      res.render("feed", { results: photos });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al cargar el feed");
    }
  },

  // 2. Procesar la subida de una foto (Guardando los datos en la BD)
  createPhoto: async (req, res) => {
    try {
      const {
        title,
        description,
        tags,
        licenseType,
        watermarkText,
        isForSale,
        price,
      } = req.body;

      // Simulamos el autor con el usuario logueado (ID 1 de prueba si no hay sesión activa aún)
      const userId = req.session?.user?.id || 1;

      // Simulamos una URL estática de marcador de posición para la imagen
      const fakeUrl =
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb";

      await Photo.create({
        title,
        description,
        url: fakeUrl, // Aquí iría la ruta real si usaras Multer
        licenseType,
        watermarkText: licenseType === "copyright" ? watermarkText : null,
        isForSale: isForSale === "true",
        price: isForSale === "true" ? parseFloat(price) : 0.0,
        userId,
      });

      res.redirect("/feed");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al publicar la fotografía");
    }
  },

  // Ver Detalle de una Foto
  getPhotoDetail: async (req, res) => {
    try {
      const { id } = req.params;
      const photo = await Photo.findByPk(id, {
        include: [
          { model: User, as: "author" },
          {
            model: Comment,
            as: "comments",
            include: [
              { model: User, as: "commenter", attributes: ["userName"] },
            ],
          },
        ],
      });

      if (!photo) return res.status(404).send("Fotografía no encontrada");
      res.render("photo-detail", { photo, comment: photo.comments });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al cargar el detalle");
    }
  },

  // Motor de Búsqueda Flexible
  searchPhotos: async (req, res) => {
    try {
      const { keyword, tag, license, status, sortBy } = req.query;
      let conditions = { isBlocked: false };

      // Filtro por palabra clave (Título o Descripción)
      if (keyword) {
        conditions[Op.or] = [
          { title: { [Op.iLike]: `%${keyword}%` } },
          { description: { [Op.iLike]: `%${keyword}%` } },
        ];
      }

      // Filtro por Licencia
      if (license) {
        conditions.licenseType = license;
      }

      // Filtro Comercial (Estado)
      if (status === "for_sale") conditions.isForSale = true;
      if (status === "not_for_sale") conditions.isForSale = false;

      // Definir Criterio de Ordenamiento
      let orderClause = [["createdAt", "DESC"]]; // por defecto 'recent'
      if (sortBy === "rating") orderClause = [["ratingAverage", "DESC"]];

      const results = await Photo.findAll({
        where: conditions,
        include: [{ model: User, as: "author", attributes: ["userName"] }],
        order: orderClause,
      });

      // Retorna la vista enviándole los filtros aplicados para mantener los inputs llenos
      res.render("search", {
        results,
        filters: { keyword, tag, license, status, sortBy },
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error en el motor de búsqueda");
    }
  },
};
