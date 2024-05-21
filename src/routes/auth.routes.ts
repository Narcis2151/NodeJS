import { Router } from "express";
import passport from "passport";
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
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/heartbeat");
  }
);

export default router;
