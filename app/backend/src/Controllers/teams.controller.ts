import { Request, Response } from 'express';
import TeamsService from '../Services/teams.services';

export default class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) {}

  async getAll(_req:
  Request, res: Response) {
    const teamsData = await this
      .teamsService.getAll();
    res.status(200).json(teamsData.data);
  }

  async getOne(req:
  Request, res: Response) {
    try {
      const teamData = await this
        .teamsService.getOne(req.params.id);

      if (teamData.status === 'NOT_FOUND') {
        return res.status(404).json({
          message: 'Team not found' });
      }

      return res.status(200).json(teamData.data);
    } catch (error) {
      return res.status(500).json({
        message: 'Internal server error' });
    }
  }
}
