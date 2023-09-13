import ICRUDLeaderboard from '../Interfaces/LeaderboardCrud';
import ILeaderboard from '../Interfaces/LeaderboardInterface';
import LeaderboardModel from '../Models/leaderboard.model';

export default class LeaderboardService {
  constructor(
    private leaderBoardModel: ICRUDLeaderboard<ILeaderboard> = new LeaderboardModel(),
  ) {}

  async getAll(): Promise<{ status: string, data: ILeaderboard[] }> {
    const allTheTeams = await this.leaderBoardModel.getAll();

    return { status: 'SUCCESS', data: allTheTeams };
  }

  async getAllAway(): Promise<{ status: string, data: ILeaderboard[] }> {
    const allTheTeams = await this.leaderBoardModel.getAllAway();
    return { status: 'SUCCESS', data: allTheTeams };
  }
}
