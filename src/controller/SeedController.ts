import { Request, Response } from 'express';
import { SeedService } from '../service/SeedService';
import AlunoEntity from '../entity/AlunoEntity';
import { AppDataSource } from '../config/dataSource';

export class SeedController {
    private seedService: SeedService;

    constructor() {
        const alunoRepository = AppDataSource.getRepository(AlunoEntity);
        this.seedService = new SeedService(alunoRepository);
    }

    async seedDatabase(req: Request, res: Response): Promise<void> {
        try {
            await this.seedService.seedDatabase();
            res.status(200).json({ message: 'Database seeded successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to seed database', error: error.message });
        }
    }
}
