import jwt from 'jsonwebtoken';

export const signPayload = (payload: { id: number }) =>
  jwt.sign(payload, process.env.JWT_SECRET);
