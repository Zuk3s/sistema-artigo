import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import {
  getArtigos,
  createArtigo,
} from "./src/controllers/artigo.controller.js";

const app = express();
app.use(express.json());
dotenv.configDotenv();

//ROUTES

app.get("/", getArtigos);

app.post("/artigos", createArtigo); //completar daqui

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB in port");
    app.listen(port, () => {
      console.log(`Listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });
