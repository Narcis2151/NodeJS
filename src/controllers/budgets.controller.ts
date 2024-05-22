import { Request, Response } from "express";

import logger from "../utils/logger";

import {
  CreateBudgetInput,
  UpdateBudgetAmountInput,
  BudgetParams,
} from "../schemas/budgets.schemas";

import {
  createBudget,
  deleteBudget,
  getBudgetById,
  getBudgets,
  updateBudgetAmount,
} from "../services/budgets.service";

export async function getBudgetsHandler(req: Request, res: Response) {
  try {
    const budgets = await getBudgets(+res.locals.user);
    return res.status(200).send(budgets);
  } catch (e: any) {
    logger.error(e.message);
    return res.status(400).send(e.message);
  }
}

export async function createBudgetHandler(
  req: Request<{}, {}, CreateBudgetInput["body"]>,
  res: Response
) {
  try {
    const budget = await createBudget(res.locals.user, req.body);
    return res.status(201).send(budget);
  } catch (e: any) {
    logger.error(e.message);
    return res.status(400).send(e.message);
  }
}

export async function getBudgetByIdHandler(
  req: Request<BudgetParams>,
  res: Response
) {
  try {
    const budget = await getBudgetById(
      res.locals.user,
      Number(req.params.budgetId)
    );
    return res.status(200).send(budget);
  } catch (e: any) {
    logger.error(e.message);
    return res.status(400).send(e.message);
  }
}

export async function updateBudgetAmountHandler(
  req: Request<BudgetParams, {}, UpdateBudgetAmountInput["body"]>,
  res: Response
) {
  try {
    const budget = await updateBudgetAmount(
      res.locals.user,
      Number(req.params.budgetId),
      req.body
    );
    return res.status(200).send(budget);
  } catch (e: any) {
    logger.error(e.message);
    return res.status(400).send(e.message);
  }
}

export async function deleteBudgetHandler(
  req: Request<BudgetParams>,
  res: Response
) {
  try {
    await deleteBudget(res.locals.user, Number(req.params.budgetId));
    return res.status(204).send();
  } catch (e: any) {
    logger.error(e.message);
    return res.status(400).send(e.message);
  }
}
