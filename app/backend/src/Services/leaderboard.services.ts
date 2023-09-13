import ICRUDLeaderboard from '../Interfaces/ICrudLeader';
import ILeaderboard from '../Interfaces/ILeaderboard';
import LeaderboardModel from '../Models/leaderboardModel';

export default class LeaderboardService {
  constructor(
    private leaderBoardModel: ICRUDLeaderboard<ILeaderboard> = new LeaderboardModel(),
  ) {}

  async getAll(): Promise<{ status: string, data: ILeaderboard[] }> {
    try {
      const allTheTeams = await this.leaderBoardModel.getAll();
      return { status: 'SUCCESS', data: allTheTeams };
    } catch (error) {
      throw new Error('Failed to retrieve leaderboard data');
    }
  }
}
