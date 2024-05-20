import { Request, Response, NextFunction } from "express";

const requireClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (!user) {
    return res.status(403).send("Forbidden");
  }

  return next();
};

export default requireClient;
