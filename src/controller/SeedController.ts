import { Request, Response } from 'express';
import AlunoEntity from '../entity/AlunoEntity';
import CursoEntity from '../entity/CursoEntity';
import DisciplinaEntity from '../entity/DisciplinaEntity';
import MatriculaEntity from '../entity/MatriculaEntity';
import GradeCurricularEntity from '../entity/GradeCurricularEntity';

import { AppDataSource } from '../config/dataSource';
import { SeedService } from '../service/SeedService';
import DepartamentoEntity from '../entity/DepartamentosEntity';
import ProfessorEntity from '../entity/ProfessoresEntity';

export class SeedController {
    private seedService: SeedService;

    constructor() {
        const alunoRepository = AppDataSource.getRepository(AlunoEntity);
        const cursoRepository = AppDataSource.getRepository(CursoEntity);
        const disciplinaRepository = AppDataSource.getRepository(DisciplinaEntity);
        const matriculaRepository = AppDataSource.getRepository(MatriculaEntity);
        const gradeCurricularRepository = AppDataSource.getRepository(GradeCurricularEntity);
        const departamentoRepository = AppDataSource.getRepository(DepartamentoEntity);
        const professorRepository = AppDataSource.getRepository(ProfessorEntity);

        this.seedService = new SeedService(
            alunoRepository,
            cursoRepository,
            disciplinaRepository,
            matriculaRepository,
            gradeCurricularRepository,
            departamentoRepository,
            professorRepository
        );
    }

    async seedDatabase(req: Request, res: Response): Promise<void> {
        try {
            await this.seedService.seedDatabase();
            res.status(200).json({ message: 'Database seeded successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to seed database', error: error.message });
        }
    }
}
