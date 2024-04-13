import express from "express";
import { login } from "../controllers/usuario.controller.js";

const rota = express.Router();

rota.post("/login", login);

export default router;