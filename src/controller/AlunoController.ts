import { Request, Response } from 'express';
import { AppDataSource } from '../config/dataSource';
import AlunoEntity from '../entity/AlunoEntity';
import { AlunoService } from '../service/AlunoService';

export class AlunoController {
    private alunoService: AlunoService;

    constructor() {
        const alunoRepository = AppDataSource.getRepository(AlunoEntity);
        this.alunoService = new AlunoService(alunoRepository);    }

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const alunos = await this.alunoService.getAllAlunos(); 
            res.json(alunos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const alunoData = req.body;
            const newAluno = await this.alunoService.createAluno(alunoData);
            res.status(201).json(newAluno);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
