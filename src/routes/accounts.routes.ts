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
router.get("/", requireUser, getAccountsHandler);
router.post(
  "/",
  [requireUser, validate(createAccountSchema)],
  createAccountHandler
);
router.get(
  "/:accountId",
  [requireUser, validate(accountParamsSchema)],
  getAccountByIdHandler
);
router.put(
  "/:accountId/name",
  [requireUser, validate(updateAccountNameSchema)],
  updateAccountNameHandler
);
router.put(
  "/:accountId/balance",
  [requireUser, validate(updateAccountBalanceSchema)],
  updateAccountBalanceHandler
);
router.delete(
  "/:accountId",
  [requireUser, validate(deleteAccountSchema)],
  deleteAccountHandler
);

export default router;
