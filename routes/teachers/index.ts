import { Request, Router } from 'express';
import { checkSchema, matchedData } from 'express-validator';
import { uniqBy } from 'lodash';
import { HTTP_STATUS_CODES } from '../../constants/httpStatusCodes';
import { jwtAuthTeachers } from '../../middlewares/jwtAuthTeachers';
import validateErrorsHandler from '../../middlewares/validateErrorsHandler';
import { models } from '../../models';
import { Credit } from '../../models/Credit';
import { Exam } from '../../models/Exam';
import { Teacher } from '../../models/Teacher';
import { TypedResponseWithLocals } from '../../types/express';

const teachersRouter = Router();

teachersRouter.get(
  '/filters',
  jwtAuthTeachers,
  async (req: Request, res: TypedResponseWithLocals<{ user: Teacher }>) => {
    try {
      const currentUser = res.locals.user;
      const subjects = await currentUser.getSubjects({
        attributes: ['id', 'name'],
      });

      const exams = await currentUser
        .getExams({
          include: [
            {
              association: 'student',
              attributes: ['id'],
              include: [
                {
                  association: 'group',
                  attributes: ['id', 'name'],
                },
              ],
            },
          ],
        })
        .then((data) =>
          data.map((el) => el.toJSON() as Pick<Exam, 'id' | 'student'>),
        );

      const credits = await currentUser
        .getCredits({
          attributes: ['id'],
          include: [
            {
              association: 'student',
              attributes: ['id'],
              include: [
                {
                  association: 'group',
                  attributes: ['id', 'name'],
                },
              ],
            },
          ],
        })
        .then((data) =>
          data.map((el) => el.toJSON() as Pick<Credit, 'id' | 'student'>),
        );

      const examsAndCredits = [...exams, ...credits];

      const groups = uniqBy(
        examsAndCredits.map((el) => {
          return el.student.group;
        }),
        'student.group.id',
      );

      return res.status(HTTP_STATUS_CODES.OK).json({
        subjects,
        groups,
      });
    } catch (error) {
      console.error(error.message);
      res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  },
);

teachersRouter.get(
  '/students',
  jwtAuthTeachers,
  checkSchema({
    semesterId: {
      isInt: true,
      toInt: true,
    },
    groupId: {
      isInt: true,
      toInt: true,
    },
    subjectId: {
      isInt: true,
      toInt: true,
    },
    type: {
      isString: true,
    },
  }),
  validateErrorsHandler,
  async (req: Request, res: TypedResponseWithLocals<{ user: Teacher }>) => {
    try {
      const { semesterId, groupId, subjectId, type } = matchedData(req, {
        locations: ['query'],
      }) as {
        semesterId: number;
        groupId: number;
        subjectId: number;
        type: string;
      };

      const currentUser = res.locals.user;

      if (type === 'exam') {
        const examRecords = await models.Exam.findAll({
          where: {
            semesterId,
            subjectId,
            teacherId: currentUser.id,
          },
          include: [
            {
              association: 'student',
              where: {
                groupId,
              },
            },
          ],
        });

        return res.status(HTTP_STATUS_CODES.OK).json(examRecords);
      } else {
        const creditRecords = await models.Credit.findAll({
          where: {
            semesterId,
            subjectId,
            teacherId: currentUser.id,
          },
          include: [
            {
              association: 'student',
              where: {
                groupId,
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

export { teachersRouter };
