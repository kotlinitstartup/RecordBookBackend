import bcrypt from 'bcrypt';
import { Response, Router } from 'express';
import { check, matchedData } from 'express-validator';
import { HTTP_STATUS_CODES } from '../../../constants/httpStatusCodes';
import { onlyAdmin } from '../../../middlewares/onlyAdmin';
import validateErrorsHandler from '../../../middlewares/validateErrorsHandler';
import { models } from '../../../models';
import { TypedRequestWithBody } from '../../../types/express';
import { LoginPayload } from './login.dto';

const studentsAuthRouter = Router();

studentsAuthRouter.post(
  '/login',
  check('email').isEmail().withMessage('Вы передали не email'),
  check('password')
    .isLength({ min: 4, max: 16 })
    .withMessage(
      'Пароль должен быть не менее 4 символов и 16 символов в длину',
    ),
  validateErrorsHandler,
  async (req: TypedRequestWithBody<LoginPayload>, res: Response) => {
    const { email, password } = matchedData(req);
    console.log('{ email, password } ', { email, password });

    const currentTeacher = await models.Teacher.findOne({
      where: {
        email,
      },
      attributes: ['id', 'firstname', 'lastname', 'password'],
    });

    if (!currentTeacher) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        message: 'По данному email не найден пользователь',
      });
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      currentTeacher.password,
    );

    if (!isCorrectPassword) {
      return res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZED);
    }

    return res.status(HTTP_STATUS_CODES.OK).json({
      id: currentTeacher.id,
      firstname: currentTeacher.firstname,
      lastname: currentTeacher.lastname,
    });
  },
);

studentsAuthRouter.post(
  '/signup',
  onlyAdmin,
  check('email').isEmail().withMessage('Вы передали не email'),
  check('firstname').isString(),
  check('lastname').isString(),
  check('patronymic').isString(),
  check('password')
    .isLength({ min: 4, max: 16 })
    .withMessage(
      'Пароль должен быть не менее 4 символов и 16 символов в длину',
    ),
  validateErrorsHandler,
  async (req: TypedRequestWithBody<LoginPayload>, res: Response) => {
    const { email, firstname, lastname, patronymic, password } = matchedData(
      req,
      {
        locations: ['body'],
      },
    );

    const salt = await bcrypt.genSalt(10);
    const hashingPassword = await bcrypt.hash(password, salt);

    await models.Teacher.create({
      email,
      firstname,
      lastname,
      patronymic,
      password: hashingPassword,
    });

    return res.status(HTTP_STATUS_CODES.OK);
  },
);

export { studentsAuthRouter };
