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
router.get("/", requireUser, getBudgetsHandler);
router.post(
  "/",
  [requireUser, validate(createBudgetSchema)],
  createBudgetHandler
);
router.get(
  "/:budgetId",
  [requireUser, validate(budgetParamsSchema)],
  getBudgetByIdHandler
);
router.put(
  "/:budgetId/amount",
  [requireUser, validate(updateBudgetAmountSchema)],
  updateBudgetAmountHandler
);
router.delete(
  "/:budgetId",
  [requireUser, validate(budgetParamsSchema)],
  deleteBudgetHandler
);

export default router;