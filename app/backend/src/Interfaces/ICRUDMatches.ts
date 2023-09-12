import IMatchesUpdate from './IMatchesUpdate';
import ICreateMatch from './ICreateMatch';

export default interface ICRUDMatches<T> {
  getAll(): Promise<T[]>;
  getAllInProgress(inProgress: string): Promise<T[]>;
  matchesUpdate(id: string): Promise<{ message: string }>;
  update(id: string, match: IMatchesUpdate): Promise<{ message: string }>;
  createNewMatch(match: ICreateMatch): Promise<T | null>;
}
