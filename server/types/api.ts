import type { Request, Response, NextFunction } from 'express'

export type MiddlewareCallBackFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => unknown

export type CallBackFunction = (req: Request, res: Response) => unknown

export type Method = 'GET' | 'POST' | 'DELETE' | 'PATCH'

export type UrlPath = { url: string; methods?: Method[] }

export type Paths = UrlPath[]
