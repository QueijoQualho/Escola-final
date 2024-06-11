import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./config/dataSource";
import router from "./routes";
const app = express();

app.use(express.json());

app.use(router)

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado");
  })
  .catch((erro) => {
    console.log(erro);
  });

export default app;
