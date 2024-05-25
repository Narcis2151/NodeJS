import { Request, Response } from "express";
import logger from "../utils/logger";
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  updateTransactionCategories,
} from "../services/transactions.service";

import {
  CreateTransactionInput,
  FetchTransactionsInput,
  TransactionParams,
  UpdateTransactionCategoryInput,
  UpdateTransactionInput,
} from "../schemas/transactions.schemas";

export async function getTransactionsHandler(
  req: Request<{}, {}, {}, FetchTransactionsInput["query"]>,
  res: Response
) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const transactions = await getTransactions(+res.locals.user, page, limit);
    return res.status(200).send(transactions);
  } catch (e: any) {
    logger.error(e.message);
    return res.status(400).send(e.message);
  }
}

export async function createTransactionHandler(
  req: Request<{}, {}, CreateTransactionInput["body"]>,
  res: Response
) {
  try {
    const transaction = await createTransaction(res.locals.user, req.body);
    return res.status(201).send(transaction);
  } catch (e: any) {
    logger.error(e.message);
    return res.status(400).send(e.message);
  }
}

export async function getTransactionByIdHandler(
  req: Request<TransactionParams>,
  res: Response
) {
  try {
    const transaction = await getTransactionById(
      res.locals.user,
      Number(req.params.transactionId)
    );
    return res.status(200).send(transaction);
  } catch (e: any) {
    logger.error(e.message);
    return res.status(400).send(e.message);
  }
}

export async function updateTransactionHandler(
  req: Request<TransactionParams, {}, UpdateTransactionInput["body"]>,
  res: Response
) {
  try {
    const transaction = await updateTransaction(
      res.locals.user,
      Number(req.params.transactionId),
      req.body
    );
    return res.status(200).send(transaction);
  } catch (e: any) {
    logger.error(e.message);
    return res.status(400).send(e.message);
  }
}

export async function updateTransactionCategoryHandler(
  req: Request<TransactionParams, {}, UpdateTransactionCategoryInput["body"]>,
  res: Response
) {
  try {
    const transaction = await updateTransactionCategories(
      res.locals.user,
      Number(req.params.transactionId),
      req.body.categories
    );
    return res.status(200).send(transaction);
  } catch (e: any) {
    logger.error(e.message);
    return res.status(400).send(e.message);
  }
}

export async function deleteTransactionHandler(
  req: Request<TransactionParams>,
  res: Response
) {
  try {
    await deleteTransaction(res.locals.user, Number(req.params.transactionId));
    return res.status(204).send();
  } catch (e: any) {
    logger.error(e.message);
    return res.status(400).send(e.message);
  }
}
