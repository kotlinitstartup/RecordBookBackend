import { Router } from 'express';
import { studentsRouter } from '../students';
import { teachersAuthRouter } from './teachers';

const authRouter = Router();

authRouter.use('/teachers', teachersAuthRouter);
authRouter.use('/students', studentsRouter);

export { authRouter };
