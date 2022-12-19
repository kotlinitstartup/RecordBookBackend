import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { omitBy } from 'lodash';
import { HTTP_STATUS_CODES } from '../constants/httpStatusCodes';
import { models } from '../models';

export const jwtAuthTeachers = async (
  req: any,
  res: any,
  next: NextFunction,
) => {
  try {
    const token = req.headers['Authorization'];

    const { id } = jwt.verify(token, process.env.JWT_SECRET) as { id: number };

    res.locals.user = await models.Teacher.findByPk(id, {
      rejectOnEmpty: true,
    });

    next();
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json(
      omitBy(
        {
          message:
            'При проверке подлинности произошла ошибка, пожалуйста войдите ещё раз',
          details:
            process.env.NODE_ENV !== 'production' &&
            (error?.toJSON ? error.toJSON() : JSON.stringify(error)),
        },
        (v) => !v,
      ),
    );
  }
};
