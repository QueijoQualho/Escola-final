import { Repository } from "typeorm";
import AlunoEntity from "../entity/AlunoEntity";

export class AlunoService {
    private alunoRepository: Repository<AlunoEntity>

    constructor(alunoRepository: Repository<AlunoEntity>) {
        this.alunoRepository = alunoRepository;
    }

    async getAllAlunos(): Promise<AlunoEntity[]> {
        return await this.alunoRepository.find()
    }

    async createAluno(aluno: Partial<AlunoEntity>): Promise<AlunoEntity> {
        return await this.alunoRepository.save(aluno);
    }
}