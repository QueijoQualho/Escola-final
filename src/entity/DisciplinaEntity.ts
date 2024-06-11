import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import MatriculaEntity from "./MatriculaEntity";
import ProfessorEntity from "./ProfessoresEntity";
import GradeCurricularEntity from "./GradeCurricularEntity";

@Entity("Disciplinas")
export default class DisciplinaEntity {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ unique: true })
    codigo: string;

    @Column({ unique: true })
    nome: string;

    @Column()
    descricao: string;

    @Column({ name: "carga_horaria" }) 
    cargaHoraria: number;

    @ManyToMany(() => ProfessorEntity)
    @JoinTable({name: "professor_disciplina"})
    professores: ProfessorEntity[];

    @OneToMany(() => MatriculaEntity, matricula => matricula.disciplina)
    matriculas: MatriculaEntity[];

    @OneToMany(() => GradeCurricularEntity, gradeCurricular => gradeCurricular.disciplina)
    gradesCurriculares: GradeCurricularEntity[];
}
