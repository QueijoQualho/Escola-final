import { Request, Response } from 'express';
import { AppDataSource } from '../config/dataSource';
import AlunoEntity from '../entity/AlunoEntity';
import CursoEntity from '../entity/CursoEntity';
import GradeCurricularEntity from '../entity/GradeCurricularEntity';
import MatriculaEntity from '../entity/MatriculaEntity';
import { AlunoService } from '../service/AlunoService';

export class AlunoController {
    private alunoService: AlunoService;

    constructor() {
        const alunoRepository = AppDataSource.getRepository(AlunoEntity);
        this.alunoService = new AlunoService(alunoRepository);
    }

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const alunos = await this.alunoService.getAllAlunos();
            res.json(alunos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();

        try {
            await queryRunner.startTransaction();

            const alunoData = req.body;
            const { cursoId } = alunoData;

            // Criar o novo aluno
            const newAluno = await this.alunoService.createAluno(alunoData);

            // Obter o curso
            const cursoRepository = queryRunner.manager.getRepository(CursoEntity);
            const curso = await cursoRepository.findOne({ where: { id: cursoId }, relations: ['gradesCurriculares'] });
            if (!curso) {
                throw new Error('Curso não encontrado');
            }

            // Obter todas as disciplinas da grade curricular do curso
            const gradeCurricularRepository = queryRunner.manager.getRepository(GradeCurricularEntity);
            const gradesCurriculares = await gradeCurricularRepository.find({ where: { curso: curso }, relations: ['disciplina'] });
            if (!gradesCurriculares.length) {
                throw new Error('Nenhuma disciplina encontrada para este curso');
            }

            // Criar matrículas para cada disciplina
            const matriculaRepository = queryRunner.manager.getRepository(MatriculaEntity);
            const matriculas = gradesCurriculares.map(grade => {
                const matricula = new MatriculaEntity();
                matricula.aluno = newAluno;
                matricula.disciplina = grade.disciplina;
                return matricula;
            });

            // Salvar todas as matrículas no banco de dados
            await matriculaRepository.save(matriculas);

            await queryRunner.commitTransaction();

            res.status(201).json(newAluno);
        } catch (error) {
            await queryRunner.rollbackTransaction();
            res.status(500).json({ message: error.message });
        } finally {
            await queryRunner.release();
        }
    }
}
