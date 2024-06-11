import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from "typeorm";
import AlunoEntity from "./AlunoEntity";
import DisciplinaEntity from "./DisciplinaEntity";

@Entity("Matriculas")
export default class MatriculaEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => AlunoEntity, aluno => aluno.matriculas)
    @JoinColumn({ name: "aluno_id" })
    aluno: AlunoEntity;

    @ManyToOne(() => DisciplinaEntity, disciplina => disciplina.matriculas)
    @JoinColumn({ name: "disciplina_id" })
    disciplina: DisciplinaEntity;

    @Column({ name: "nota_final", type: "decimal", precision: 5, scale: 2, nullable: true })
    notaFinal: number;

    @Column({ name: "presencas", type: "int", nullable: true })
    presencas: number;

    @Column({ name: "faltas", type: "int", nullable: true })
    faltas: number;
}
