import { Request, Response } from "express";
import logger from "../utils/logger";
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  updateTransactionCategory,
} from "../services/transactions.service";

import {
  CreateTransactionInput,
  TransactionParams,
  UpdateTransactionCategoryInput,
  UpdateTransactionInput,
} from "../schemas/transactions.schemas";

export async function getTransactionsHandler(req: Request, res: Response) {
  try {
    const transactions = await getTransactions(+res.locals.user.userId);
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
    const transaction = await createTransaction(res.locals.user.userId, req.body);
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
      res.locals.user.userId,
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
      res.locals.user.userId,
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
    const transaction = await updateTransactionCategory(
      res.locals.user.userId,
      Number(req.params.transactionId),
      req.body.categoryId
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
    await deleteTransaction(res.locals.user.userId, Number(req.params.transactionId));
    return res.status(204).send();
  } catch (e: any) {
    logger.error(e.message);
    return res.status(400).send(e.message);
  }
}



