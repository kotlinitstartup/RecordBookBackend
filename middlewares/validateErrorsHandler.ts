import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { HTTP_STATUS_CODES } from '../constants/httpStatusCodes';

export default function validateErrorsHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    res.status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY).json(errors.array());
  }
}
