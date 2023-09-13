import MatchesModelSequelize from '../database/models/MatchesModelSequelize';
import ICRUDLeaderboard from '../Interfaces/ICrudLeader';
import ILeaderboard from '../Interfaces/ILeaderboard';
import TeamsModelSequelize from '../database/models/TeamsModelSequelize';
import { resultHome, orderLeaderboard } from '../utils/results';

export default class LeaderboardModel implements ICRUDLeaderboard<ILeaderboard> {
  private model = MatchesModelSequelize;
  private teamModel = TeamsModelSequelize;

  async getAll(): Promise<ILeaderboard[]> {
    const allTeams = await this.teamModel.findAll();

    const findLeaderboard = allTeams.map(async (team) => {
      const allMatches = await this.model.findAll({
        where: {
          homeTeamId: team.id,
          inProgress: false,
        },
      });
      const statistics = allMatches.map((match) => resultHome(team.teamName, [match]));
      const resultStatistics = statistics[statistics.length - 1];

      return { ...resultStatistics };
    });

    const allResults = await Promise.all(findLeaderboard);
    return orderLeaderboard(allResults);
  }
}
