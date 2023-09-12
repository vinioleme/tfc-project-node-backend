import { Router } from 'express';
import teamsRouter from './teams.route';
import loginRouter from './login.route';
import matchesRouter from './matches.route';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);
router.use('/matches', matchesRouter);

export default router;
