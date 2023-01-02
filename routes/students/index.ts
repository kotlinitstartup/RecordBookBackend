import { Request, Router } from 'express';
import { checkSchema, matchedData } from 'express-validator';
import { HTTP_STATUS_CODES } from '../../constants/httpStatusCodes';
import { jwtAuthStudents } from '../../middlewares/jwtAuthStudents';
import validateErrorsHandler from '../../middlewares/validateErrorsHandler';
import { models } from '../../models';
import { Student } from '../../models/Student';
import { TypedResponseWithLocals } from '../../types/express';

const studentsRouter = Router();

studentsRouter.get(
  '/marks',
  jwtAuthStudents,
  checkSchema({
    semesterId: {
      isInt: true,
      toInt: true,
    },
    type: {
      isString: true,
    },
  }),
  validateErrorsHandler,
  async (req: Request, res: TypedResponseWithLocals<{ user: Student }>) => {
    try {
      const { semesterId, type } = matchedData(req, {
        locations: ['query'],
      }) as {
        semesterId: number;
        type: string;
      };

      const currentUser = res.locals.user;

      if (type === 'exam') {
        const examRecords = await models.Exam.findAll({
          where: {
            semesterId,
            studentId: currentUser.id,
          },
          include: [
            {
              association: 'student',
              where: {
                groupId: currentUser.groupId,
              },
            },
          ],
        });

        return res.status(HTTP_STATUS_CODES.OK).json(examRecords);
      } else {
        const creditRecords = await models.Credit.findAll({
          where: {
            semesterId,
            studentId: currentUser.id,
          },
          include: [
            {
              association: 'student',
              where: {
                groupId: currentUser.groupId,
              },
            },
          ],
        });

        return res.status(HTTP_STATUS_CODES.OK).json(creditRecords);
      }
    } catch (error) {
      console.error(error.message);
      res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  },
);
export { studentsRouter };
