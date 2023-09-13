export default interface ICRUDLeaderboard<T> {
  getAll(): Promise<T[]>;
}
