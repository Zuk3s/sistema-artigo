import mongoose from "mongoose";

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
    subconteúdo: {
      type: [SubConteudo],
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
