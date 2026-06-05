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

const fileFinter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("El archivo subido no es una imagen valida."), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFinter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
