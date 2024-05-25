import { Router, Request, Response } from "express";

const router = Router();

/**
 * @swagger
 * /heartbeat:
 *   get:
 *     summary: Check if the server is alive
 *     tags:
 *       - Heartbeat
 *     responses:
 *       200:
 *         description: Server is alive
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "I am alive"
 */
router.get("/", (req: Request, res: Response) => {
  res.status(200).send("I am alive");
});

export default router;
