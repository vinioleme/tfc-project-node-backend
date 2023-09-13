import ICRUDModel from '../Interfaces/ModelCrud';
import ITeams from '../Interfaces/TeamsInterface';
import TeamsModel from '../Models/teams.model';

export default class TeamsService {
  constructor(
    private teamModel: ICRUDModel<ITeams> = new TeamsModel(),
  ) {}

  async getAll(): Promise<{ status: string, data: ITeams[] }> {
    const teams = await this.teamModel.getAll();

    return { status: 'SUCCESS', data: teams };
  }

  async getOne(id: string): Promise<{ status: string, data: ITeams | null }> {
    try {
      const team = await this.teamModel.getOne(id);

      if (!team) {
        return { status: 'NOT_FOUND', data: null };
      }

      return { status: 'SUCCESS', data: team };
    } catch (error) {
      console.error('Erro ao buscar equipe:', error);

      return { status: 'ERROR', data: null };
    }
  }
}
