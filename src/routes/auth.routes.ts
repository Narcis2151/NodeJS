import { Router } from "express";
import passport from "passport";
import {
  registerUserHandler,
  loginUserHandler,
} from "../controllers/auth.controller";
import { registerSchema, loginSchema } from "../schemas/auth.schemas";
import validate from "../middleware/validateResource";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUserInput'
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JwtToken'
 *       400:
 *         description: Email already registered
 */
router.post("/register", validate(registerSchema), registerUserHandler);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUserInput'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JwtToken'
 *       400:
 *         description: Invalid email or password
 */
router.post("/login", validate(loginSchema), loginUserHandler);

/**
 * @swagger
 * /auth/github:
 *   get:
 *     summary: GitHub authentication
 *     tags:
 *       - Auth
 *     responses:
 *       302:
 *         description: Redirects to GitHub for authentication
 */
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

/**
 * @swagger
 * /auth/github/callback:
 *   get:
 *     summary: GitHub authentication callback
 *     tags:
 *       - Auth
 *     responses:
 *       302:
 *         description: Redirects based on authentication success or failure
 */
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (_req, res) => {
    res.redirect("/heartbeat");
  }
);

export default router;
