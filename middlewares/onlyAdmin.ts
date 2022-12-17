import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS_CODES } from '../constants/httpStatusCodes';

export const onlyAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers['adminkey'] === process.env.ADMIN_KEY) {
    return next();
  }

  return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({
    message: 'Ты не админ!',
  });
};
