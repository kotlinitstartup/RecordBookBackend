import { Request, Response } from 'express';

export type TypedRequestWithParams<P> = Request<P, any, any, any>;
export type TypedRequestWithBody<B> = Request<any, any, B, any>;
export type TypedRequestWithQuery<Q> = Request<any, any, any, Q>;

export type TypedResponseWithLocals<L> = Response<any, L>;
