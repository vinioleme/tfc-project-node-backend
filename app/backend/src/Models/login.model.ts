import UsersModelSequelize from '../database/models/UsersModelSequelize';
import ICRUDUser from '../Interfaces/ICRUDuser';
import IUsers from '../Interfaces/IUsers';

export default class UserModel implements ICRUDUser<IUsers> {
  private model = UsersModelSequelize;

  async getLogin(email: string): Promise<IUsers | null> {
    const loginUser = await this.model.findOne({ where: { email } });
    return loginUser;
  }
}
