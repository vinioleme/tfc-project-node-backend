import { Request, Router, Response } from 'express';
import LoginController from '../Controllers/login.controller';
import LoginValidate from '../middlewares/validate.login';

const router = Router();

const loginController = new LoginController();

router.post(
  '/',
  LoginValidate.fieldsValidation,
  (req: Request, res: Response) => loginController.getLogin(req, res),
);

router.get(
  '/role',
  LoginValidate.validateToken,
  (req: Request, res: Response) => loginController.getAllRole(req, res),
);

export default router;
