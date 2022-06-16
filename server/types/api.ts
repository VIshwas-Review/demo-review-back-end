import type { Request, Response, NextFunction } from "express";

export type MiddlewareCallBackFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => unknown;

export type CallBackFunction = (req: Request, res: Response) => unknown;

export type Method = "GET" | "POST" | "DELETE" | "PATCH";
export type UserRole = "admin" | "owner" | "user";

export type RouteInfo = {
  url: string;
  methods?: Method[];
  userRoles?: UserRole[];
};
