import { PrismaClient } from "@prisma/client";
import {
  CreateAccountInput,
  UpdateAccountBalanceInput,
  UpdateAccountNameInput,
} from "../schemas/accounts.schemas";

const prisma = new PrismaClient();

export async function getAccounts(userId: number) {
  return await prisma.account.findMany({
    where: {
      userId: userId,
    },
  });
}

export async function createAccount(
  userId: number,
  data: CreateAccountInput["body"]
) {
  const createdAccount = await prisma.account.create({
    data: {
      ...data,
      balanceUpdatedAt: new Date(),
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return createdAccount;
}

export async function getAccountById(userId: number, accountId: number) {
  const account = await prisma.account.findUnique({
    where: {
      userId: userId,
      id: accountId,
    },
  });

  if (!account) {
    throw new Error("Account not found");
  }

  return account;
}

export async function updateAccountName(
  userId: number,
  accountId: number,
  data: UpdateAccountNameInput["body"]
) {
  try {
    return await prisma.account.update({
      where: {
        userId: userId,
        id: accountId,
      },
      data: {
        ...data,
      },
    });
  } catch (e: any) {
    throw new Error("Failed to update account name");
  }
}

export async function updateAccountBalance(
  userId: number,
  accountId: number,
  data: UpdateAccountBalanceInput["body"]
) {
  try {
    return await prisma.account.update({
      where: {
        userId: userId,
        id: accountId,
      },
      data: {
        balanceUpdatedAt: new Date(),
        ...data,
      },
    });
  } catch (e: any) {
    throw new Error("Failed to update account balance");
  }
}

export async function deleteAccount(
  userId: number,
  accountId: number,
  newAccountId: number
) {
  try {
    await prisma.transaction.updateMany({
      where: {
        userId: userId,
        accountId: accountId,
      },
      data: {
        accountId: newAccountId,
      },
    });

    return await prisma.account.delete({
      where: {
        userId: userId,
        id: accountId,
      },
    });
  } catch (e: any) {
    throw new Error("Failed to delete account");
  }
}
