import type { Request, Response, NextFunction } from "express";

import type {
  MiddlewareCallBackFunction,
  RouteInfo,
  Method,
} from "../types/api";

function matchCurrentUrl(
  routesToExlcude: RouteInfo[],
  urlPath: string,
  method: string
): boolean {
  const matchedUrl: RouteInfo | undefined = routesToExlcude.find(
    (item) => item.url === urlPath
  );

  if (matchedUrl) {
    return matchedUrl.methods
      ? matchedUrl.methods.includes(method.toUpperCase() as Method)
      : true;
  }

  return false;
}

const authenticateUser =
  (
    routesToExlcude: RouteInfo[],
    middleware: MiddlewareCallBackFunction
  ): MiddlewareCallBackFunction =>
  (req: Request, res: Response, next: NextFunction) => {
    const isMatched = matchCurrentUrl(routesToExlcude, req.path, req.method);

    if (isMatched) {
      return next();
    }

    middleware(req, res, next);
  };

export default authenticateUser;
