import { Request, Router } from 'express';
import { uniqBy } from 'lodash';
import { HTTP_STATUS_CODES } from '../../constants/httpStatusCodes';
import { jwtAuthTeachers } from '../../middlewares/jwtAuthTeachers';
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

export { teachersRouter };
