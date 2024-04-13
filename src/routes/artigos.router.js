import express from "express";
import {
  getArtigos,
  createArtigo,
  updateArtigo,
  deleteArtigo,
} from "../controllers/artigo.controller.js";

const rota = express.Router();

rota.get("/", getArtigos);

rota.post("/", createArtigo);

rota.put("/:id", updateArtigo);

rota.delete("/:id", deleteArtigo);

export default rota;
