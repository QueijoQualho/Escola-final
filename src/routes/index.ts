import express from "express";
import routerAluno from "./AlunoRouter";
import routerSeed from "./SeedRouter";
import routerCurso from "./CursoRouter";


const router = express.Router()

router.use('/alunos', routerAluno)
router.use('/seed', routerSeed)
router.use('/cursos', routerCurso)

export default router;
