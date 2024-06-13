import express from "express";
import routerAluno from "./AlunoRouter";
import routerSeed from "./SeedRouter";


const router = express.Router()

router.use('/alunos', routerAluno)
router.use('/seed', routerSeed)

export default router;
