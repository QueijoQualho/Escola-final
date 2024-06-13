import { Router } from "express";
import { SeedController } from "../controller/SeedController";

const routerSeed = Router();
const seedController = new SeedController();

routerSeed.post('/', async (req, res) => {
    try {
        await seedController.seedDatabase(req, res);
        res.status(200).json({ message: 'Database seeded successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to seed database', error: error.message });
    }
});

export default routerSeed;
