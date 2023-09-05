import TeamsModelSequelize from '../database/models/TeamsModelSequelize';
import ICRUDModel from '../Interfaces/ICrudModel';
import ITeams from '../Interfaces/ITeams';

export default class TeamsModel implements ICRUDModel<ITeams> {
  private model = TeamsModelSequelize;

  async findAll(): Promise<ITeams[]> {
    const result = await this.model.findAll();
    return result.map(({ id, teamName }) => ({ id, teamName }));
  }
}
