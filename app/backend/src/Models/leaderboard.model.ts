import MatchesModelSequelize from '../database/models/MatchesModelSequelize';
import ICRUDLeaderboard from '../Interfaces/LeaderboardCrud';
import ILeaderboard from '../Interfaces/LeaderboardInterface';
import TeamsModelSequelize from '../database/models/TeamsModelSequelize';
import { homeResult, leaderboardOrder, awayResult } from '../utils/results';

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
      const statistics = allMatches.map((match) => homeResult(team.teamName, [match]));
      const resultStatistics = statistics[statistics.length - 1];

      return { ...resultStatistics };
    });

    const allResults = await Promise.all(findLeaderboard);
    return leaderboardOrder(allResults);
  }

  async getAllAway(): Promise<ILeaderboard[]> {
    const allTheTeams = await this.teamModel.findAll();

    const getTheLeaderboard = allTheTeams.map(async (team) => {
      const allMatches = await this.model.findAll({
        where: {
          awayTeamId: team.id,
          inProgress: false,
        },
      });
      const statistics = allMatches.map((match) => awayResult(team.teamName, [match]));
      const resultstatistics = statistics[statistics.length - 1];

      return { ...resultstatistics };
    });

    const result = await Promise.all(getTheLeaderboard);
    return leaderboardOrder(result);
  }
}
