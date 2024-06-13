import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import DepartamentoEntity from "./DepartamentosEntity";
import MatriculaEntity from "./MatriculaEntity";

@Entity("Alunos")
export default class AlunoEntity {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    nome: string;

    @Column({ unique: true })
    numero: string;

    @Column({ unique: true })
    cpf: string;

    @Column({ unique: true })
    rg: string;

    @Column()
    endereco: string;

    @Column()
    telefone: string;

    @Column()
    email: string;

    @Column({ type: "date", name: "data_nascimento" })
    dataNascimento: Date;

    @Column()
    sexo: string;

    @ManyToOne(() => DepartamentoEntity, departamento => departamento.alunos)
    departamento: DepartamentoEntity;

    @OneToMany(() => MatriculaEntity, matricula => matricula.aluno)
    matriculas: MatriculaEntity[];
}
