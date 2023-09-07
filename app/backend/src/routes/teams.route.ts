import { Request, Router, Response } from 'express';
import TeamsController from '../Controllers/teams.controller';

const router = Router();

const teamsController = new TeamsController();

router.get('/', (req: Request, res: Response) => teamsController.getAll(req, res));
router.get('/:id', (req: Request, res: Response) => teamsController.getOne(req, res));

export default router;
