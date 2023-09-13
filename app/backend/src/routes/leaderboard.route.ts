import { Request, Router, Response } from 'express';
import LeaderboardController from '../Controllers/leaderboard.controller';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/home', (req: Request, res: Response) => leaderboardController.getAll(req, res));
router.get('/away', (req: Request, res: Response) => leaderboardController.getAllAway(req, res));

export default router;
