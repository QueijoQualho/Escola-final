import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import MatriculaEntity from "./MatriculaEntity";
import DepartamentoEntity from "./DepartamentosEntity";

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
    enderecoAtual: string;

    @Column()
    telefone: string;

    @Column()
    enderecoPermanente: string;

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
