import { Repository } from "typeorm";
import AlunoEntity from "../entity/AlunoEntity";
import CursoEntity from "../entity/CursoEntity";
import DisciplinaEntity from "../entity/DisciplinaEntity";
import MatriculaEntity from "../entity/MatriculaEntity";
import GradeCurricularEntity from "../entity/GradeCurricularEntity";
import DepartamentoEntity from "../entity/DepartamentosEntity";
import ProfessorEntity from "../entity/ProfessoresEntity";


export class SeedService {
    private alunoRepository: Repository<AlunoEntity>;
    private cursoRepository: Repository<CursoEntity>;
    private disciplinaRepository: Repository<DisciplinaEntity>;
    private matriculaRepository: Repository<MatriculaEntity>;
    private gradeCurricularRepository: Repository<GradeCurricularEntity>;
    private departamentoRepository: Repository<DepartamentoEntity>;
    private professorRepository: Repository<ProfessorEntity>;

    constructor(
        alunoRepository: Repository<AlunoEntity>,
        cursoRepository: Repository<CursoEntity>,
        disciplinaRepository: Repository<DisciplinaEntity>,
        matriculaRepository: Repository<MatriculaEntity>,
        gradeCurricularRepository: Repository<GradeCurricularEntity>,
        departamentoRepository: Repository<DepartamentoEntity>,
        professorRepository: Repository<ProfessorEntity>
    ) {
        this.alunoRepository = alunoRepository;
        this.cursoRepository = cursoRepository;
        this.disciplinaRepository = disciplinaRepository;
        this.matriculaRepository = matriculaRepository;
        this.gradeCurricularRepository = gradeCurricularRepository;
        this.departamentoRepository = departamentoRepository;
        this.professorRepository = professorRepository;
    }

    async seedDatabase(): Promise<void> {
        // Seed Departamentos
        const departamentos: Partial<DepartamentoEntity>[] = [
            { nome: 'Departamento de Computação', sigla: 'DCOMP', codigo: '001', endereco: 'Prédio A', telefone: '12345678' },
            { nome: 'Departamento de Matemática', sigla: 'DMAT', codigo: '002', endereco: 'Prédio B', telefone: '87654321' }
        ];
        const savedDepartamentos = await this.departamentoRepository.save(departamentos);

        // Seed Cursos
        const cursos: Partial<CursoEntity>[] = [
            { nome: 'Engenharia de Software', descricao: 'Curso de Engenharia de Software', numero: '001', cargaHorariaSemestre: 400, cargaHorariaTotal: 3200, numeroSemestres: 8, nivel: 'Graduação', departamento: savedDepartamentos[0] },
            { nome: 'Ciência da Computação', descricao: 'Curso de Ciência da Computação', numero: '002', cargaHorariaSemestre: 400, cargaHorariaTotal: 3200, numeroSemestres: 8, nivel: 'Graduação', departamento: savedDepartamentos[0] }
        ];
        const savedCursos = await this.cursoRepository.save(cursos);

        // Seed Professores
        const professores: Partial<ProfessorEntity>[] = [
            { nome: 'Professor A', email: 'profA@universidade.com' },
            { nome: 'Professor B', email: 'profB@universidade.com' }
        ];
        const savedProfessores = await this.professorRepository.save(professores);

        // Seed Disciplinas
        const disciplinas: Partial<DisciplinaEntity>[] = [
            { codigo: 'DS001', nome: 'Algoritmos', descricao: 'Introdução a Algoritmos', cargaHoraria: 60, professores: [savedProfessores[0]] },
            { codigo: 'DS002', nome: 'Estruturas de Dados', descricao: 'Estudo de Estruturas de Dados', cargaHoraria: 60, professores: [savedProfessores[1]] }
        ];
        const savedDisciplinas = await this.disciplinaRepository.save(disciplinas);

        // Seed Grades Curriculares
        const gradesCurriculares: Partial<GradeCurricularEntity>[] = [
            { curso: savedCursos[0], disciplina: savedDisciplinas[0] },
            { curso: savedCursos[1], disciplina: savedDisciplinas[1] }
        ];
        await this.gradeCurricularRepository.save(gradesCurriculares);

        // Seed Alunos
        const alunos: Partial<AlunoEntity>[] = [
            { nome: 'João', numero: '123', cpf: '12345678900', rg: '12345', endereco: 'Rua A', telefone: '12345', email: 'joao@email.com', departamento: savedDepartamentos[0] },
            { nome: 'Maria', numero: '456', cpf: '98765432100', rg: '54321', endereco: 'Rua X', telefone: '54321', email: 'maria@email.com', departamento: savedDepartamentos[0] }
        ];
        const savedAlunos = await this.alunoRepository.save(alunos);

        // Seed Matriculas
        const matriculas: Partial<MatriculaEntity>[] = [
            { aluno: savedAlunos[0], disciplina: savedDisciplinas[0], notaFinal: 8.5, presencas: 30, faltas: 2 },
            { aluno: savedAlunos[1], disciplina: savedDisciplinas[1], notaFinal: 9.0, presencas: 28, faltas: 4 }
        ];
        await this.matriculaRepository.save(matriculas);
    }
}
