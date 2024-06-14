import { Request, Response } from 'express';
import { AppDataSource } from "../config/dataSource";
import CursoEntity from "../entity/CursoEntity";
import { CursoService } from "../service/CursoService";

export class CursoController {
    private cursoService: CursoService;

    constructor() {
        const cursoRepository = AppDataSource.getRepository(CursoEntity);
        this.cursoService = new CursoService(cursoRepository);
    }

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const cursos = await this.cursoService.getAllCursos();
            res.json(cursos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}