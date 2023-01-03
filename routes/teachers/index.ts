import { Request, Router } from 'express';
import { checkSchema, matchedData } from 'express-validator';
import { uniqBy } from 'lodash';
import { HTTP_STATUS_CODES } from '../../constants/httpStatusCodes';
import { jwtAuthTeachers } from '../../middlewares/jwtAuthTeachers';
import validateErrorsHandler from '../../middlewares/validateErrorsHandler';
import { models, Sequelize } from '../../models';
import { Credit } from '../../models/Credit';
import { Exam } from '../../models/Exam';
import { Teacher } from '../../models/Teacher';
import { TypedResponseWithLocals } from '../../types/express';

const teachersRouter = Router();

const { literal: lt } = Sequelize;

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

      const sequelizeOptions = {};

      if (type === 'exam') {
        const examRecords = await models.Exam.findAll({
          where: {
            semesterId,
            subjectId,
            teacherId: currentUser.id,
          },
          attributes: ['mark'],
          include: [
            {
              association: 'student',
              where: {
                groupId,
              },
              attributes: ['id', 'firstname', 'lastname'],
              include: [
                {
                  association: 'recordBook',
                },
              ],
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
          attributes: {
            include: [[lt('status.alias'), 'mark']],
          },
          include: [
            {
              association: 'student',
              where: {
                groupId,
              },
              attributes: ['id', 'firstname', 'lastname'],
              include: [
                {
                  association: 'recordBook',
                },
              ],
            },
            {
              association: 'status',
              attributes: [],
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

teachersRouter.put(
  '/students/marks',
  jwtAuthTeachers,
  checkSchema({
    students: {
      isArray: true,
    },
    'students.id': {
      isInt: true,
      toInt: true,
    },
    // Mark может быть оценкой или id статуса зачета
    'students.mark': {
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
      const { students, type } = matchedData(req, {
        locations: ['body'],
      }) as {
        type: 'exam' | 'credit';
        students: { id: number; mark: number }[];
      };

      const currentUser = res.locals.user;

      if (type === 'exam') {
        await Promise.all(
          students.map(async (student) => {
            console.log({
              studentId: student.id,
              teacherId: currentUser.id,
            });
            const exam = await models.Exam.findOne({
              where: {
                studentId: student.id,
                teacherId: currentUser.id,
              },
            });
            console.log('exam', exam);

            if (exam) {
              exam.update({ mark: student.mark });
            }
          }),
        );

        return res.status(HTTP_STATUS_CODES.OK);
      } else {
        await Promise.all(
          students.map(async (student) => {
            const credit = await models.Credit.findOne({
              where: {
                studentId: student.id,
                teacherId: currentUser.id,
              },
            });

            if (credit) {
              credit.update({ statusId: student.mark });
            }
          }),
        );

        return res.status(HTTP_STATUS_CODES.OK);
      }
    } catch (error) {
      console.error(error.message);
      res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  },
);

export { teachersRouter };
