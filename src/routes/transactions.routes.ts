import { Router } from "express";

import {
  createTransactionHandler,
  deleteTransactionHandler,
  getTransactionByIdHandler,
  getTransactionsHandler,
  updateTransactionHandler,
} from "../controllers/transactions.controller";
import {
  createTransactionSchema,
  transactionParamsSchema,
  updateTransactionSchema,
} from "../schemas/transactions.schemas";
import validate from "../middleware/validateResource";
import requireUser from "../middleware/requireUser";

const router = Router();

router.get("/", requireUser, getTransactionsHandler);
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
router.delete(
  "/:transactionId",
  [requireUser, validate(transactionParamsSchema)],
  deleteTransactionHandler
);

export default router;