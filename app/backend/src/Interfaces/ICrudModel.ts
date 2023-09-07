export default interface ICRUDModel<T> {
  getAll(): Promise<T[]>;
  getOne(id: string): Promise<T | null>;
}
