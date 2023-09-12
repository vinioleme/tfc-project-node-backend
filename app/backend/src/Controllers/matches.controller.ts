import { Request, Response } from 'express';
import MatchesService from '../Services/matches.services';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) {}

  async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    let matches;

    if (inProgress) {
      matches = await this.matchesService.getAllInProgress(inProgress as string);
    } else {
      matches = await this.matchesService.getAll();
    }

    res.status(200).json(matches.data);
  }

  async matchesUpdate(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const match = await this.matchesService.matchesUpdate(id);
      res.status(200).json(match.data);
    } catch (error) {
      res.status(404).json({ message: 'Match not found!' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const upMatch = await
      this.matchesService.update(id, req.body);
      if (!upMatch.data) return res.status(404).json({ message: 'Match not found!' });
      res.status(200).json(upMatch.data);
    } catch (error) {
      res.status(400).json({
        message: 'Invalid input!' });
    }
  }

  async createNewMatch(req: Request, res: Response) {
    try {
      const match = await this.matchesService.createNewMatch(req.body);
      if (!match.data) return res.status(404).json({ message: 'There is no team with such id!' });
      res.status(201).json(match.data);
    } catch (error) {
      res.status(400).json({ message: 'Invalid input!' });
    }
  }
}
