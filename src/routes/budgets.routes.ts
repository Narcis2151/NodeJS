import { Router } from "express";
import {
  createBudgetHandler,
  deleteBudgetHandler,
  getBudgetByIdHandler,
  getBudgetsHandler,
  updateBudgetAmountHandler,
} from "../controllers/budgets.controller";
import {
  budgetParamsSchema,
  createBudgetSchema,
  updateBudgetAmountSchema,
} from "../schemas/budgets.schemas";
import validate from "../middleware/validateResource";
import requireUser from "../middleware/requireUser";

const router = Router();

/**
 * @swagger
 * /budgets:
 *   get:
 *     summary: Get all budgets
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Budgets
 *     responses:
 *       200:
 *         description: List of budgets
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BudgetsResponse'
 *       401:
 *         description: Unauthorized access
 */
router.get("/", requireUser, getBudgetsHandler);

/**
 * @swagger
 * /budgets:
 *   post:
 *     summary: Create a new budget
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Budgets
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBudgetInput'
 *     responses:
 *       201:
 *         description: Budget created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BudgetResponse'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized access
 */
router.post(
  "/",
  [requireUser, validate(createBudgetSchema)],
  createBudgetHandler
);

/**
 * @swagger
 * /budgets/{budgetId}:
 *   get:
 *     summary: Get budget by ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Budgets
 *     parameters:
 *       - in: path
 *         name: budgetId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the budget
 *     responses:
 *       200:
 *         description: Budget details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BudgetResponse'
 *       404:
 *         description: Budget not found
 *       401:
 *         description: Unauthorized access
 */
router.get(
  "/:budgetId",
  [requireUser, validate(budgetParamsSchema)],
  getBudgetByIdHandler
);

/**
 * @swagger
 * /budgets/{budgetId}/amount:
 *   put:
 *     summary: Update budget amount
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Budgets
 *     parameters:
 *       - in: path
 *         name: budgetId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the budget
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBudgetAmountInput'
 *     responses:
 *       200:
 *         description: Budget amount updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BudgetResponse'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized access
 */
router.put(
  "/:budgetId/amount",
  [requireUser, validate(updateBudgetAmountSchema)],
  updateBudgetAmountHandler
);

/**
 * @swagger
 * /budgets/{budgetId}:
 *   delete:
 *     summary: Delete a budget
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Budgets
 *     parameters:
 *       - in: path
 *         name: budgetId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the budget
 *     responses:
 *       204:
 *         description: Budget deleted successfully
 *       401:
 *         description: Unauthorized access
 */
router.delete(
  "/:budgetId",
  [requireUser, validate(budgetParamsSchema)],
  deleteBudgetHandler
);

export default router;
