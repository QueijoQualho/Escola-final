import express from "express";
import "reflect-metadata";
import router from "../routes";
import { AppDataSource } from "./dataSource";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors())

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado");
  })
  .catch((erro) => {
    console.log(erro);
  });
  
app.use('/api', router)

export default app;
