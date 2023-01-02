import { Router } from 'express';
import { studentsAuthRouter } from './students';
import { teachersAuthRouter } from './teachers';

const authRouter = Router();

authRouter.use('/teachers', teachersAuthRouter);
authRouter.use('/students', studentsAuthRouter);

export { authRouter };
