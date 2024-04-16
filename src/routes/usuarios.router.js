import express from "express";
import {
  login,
  getUsuarios,
  putUsuario,
} from "../controllers/usuario.controller.js";
import { verificaAdmin } from "../middleware/admin.js";

const rota = express.Router();

// GET /usuario
rota.get("/", verificaAdmin, getUsuarios);

// POST /usuario/login
rota.post("/login", login);

// PUT /usuario/:id
rota.put("/:id", verificaAdmin, putUsuario);

export default router;
