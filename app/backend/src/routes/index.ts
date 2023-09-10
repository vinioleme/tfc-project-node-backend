import { Router } from 'express';
import teamsRouter from './teams.route';
import loginRouter from './login.route';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);

export default router;
