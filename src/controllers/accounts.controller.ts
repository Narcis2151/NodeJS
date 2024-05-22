import { Request, Response } from "express";

import logger from "../utils/logger";
import {
  CreateAccountInput,
  UpdateAccountNameInput,
  UpdateAccountBalanceInput,
  AccountParams,
  DeleteAccountInput,
} from "../schemas/accounts.schemas";
import {
  createAccount,
  deleteAccount,
  getAccountById,
  getAccounts,
  updateAccountBalance,
  updateAccountName,
} from "../services/accounts.service";

export async function getAccountsHandler(req: Request, res: Response) {
  try {
    console.log(res.locals.user);
    const accounts = await getAccounts(+res.locals.user);
    return res.status(200).send(accounts);
  } catch (e: any) {
    logger.error(e.message);
    return res.status(400).send(e.message);
  }
}

export async function createAccountHandler(
  req: Request<{}, {}, CreateAccountInput["body"]>,
  res: Response
) {
  try {
    const account = await createAccount(res.locals.user, req.body);
    return res.status(201).send(account);
  } catch (e: any) {
    logger.error(e.message);
    return res.status(400).send(e.message);
  }
}

export async function getAccountByIdHandler(
  req: Request<AccountParams>,
  res: Response
) {
  try {
    const account = await getAccountById(
      res.locals.user.userId,
      Number(req.params.accountId)
    );
    return res.status(200).send(account);
  } catch (e: any) {
    logger.error(e.message);
    return res.status(400).send(e.message);
  }
}

export async function updateAccountNameHandler(
  req: Request<AccountParams, {}, UpdateAccountNameInput["body"]>,
  res: Response
) {
  try {
    const account = await updateAccountName(
      res.locals.user,
      Number(req.params.accountId),
      req.body
    );
    return res.status(200).send(account);
  } catch (e: any) {
    logger.error(e.message);
    return res.status(400).send(e.message);
  }
}

export async function updateAccountBalanceHandler(
  req: Request<AccountParams, {}, UpdateAccountBalanceInput["body"]>,
  res: Response
) {
  try {
    const account = await updateAccountBalance(
      res.locals.user,
      Number(req.params.accountId),
      req.body
    );
    return res.status(200).send(account);
  } catch (e: any) {
    logger.error(e.message);
    return res.status(400).send(e.message);
  }
}

export async function deleteAccountHandler(
  req: Request<DeleteAccountInput["params"], {}, DeleteAccountInput["body"]>,
  res: Response
) {
  try {
    await deleteAccount(res.locals.user, Number(req.params.accountId), req.body.newAccountId);
    return res.status(204).send();
  } catch (e: any) {
    logger.error(e.message);
    return res.status(400).send(e.message);
  }
}
