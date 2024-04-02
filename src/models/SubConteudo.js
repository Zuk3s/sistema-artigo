import mongoose from "mongoose";

const SubConteudoSchema = mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String, required: false },
});

export const SubConteudo = mongoose.model("Subconteudo", SubConteudoSchema);
