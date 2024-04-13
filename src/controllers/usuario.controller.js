import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Usuario } from "../models/Usuario.js";

export const register = async (req, res) => {
  try {
    const { primeiroNome, sobreNome, email, senha, telefone, pastaFoto } =
      req.body;

    const sal = bcrypt.getSalt();
    const senhaHash = await bcrypt.hash(senha, sal);

    const novoUsuario = new Usuario({
      primeiroNome,
      sobreNome,
      email,
      senha: senhaHash,
      telefone,
      pastaFoto,
    });

    await novoUsuario.save();
    res.status(201).json({ novoUsuario });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = Usuario.findOne({ email: email });
    if (!usuario) {
      res.status(400).json({ message: "Usuário não encontrado" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      res.status(400).json({ message: "Senha inválida" });
    }

    const token = JWT.sign({ id: usuario._id }, process.env.JWT);

    delete usuario.senha;

    res.status(201).json({ token, usuario });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
