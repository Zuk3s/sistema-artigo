import JWT from "jsonwebtoken";

export const verificarToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      res.status(400).send("Acesso Negado");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verificado = JWT.verify(token, process.env.JWT);
    req.usuario = verificado;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
