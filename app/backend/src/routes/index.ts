import { Router } from 'express';
import teamsRouter from './teams.route';

const router = Router();

router.use('/teams', teamsRouter);

export default router;
