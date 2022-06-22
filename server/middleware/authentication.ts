import type { Request, Response, NextFunction } from "express";

import { auth as middleware } from "./auth";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "../config/constants";
import type { RouteInfo, Method, UserRole } from "../types/api";

function matchCurrentUrl(
  urlPath: string,
  method: string
): {
  isMatched: boolean;
  userRoles?: UserRole[];
  isPublic?: boolean;
  isPrivate?: boolean;
} {
  const matchedPublicUrl: RouteInfo | undefined = PUBLIC_ROUTES.find(
    ({ url, methods }) =>
      methods
        ? url === urlPath && methods.includes(method.toUpperCase() as Method)
        : url === urlPath
  );

  if (matchedPublicUrl) {
    return { isMatched: !!matchedPublicUrl, isPublic: true };
  }
  const matchedPrivateUrl: RouteInfo | undefined = PRIVATE_ROUTES.find(
    ({ url, methods }) =>
      methods
        ? url === urlPath && methods.includes(method.toUpperCase() as Method)
        : url === urlPath
  );

  if (matchedPrivateUrl) {
    return {
      isMatched: !!matchedPrivateUrl,
      userRoles: matchedPrivateUrl.userRoles,
    };
  }

  return { isMatched: false };
}

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const { isMatched, isPublic, userRoles, isPrivate } = matchCurrentUrl(
    req.path,
    req.method
  );

  if (isMatched && isPublic) {
    return next();
  }

  if (isMatched && isPrivate) {
    middleware(req, res, next);

    return;
  }

  res.sendStatus(401);
};

export default authenticateUser;
