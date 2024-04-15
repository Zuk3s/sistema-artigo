import express from "express";
import {
  getArtigos,
  getArtigo,
  createArtigo,
  updateArtigo,
  deleteArtigo,
} from "../controllers/artigo.controller.js";

const rota = express.Router();

rota.get("/", getArtigos);
rota.get("/:id", getArtigo)

rota.post("/", createArtigo);

rota.put("/:id", updateArtigo);

rota.delete("/:id", deleteArtigo);

export default rota;
