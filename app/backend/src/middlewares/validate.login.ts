import { Request, Response, NextFunction } from 'express';
import JWT from '../utils/JWT';

export default class LoginValidate {
  static loginFieldsValidation(req:
  Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });
    if (!regex.test(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static tokenExtraction =
  (bearerToken: string):
  string => (
    bearerToken.includes(' ') ? bearerToken.split(' ')[1] : bearerToken
  );

  static tokenValidation(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    const theToken = LoginValidate.tokenExtraction(authorization);

    const validToken = JWT.verify(theToken);
    req.body.token = validToken;
    if (validToken === 'Token must be a valid token') {
      return res.status(401).json({ message: validToken });
    }

    next();
  }
}
