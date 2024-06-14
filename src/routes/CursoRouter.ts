import { Router } from "express";
import { CursoController } from "../controller/CursoController";

const routerCurso = Router();

const cursoController = new CursoController()

routerCurso.get('/', (req, res) => cursoController.findAll(req,res))

export default routerCurso