import { Request, Response, NextFunction } from "express";
import { get } from "lodash";

import { verifyJwt } from "../utils/jwt";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const accessToken = get(req, "headers.authorization", "").replace(
      /^Bearer\s/,
      ""
    );

    if (!accessToken) {
      return next();
    }
    const { decoded, payload } = verifyJwt(accessToken);

    if (decoded) {
      res.locals.user = payload.userId;
      return next();
    }
  }

  if (req.isAuthenticated()) {
    res.locals.user = req.user as any;
    return next();
  }

  return next();
};

export default deserializeUser;
