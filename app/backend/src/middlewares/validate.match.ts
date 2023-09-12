import { Request, Response, NextFunction } from 'express';

export default class MatchValidate {
  static fieldsValidation(req: Request, res: Response, next: NextFunction): Response | void {
    const { homeTeamId, awayTeamId } = req.body;

    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  }
}
