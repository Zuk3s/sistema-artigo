import mongoose from "mongoose";

export const ArtigoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  conteudo: {
    type: String,
    required: true,
  },
  imagem: {
    type: String,
    required: true,
  },
  data: {
    type: Date,
    default: Date.now,
  },
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'data_criacao',
        updatedAt: 'data_atualizacao',
    },
});

export const Artigo = mongoose.model("Artigo", ArtigoSchema);