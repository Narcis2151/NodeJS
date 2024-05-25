import { Router } from "express";

import {
  createTransactionHandler,
  deleteTransactionHandler,
  getTransactionByIdHandler,
  getTransactionsHandler,
  updateTransactionHandler,
  updateTransactionCategoryHandler,
} from "../controllers/transactions.controller";
import {
  fetchTransactionsSchema,
  createTransactionSchema,
  transactionParamsSchema,
  updateTransactionSchema,
  updateTransactionCategorySchema,
} from "../schemas/transactions.schemas";
import validate from "../middleware/validateResource";
import requireUser from "../middleware/requireUser";

const router = Router();

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get all transactions
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *         description: Number of transactions per page
 *     responses:
 *       200:
 *         description: List of transactions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionsResponse'
 *       401:
 *         description: Unauthorized access
 */
router.get(
  "/",
  [requireUser, validate(fetchTransactionsSchema)],
  getTransactionsHandler
);

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a new transaction
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Transactions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTransactionInput'
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionResponse'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized access
 */
router.post(
  "/",
  [requireUser, validate(createTransactionSchema)],
  createTransactionHandler
);

/**
 * @swagger
 * /transactions/{transactionId}:
 *   get:
 *     summary: Get transaction by ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the transaction
 *     responses:
 *       200:
 *         description: Transaction details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionResponse'
 *       404:
 *         description: Transaction not found
 *       401:
 *         description: Unauthorized access
 */
router.get(
  "/:transactionId",
  [requireUser, validate(transactionParamsSchema)],
  getTransactionByIdHandler
);

/**
 * @swagger
 * /transactions/{transactionId}:
 *   put:
 *     summary: Update a transaction
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTransactionInput'
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionResponse'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized access
 */
router.put(
  "/:transactionId",
  [requireUser, validate(updateTransactionSchema)],
  updateTransactionHandler
);

/**
 * @swagger
 * /transactions/{transactionId}/category:
 *   patch:
 *     summary: Update transaction category
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTransactionCategoryInput'
 *     responses:
 *       200:
 *         description: Transaction category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionResponse'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized access
 */
router.patch(
  "/:transactionId/category",
  [requireUser, validate(updateTransactionCategorySchema)],
  updateTransactionCategoryHandler
);

/**
 * @swagger
 * /transactions/{transactionId}:
 *   delete:
 *     summary: Delete a transaction
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the transaction
 *     responses:
 *       204:
 *         description: Transaction deleted successfully
 *       401:
 *         description: Unauthorized access
 */
router.delete(
  "/:transactionId",
  [requireUser, validate(transactionParamsSchema)],
  deleteTransactionHandler
);

export default router;
