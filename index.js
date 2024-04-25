import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import path from "path";
import cors from "cors";
import { register } from "./src/controllers/usuario.controller.js";
import { createPost } from "./src/controllers/artigo.controller.js";
import { verificarToken } from "./src/middleware/verificarToken.js";
import artigosRota from "./src/routes/artigos.routes.js";
import usuariosRota from "./src/routes/usuarios.router.js";

// CONFIGURAÇÕES
const app = express();
app.use(express.json());
app.use(cors())
dotenv.configDotenv();
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// ARMAZEM DE FOTOS
const armazem = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ armazem });

//ROTAS COM FOTO
app.post("/usuario/registrar", upload.single("foto"), register);
app.post("/posts", verificarToken, upload.single("foto"), createPost);

//ROTAS
app.use("/artigo", artigosRota);
app.use("/usuario", usuariosRota);

// SERVER
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB in port");
    app.listen(port, () => {
      console.log(`Listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });
