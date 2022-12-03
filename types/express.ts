import { Request } from "express";

export type TypedRequestWithParams<P> = Request<P, any, any, any>;
export type TypedRequestWithBody<B> = Request<any, any, B, any>;
