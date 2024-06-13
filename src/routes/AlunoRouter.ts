import { Router } from "express";
import { AlunoController } from "../controller/AlunoController";

const routerAluno = Router();

const alunoController = new AlunoController()

routerAluno.get('/', (req, res) => alunoController.findAll(req,res))
routerAluno.post('/', (req, res) => alunoController.create(req,res))

export default routerAluno