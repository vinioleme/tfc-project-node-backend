import { Request, Response } from 'express';
import LeaderboardService from '../Services/leaderboard.services';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) {}

  getAll = async (_req: Request, res: Response) => {
    try {
      const allTheTeams = await this.leaderboardService.getAll();
      res.status(200).json(allTheTeams.data);
    } catch (error) {
      res.status(500).json({ error: 'Ocorreu um erro interno.' });
    }
  };
}
