import MatchesModelSequelize from '../database/models/MatchesModelSequelize';
import ICRUDMatches from '../Interfaces/MatchesCrud';
import IMatches from '../Interfaces/MatchesInterface';
import TeamsModelSequelize from '../database/models/TeamsModelSequelize';
import IMatchesUpdate from '../Interfaces/IUpdateMatches';
import ICreateMatch from '../Interfaces/createNewMatchInterface';

export default class MatchesModel implements ICRUDMatches<IMatches> {
  private model = MatchesModelSequelize;

  async getAll(): Promise<IMatches[]> {
    const matchResult = await this.model.findAll({
      include: [
        { model: TeamsModelSequelize, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamsModelSequelize, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matchResult;
  }

  async getAllInProgress(inProgress: string): Promise<IMatches[]> {
    const progress = inProgress === 'true';
    const results = await this.model.findAll({
      where: { inProgress: progress },
      include: [
        { model: TeamsModelSequelize, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamsModelSequelize, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return results;
  }

  async matchesUpdate(id: string): Promise<{ message: string }> {
    await this.model.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  }

  async update(id: string, match: IMatchesUpdate): Promise<{ message: string }> {
    const [updatedRowsCount] = await this.model.update(match, { where: { id } });
    if (updatedRowsCount > 0) {
      return {
        message: 'OK' };
    }
    throw new
    Error(`Match with ID ${id} not found.`);
  }

  async createNewMatch(match: ICreateMatch): Promise<IMatches | null> {
    const { homeTeamId, awayTeamId } = match;
    const teamHome = await
    TeamsModelSequelize.findByPk(homeTeamId);
    const teamAway = await
    TeamsModelSequelize.findByPk(awayTeamId);
    if (!teamHome || !teamAway) {
      throw new Error('Home team or away team not found.');
    }

    const allTheInfos = {
      ...match,
      inProgress: true,
    };
    const result = await this.model.create(allTheInfos);
    return result.dataValues;
  }
}
