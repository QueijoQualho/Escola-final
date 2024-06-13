import { Repository } from "typeorm";
import AlunoEntity from "../entity/AlunoEntity";

export class SeedService {
    private alunoRepository: Repository<AlunoEntity>;

    constructor(alunoRepository: Repository<AlunoEntity>) {
        this.alunoRepository = alunoRepository;
    }

    async seedDatabase(): Promise<void> {
        const alunos: Partial<AlunoEntity>[] = [
            { nome: 'João', numero: '123', cpf: '12345678900', rg: '12345', endereco: 'Rua A', telefone: '12345', email: 'joao@email.com', dataNascimento: new Date(), sexo: 'M' },
            { nome: 'Maria', numero: '456', cpf: '98765432100', rg: '54321', endereco: 'Rua X', telefone: '54321', email: 'maria@email.com', dataNascimento: new Date(), sexo: 'F' }
        ];

        await this.alunoRepository.save(alunos);
    }
}
