import { Request, Response } from 'express';
import LoginService from '../Services/login.services';

export default class LoginController {
  constructor(
    private loginService = new LoginService(),
  ) {}

  getLogin(req:
  Request, res: Response) {
    const { email, password } = req.body;
    this.loginService
      .getLogin(email, password)
      .then((tokenValid) => {
        if (tokenValid.status === 'UNAUTHORIZED') return res.status(401).json(tokenValid.data);
        return res.status(200).json(tokenValid.data);
      })
      .catch((error) => res.status(500).json({ message: 'Internal Server Error', error }));
  }

  getAllRole(req:
  Request, res: Response) {
    const { token } = req.body;
    this.loginService
      .getAllRole(token)
      .then((role) => res.status(200).json(role.data))
      .catch((error) => res.status(500).json({ message: 'Internal Server Error', error }));
  }
}
