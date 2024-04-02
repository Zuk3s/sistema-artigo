import { Artigo } from '../models/Artigo.js';


export const getArtigos = async () => {
    const artigos = await Artigo.findAll();
    return artigos;
}

export const createArtigo = async (req, res) => {
    try {
        const artigo = req.body;
        if (artigo.titulo === '' || artigo.conteudo === '') 
            return res.status(400).json({ error: 'Título e conteúdo são obrigatórios' });
        const novoArtigo = await Artigo.create(artigo);
        await novoArtigo.save();
        res.status(201).json(novoArtigo);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar artigo' });
    }
}

export const updateArtigo = async (req, res) => {
    try {
        const artigoId = req.params.id;
        const novoArtigo = req.body;

        const artigo = await Artigo.findByIdAndUpdate(artigoId, novoArtigo, { new: true });
        if (!artigo) {
            return res.status(404).json({ error: 'Artigo não encontrado' });
        }

        await artigo.update(novoArtigo);
        await artigo.save();

        res.status(201).json(artigo);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar artigo' });
    }
}

export const deleteArtigo = async (req, res) => {
    try {
        const artigoId = req.params.id;

        const artigo = await Artigo.findByIdAndDelete(artigoId);
        if (!artigo) {
            return res.status(404).json({ error: 'Artigo não encontrado' });
        }
        res.status(200).json({ message: 'Artigo deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar artigo' });
    }
}