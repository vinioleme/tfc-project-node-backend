import TeamsModelSequelize from '../database/models/TeamsModelSequelize';
import ICRUDModel from '../Interfaces/ModelCrud';
import ITeams from '../Interfaces/TeamsInterface';

export default class TeamsModel implements ICRUDModel<ITeams> {
  private model = TeamsModelSequelize;

  async getAll(): Promise<ITeams[]> {
    const result = await this.model.findAll();
    return result.map(({ id, teamName }) => ({ id, teamName }));
  }

  async getOne(id: string): Promise<ITeams | null> {
    try {
      const result = await this.model.findByPk(id);
      return result || null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
