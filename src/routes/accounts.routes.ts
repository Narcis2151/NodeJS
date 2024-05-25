import { Router } from "express";
import {
  createAccountHandler,
  deleteAccountHandler,
  getAccountByIdHandler,
  getAccountsHandler,
  updateAccountBalanceHandler,
  updateAccountNameHandler,
} from "../controllers/accounts.controller";
import {
  accountParamsSchema,
  createAccountSchema,
  deleteAccountSchema,
  updateAccountBalanceSchema,
  updateAccountNameSchema,
} from "../schemas/accounts.schemas";
import validate from "../middleware/validateResource";
import requireUser from "../middleware/requireUser";

const router = Router();

/**
 * @swagger
 * /accounts:
 *   get:
 *     summary: Get all accounts
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Accounts
 *     responses:
 *       200:
 *         description: List of accounts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AccountsResponse'
 */
router.get("/", requireUser, getAccountsHandler);

/**
 * @swagger
 * /accounts:
 *   post:
 *     summary: Create a new account
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Accounts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAccountInput'
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AccountResponse'
 *       400:
 *         description: Invalid input
 */
router.post(
  "/",
  [requireUser, validate(createAccountSchema)],
  createAccountHandler
);

/**
 * @swagger
 * /accounts/{accountId}:
 *   get:
 *     summary: Get account by ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Accounts
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the account
 *     responses:
 *       200:
 *         description: Account details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AccountResponse'
 *       404:
 *         description: Account not found
 */
router.get(
  "/:accountId",
  [requireUser, validate(accountParamsSchema)],
  getAccountByIdHandler
);

/**
 * @swagger
 * /accounts/{accountId}/name:
 *   put:
 *     summary: Update account name
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Accounts
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAccountNameInput'
 *     responses:
 *       200:
 *         description: Account name updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AccountResponse'
 *       400:
 *         description: Invalid input
 */
router.put(
  "/:accountId/name",
  [requireUser, validate(updateAccountNameSchema)],
  updateAccountNameHandler
);

/**
 * @swagger
 * /accounts/{accountId}/balance:
 *   put:
 *     summary: Update account balance
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Accounts
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAccountBalanceInput'
 *     responses:
 *       200:
 *         description: Account balance updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AccountResponse'

 *       400:
 *         description: Invalid input
 */
router.put(
  "/:accountId/balance",
  [requireUser, validate(updateAccountBalanceSchema)],
  updateAccountBalanceHandler
);

/**
 * @swagger
 * /accounts/{accountId}:
 *   delete:
 *     summary: Delete an account
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Accounts
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteAccountInput'
 *     responses:
 *       204:
 *         description: Account deleted successfully
 *       400:
 *         description: Invalid input
 */
router.delete(
  "/:accountId",
  [requireUser, validate(deleteAccountSchema)],
  deleteAccountHandler
);

export default router;
