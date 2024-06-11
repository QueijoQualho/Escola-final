import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import CursoEntity from "./CursoEntity";
import AlunoEntity from "./AlunoEntity";

@Entity("Departamentos")
export default class DepartamentoEntity {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ unique: true })
    nome: string;

    @Column({ unique: true })
    sigla: string;

    @Column({ unique: true })
    codigo: string;

    @Column()
    endereco: string;

    @Column()
    telefone: string;

    @OneToMany(() => CursoEntity, curso => curso.departamento)
    cursos: CursoEntity[]

    @OneToMany(() => AlunoEntity, aluno => aluno.departamento)
    alunos: AlunoEntity[]
}
