export default interface ICRUDLeaderboard<T> {
  getAll(): Promise<T[]>;
  getAllAway(): Promise<T[]>;
}
