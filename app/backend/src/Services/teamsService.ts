import ICRUDModel from '../Interfaces/ICrudModel';
import ITeams from '../Interfaces/ITeams';
import TeamsModel from '../Models/teamsModel';

export default class TeamsService {
  constructor(
    private teamModel: ICRUDModel<ITeams> = new TeamsModel(),
  ) {}

  public async findAll(): Promise<{ status: string, data: ITeams[] }> {
    const teams = await this.teamModel.findAll();

    return { status: 'SUCCESS', data: teams };
  }
}
