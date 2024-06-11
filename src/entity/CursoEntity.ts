import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import DepartamentoEntity from "./DepartamentosEntity";
import GradeCurricularEntity from "./GradeCurricularEntity";

@Entity("Cursos")
export default class CursoEntity {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @Column({ unique: true })
    numero: string;

    @Column({ name: "carga_horaria_semestre" })
    cargaHorariaSemestre: number;

    @Column({ name: "carga_horaria_total" }) 
    cargaHorariaTotal: number;

    @Column({ name: "numero_semestres" }) 
    numeroSemestres: number;

    @Column()
    nivel: string;

    @ManyToOne(() => DepartamentoEntity, departamento => departamento.cursos)
    departamento: DepartamentoEntity;

    @OneToMany(() => GradeCurricularEntity, gradeCurricular => gradeCurricular.curso)
    gradesCurriculares: GradeCurricularEntity[];
}
