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

router.get("/", [requireUser, validate(fetchTransactionsSchema)], getTransactionsHandler);
router.post(
  "/",
  [requireUser, validate(createTransactionSchema)],
  createTransactionHandler
);
router.get(
  "/:transactionId",
  [requireUser, validate(transactionParamsSchema)],
  getTransactionByIdHandler
);
router.put(
  "/:transactionId",
  [requireUser, validate(updateTransactionSchema)],
  updateTransactionHandler
);
router.patch(
  "/:transactionId/category",
  [requireUser, validate(updateTransactionCategorySchema)],
  updateTransactionCategoryHandler
);
router.delete(
  "/:transactionId",
  [requireUser, validate(transactionParamsSchema)],
  deleteTransactionHandler
);

export default router;
