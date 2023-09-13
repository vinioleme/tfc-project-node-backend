import { Request, Response } from 'express';
import LeaderboardService from '../Services/leaderboard.services';

export default class LeaderboardController {
  constructor(

    private leaderboardService = new LeaderboardService(),
  ) {}

  async getAll(_req:
  Request, res: Response) {
    const allTeams = await this
      .leaderboardService.getAll();
    res.status(200).json(allTeams.data);
  }

  async getAllAway(_req:
  Request, res: Response) {
    const allTeams = await this
      .leaderboardService.getAllAway();
    res.status(200).json(allTeams.data);
  }
}
