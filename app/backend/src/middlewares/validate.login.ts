import { Request, Response, NextFunction } from 'express';
import JWT from '../utils/JWT';

export default class LoginValidate {
  static fieldsValidation(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!emailRegex.test(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static tokenExtraction = (bearerToken: string): string => {
    const tokenParts = bearerToken.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return '';
    }
    return tokenParts[1];
  };

  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = LoginValidate.tokenExtraction(authorization);

    if (!token) {
      return res.status(401).json({ message: 'Invalid token format' });
    }

    const validToken = JWT.verify(token);
    if (typeof validToken === 'string' && validToken === 'Token must be a valid token') {
      return res.status(401).json({ message: validToken });
    }

    req.body.token = validToken;
    next();
  }
}
