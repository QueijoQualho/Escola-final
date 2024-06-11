import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import DisciplinaEntity from "./DisciplinaEntity";

@Entity("Professores")
export default class ProfessorEntity {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    nome: string;

    @Column({ unique: true })
    email: string;

    @ManyToMany(() => DisciplinaEntity, disciplina => disciplina.professores)
    disciplinas: DisciplinaEntity[];
}
