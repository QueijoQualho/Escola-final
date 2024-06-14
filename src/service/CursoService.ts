import { Repository } from "typeorm";
import CursoEntity from "../entity/CursoEntity";

export class CursoService {
    private cursoRepository: Repository<CursoEntity>

    constructor(cursoRepository: Repository<CursoEntity>) {
        this.cursoRepository = cursoRepository
    }

    async getAllCursos() {
        return this.cursoRepository.find();
    }
}