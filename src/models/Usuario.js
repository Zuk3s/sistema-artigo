import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    primeiroNome: {
      type: String,
      required: true,
      trim: true,
      min: 2,
      max: 60,
    },
    sobreNome: {
      type: String,
      trim: true,
      min: 2,
      max: 60,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    senha: {
      type: String,
      required: true,
      min: 7,
    },
    telefone: {
      type: String,
      trim: true,
    },
    pastaFoto: {
      type: String,
      default: "",
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

export const Usuario = mongoose.model("Usuario", usuarioSchema);
