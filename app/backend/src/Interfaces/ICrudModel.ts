export default interface ICRUDModel<T> {
  findAll(): Promise<T[]>;
}
