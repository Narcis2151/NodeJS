import { Router } from "express";
import {
  registerUserHandler,
  loginUserHandler,
} from "../controllers/auth.controller";
import { registerSchema, loginSchema } from "../schemas/auth.schemas";
import validate from "../middleware/validateResource";

const router = Router();
router
  .post("/register", validate(registerSchema), registerUserHandler)
  .post("/login", validate(loginSchema), loginUserHandler);

export default router;
