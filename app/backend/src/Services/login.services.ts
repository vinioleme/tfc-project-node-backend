import { compareSync } from 'bcryptjs';
import IUsers from '../Interfaces/UsersInterface';
import ICRUDUser from '../Interfaces/UsersCrud';
import UserModel from '../Models/login.model';
import JWT from '../utils/JWT';

export default class LoginService {
  constructor(
    private teamModel: ICRUDUser<IUsers> = new UserModel(),
  ) {}

  async getLogin(email: string, password: string) {
    return this.teamModel.getLogin(email)
      .then((user) => {
        if (!user || !compareSync(password, user.password)) {
          return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
        }
        const token = JWT.sign({ email });
        return { status: 'SUCCESSFUL', data: { token } };
      })
      .catch(() => {
        throw new Error('Internal Server Error');
      });
  }

  async getAllRole(token: IUsers) {
    return this.teamModel.getLogin(token.email)
      .then((user) => ({ status: 'SUCCESSFUL', data: { role: user?.role } }))
      .catch(() => {
        throw new Error('Internal Server Error');
      });
  }
}
