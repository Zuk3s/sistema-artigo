import { Artigo } from "../models/Artigo.js";

export const getArtigos = async (req, res) => {
  try {
    let { pagina = 1, limite = 3 /*, ordenacao = "_id:-1" */ } = req.query;

    let {campoOrdenacao, ordem} = ordenacao.split(":");

    pagina = parseInt(pagina);
    limite = parseInt(limite);
    ordem = parseInt(ordem || -1);

    const artigos = await Artigo.find()
      //.sort({ [campoOrdenacao]: ordem }) Ordena de acordo com o valor passado no campoOrdenacao e define a ordem de acordo com o valor da variavel ordem
      .populate("subconteudo")
      .skip((pagina - 1) * limite)
      .limit(limite);

    if (!artigos || artigos.length == 0) {
      return res.status(404).json({ message: "Nenhum artigo encontrado" });
    }

    res.status(200).json(artigos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createArtigo = async (req, res) => {
  try {
    const artigo = req.body;
    if (artigo.titulo === "" || artigo.conteudo === "")
      return res
        .status(400)
        .json({ error: "Título e conteúdo são obrigatórios" });
    const novoArtigo = await Artigo.create(artigo);
    await novoArtigo.save();
    res.status(201).json(novoArtigo);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar artigo" });
  }
};

export const updateArtigo = async (req, res) => {
  try {
    const artigoId = req.params.id;
    const novoArtigo = req.body;

    const artigo = await Artigo.findByIdAndUpdate(artigoId, novoArtigo, {
      new: true,
    });
    if (!artigo) {
      return res.status(404).json({ error: "Artigo não encontrado" });
    }

    await artigo.update(novoArtigo);
    await artigo.save();

    res.status(201).json(artigo);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar artigo" });
  }
};

export const deleteArtigo = async (req, res) => {
  try {
    const artigoId = req.params.id;

    const artigo = await Artigo.findByIdAndDelete(artigoId);
    if (!artigo) {
      return res.status(404).json({ error: "Artigo não encontrado" });
    }
    res.status(200).json({ message: "Artigo deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar artigo" });
  }
};
