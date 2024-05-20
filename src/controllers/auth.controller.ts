import { Request, Response } from "express";

import logger from "../utils/logger";
import { LoginUserInput, RegisterUserInput } from "../schemas/auth.schemas";
import { loginUser, registerUser } from "../services/auth.service";

export async function registerUserHandler(
  req: Request<{}, {}, RegisterUserInput>,
  res: Response
) {
  try {
    const accessToken = await registerUser(req.body);
    return res.status(201).send({ accessToken });
  } catch (e: any) {
    logger.error(e.message);
    return res.status(400).send(e.message);
  }
}

export async function loginUserHandler(req: Request<{}, {}, LoginUserInput>, res: Response) {
  try {
    const accessToken = await loginUser(req.body);
    return res.status(200).send({ accessToken });
  } catch (e: any) {
    logger.error(e.message);
    return res.status(400).send(e.message);
  }
}
