import mongoose from "mongoose";

export const SubConteudoSchema = mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String, required: true },
});
