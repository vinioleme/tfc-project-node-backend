import ICRUDMatches from '../Interfaces/ICRUDMatches';
import IMatches from '../Interfaces/IMatches';
import MatchesModel from '../Models/matchesModel';
import IMatchesUpdate from '../Interfaces/IMatchesUpdate';
import ICreateMatch from '../Interfaces/ICreateMatch';

export default class MatchesService {
  constructor(private matchModel: ICRUDMatches<IMatches> = new MatchesModel()) {}

  async getAll(): Promise<{ status: string, data: IMatches[] }> {
    try {
      const matches = await this.matchModel.getAll();
      return { status: 'SUCCESS', data: matches };
    } catch (error) {
      return { status: 'ERROR', data: [] };
    }
  }

  async getAllInProgress(inProgress: string): Promise<{ status: string, data: IMatches[] }> {
    try {
      const matches = await this.matchModel.getAllInProgress(inProgress);
      return { status: 'SUCCESS', data: matches };
    } catch (error) {
      return { status: 'ERROR', data: [] };
    }
  }

  async matchesUpdate(id: string): Promise<{ status: string, data: { message: string } }> {
    try {
      const matches = await this.matchModel.matchesUpdate(id);
      return { status: 'SUCCESS', data: matches };
    } catch (error) {
      return { status: 'ERROR', data: { message: 'Failed to update match.' } };
    }
  }

  async update(id: string, match: IMatchesUpdate)
    : Promise<{ status: string, data: { message:string } }> {
    try {
      const upMatch = await this.matchModel.update(id, match);
      return { status: 'SUCCESS', data: upMatch };
    } catch (error) {
      return { status: 'ERROR', data: { message: 'Failed to update match.' } };
    }
  }

  async createNewMatch(match: ICreateMatch): Promise<{
    status: string, data: IMatches | null }> {
    try {
      const newMatch = await this.matchModel.createNewMatch(match);
      if (!newMatch) return { status: 'ERROR', data: null };
      return { status: 'SUCCESS', data: newMatch };
    } catch (error) {
      return { status: 'ERROR', data: null };
    }
  }
}
