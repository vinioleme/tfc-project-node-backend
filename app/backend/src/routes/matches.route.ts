import { Request, Router, Response } from 'express';
import MatchesController from '../Controllers/matches.controller';
import LoginValidate from '../middlewares/validate.login';
import MatchValidate from '../middlewares/validate.match';

const router = Router();

const matchesController = new MatchesController();

router.get('/', (req: Request, res: Response) => matchesController.getAll(req, res));
router.patch(
  '/:id/finish',
  LoginValidate.tokenValidation,
  (req: Request, res: Response) => matchesController.matchesUpdate(req, res),
);
router.patch(
  '/:id',
  LoginValidate.tokenValidation,
  (req: Request, res: Response) => matchesController.update(req, res),
);
router.post(
  '/',
  LoginValidate.tokenValidation,
  MatchValidate.fieldsValidation,
  (req: Request, res: Response) => matchesController.createNewMatch(req, res),
);
export default router;
