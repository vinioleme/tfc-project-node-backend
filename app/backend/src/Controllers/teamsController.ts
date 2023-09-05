import { Request, Response } from 'express';
import TeamsService from '../Services/teamsService';

export default class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) {}

  async findAll(_req: Request, res: Response) {
    const teams = await this.teamsService.findAll();
    res.status(200).json(teams.data);
  }
}
