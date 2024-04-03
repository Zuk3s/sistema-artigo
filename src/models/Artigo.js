import mongoose from "mongoose";
import { SubConteudoSchema } from "./SubConteudo.js";

const ArtigoSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      min: 2,
    },
    conteudo: {
      type: String,
    },
    subconteudo: {
      type: [SubConteudoSchema],
    },
    imagem: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "data_criacao",
      updatedAt: "data_atualizacao",
    },
  }
);

export const Artigo = mongoose.model("Artigo", ArtigoSchema);
