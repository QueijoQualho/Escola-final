import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import CursoEntity from "./CursoEntity";
import DisciplinaEntity from "./DisciplinaEntity";

@Entity("Grade_Curricular")
export default class GradeCurricularEntity {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => CursoEntity, curso => curso.gradesCurriculares)
    curso: CursoEntity;

    @ManyToOne(() => DisciplinaEntity, disciplina => disciplina.gradesCurriculares)
    disciplina: DisciplinaEntity;
}
