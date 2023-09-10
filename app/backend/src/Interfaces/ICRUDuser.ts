export default interface ICRUDUser<T> {
  getLogin(email:string): Promise<T | null>;
}
