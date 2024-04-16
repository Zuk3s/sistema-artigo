export const verificaAdmin = (req, res, next) => {
  const { Admin } = req.body;
  if (!Admin) {
    res.status(403).send("Você não tem permissão para acessar esses dados");
  }

  next();
};
