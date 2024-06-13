import { DataSource } from "typeorm";
import AlunoEntity from "../entity/AlunoEntity";
import CursoEntity from "../entity/CursoEntity";
import DepartamentoEntity from "../entity/DepartamentosEntity";
import DisciplinaEntity from "../entity/DisciplinaEntity";
import ProfessorEntity from "../entity/ProfessoresEntity";
import GradeCurricularEntity from "../entity/GradeCurricularEntity";
import MatriculaEntity from "../entity/MatriculaEntity";
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "escola",
    entities: [AlunoEntity, CursoEntity, DepartamentoEntity, DisciplinaEntity, ProfessorEntity, GradeCurricularEntity, MatriculaEntity],
    synchronize: true,
});