import { Response, Router } from 'express';
import { check, matchedData } from 'express-validator';
import { Transaction } from 'sequelize';
import { HTTP_STATUS_CODES } from '../../../constants/httpStatusCodes';
import { onlyAdmin } from '../../../middlewares/onlyAdmin';
import validateErrorsHandler from '../../../middlewares/validateErrorsHandler';
import { models, sequelize } from '../../../models';
import { RecordBook } from '../../../models/RecordBook';
import { TypedRequestWithBody } from '../../../types/express';
import { signPayload } from '../../../utils/jwt';
import { LoginPayload } from './login.dto';

const studentsAuthRouter = Router();

studentsAuthRouter.post(
  '/login',
  check('recordBookNumber')
    .isString()
    .isLength({ min: 10, max: 10 })
    .withMessage('Длина номера зачетки должна быть 10 символов'),
  validateErrorsHandler,
  async (req: TypedRequestWithBody<LoginPayload>, res: Response) => {
    const { recordBookNumber } = matchedData(req, { locations: ['body'] });
    console.log('recordBookNumber', recordBookNumber);
    const currentRecordBook = await models.RecordBook.findOne({
      where: {
        number: recordBookNumber,
      },
      attributes: ['id', 'studentId'],
    });

    if (!currentRecordBook) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        message: 'По данному номеру зачетки не найден студент',
      });
    }

    const student = await models.Student.findByPk(currentRecordBook.studentId);

    return res.status(HTTP_STATUS_CODES.OK).json({
      user: student,
      token: signPayload({ id: currentRecordBook.studentId }),
    });
  },
);

function generateRandomNumberString() {
  let result = '';
  for (let i = 0; i < 10; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
}

const createRecordBook = async (
  transaction: Transaction,
): Promise<RecordBook> => {
  const newNumber = generateRandomNumberString();

  const existsRecordBook = await models.RecordBook.findOne({
    where: {
      number: newNumber,
    },
  });

  if (existsRecordBook) {
    return createRecordBook(transaction);
  }

  const createdRecordBook = await models.RecordBook.create(
    {
      number: newNumber,
    },
    {
      transaction,
    },
  );

  return createdRecordBook;
};

studentsAuthRouter.post(
  '/signup',
  onlyAdmin,
  check('firstname').isString(),
  check('lastname').isString(),
  check('patronymic').isString(),
  check('groupId').isInt().toInt(),
  validateErrorsHandler,
  async (req: TypedRequestWithBody<LoginPayload>, res: Response) => {
    const { firstname, lastname, patronymic, groupId } = matchedData(req, {
      locations: ['body'],
    });

    await sequelize.transaction(async (transaction) => {
      const currentGroup = await models.Group.findByPk(groupId);

      if (!currentGroup) {
        throw new Error('Нет такой группы');
      }

      const createdRecordBook = await createRecordBook(transaction);

      const createdStudent = await models.Student.create(
        {
          firstname,
          lastname,
          patronymic,
          groupId,
          recordBookId: createdRecordBook.id,
        },
        {
          transaction,
        },
      );

      await createdRecordBook.update(
        { studentId: createdStudent.id },
        { transaction },
      );
    });

    return res.sendStatus(HTTP_STATUS_CODES.OK);
  },
);

export { studentsAuthRouter };
