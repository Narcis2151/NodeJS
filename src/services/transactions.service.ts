import { PrismaClient } from "@prisma/client";
import {
  CreateTransactionInput,
  UpdateTransactionCategoryInput,
  UpdateTransactionInput,
} from "../schemas/transactions.schemas";

const prisma = new PrismaClient();

export async function getTransactions(
  userId: number,
  page: number,
  limit: number
) {
  const skip = (page - 1) * limit;
  return await prisma.transaction.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      amount: true,
      type: true,
      description: true,
      TransactionCategory: {
        select: {
          categoryId: true,
          amount: true,
        },
      },
      account: {
        select: {
          currency: true,
        },
      },
    },
    skip: skip,
    take: limit,
  });
}

export async function createTransaction(
  userId: number,
  data: CreateTransactionInput["body"]
) {
  const account = await prisma.account.findUnique({
    where: {
      id: data.accountId,
    },
  });
  const newAccountBalance =
    data.type === "INCOME"
      ? account!.balance + data.amount
      : account!.balance - data.amount;
  if (newAccountBalance < 0) {
    throw new Error("Insufficient funds");
  }

  await prisma.account.update({
    where: {
      id: data.accountId,
    },
    data: {
      balance: newAccountBalance,
      balanceUpdatedAt: new Date(),
    },
  });

  const createdTransaction = await prisma.transaction.create({
    data: {
      amount: data.amount,
      type: data.type,
      description: data.description,
      accountId: data.accountId,
      userId: userId,
      TransactionCategory: {
        createMany: {
          data: data.categories.map((category) => ({
            categoryId: category.categoryId,
            amount: category.amount,
          })),
        },
      },
    },
    select: {
      id: true,
      amount: true,
      type: true,
      description: true,
      TransactionCategory: {
        select: {
          categoryId: true,
          amount: true,
        },
      },
      account: {
        select: {
          currency: true,
        },
      },
    },
  });

  return createdTransaction;
}

export async function getTransactionById(
  userId: number,
  transactionId: number
) {
  const transaction = await prisma.transaction.findUnique({
    where: {
      userId: userId,
      id: transactionId,
    },
    select: {
      id: true,
      amount: true,
      type: true,
      description: true,
      TransactionCategory: {
        select: {
          categoryId: true,
          amount: true,
        },
      },
      account: {
        select: {
          currency: true,
        },
      },
    },
  });

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  return transaction;
}

export async function updateTransaction(
  userId: number,
  transactionId: number,
  data: UpdateTransactionInput["body"]
) {
  const account = await prisma.account.findUnique({
    where: {
      id: data.accountId,
    },
  });

  const transaction = await prisma.transaction.findUnique({
    where: {
      userId: userId,
      id: transactionId,
    },
  });

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  const newAccountBalance =
    data.type === "INCOME"
      ? account!.balance + data.amount
      : account!.balance - data.amount;
  if (newAccountBalance < 0) {
    throw new Error("Insufficient funds");
  }

  await prisma.account.update({
    where: {
      id: data.accountId,
    },
    data: {
      balance: newAccountBalance,
      balanceUpdatedAt: new Date(),
    },
  });

  try {
    return await prisma.transaction.update({
      where: {
        userId: userId,
        id: transactionId,
      },
      data: {
        ...data,
      },
      select: {
        id: true,
        amount: true,
        type: true,
        description: true,
        TransactionCategory: {
          select: {
            categoryId: true,
            amount: true,
          },
        },
        account: {
          select: {
            currency: true,
          },
        },
      },
    });
  } catch (error) {
    throw new Error("Transaction not found");
  }
}

export async function updateTransactionCategories(
  userId: number,
  transactionId: number,
  categories: UpdateTransactionCategoryInput["body"]["categories"]
) {
  try {
    return await prisma.transaction.update({
      where: {
        userId: userId,
        id: transactionId,
      },
      data: {
        TransactionCategory: {
          deleteMany: {},
          createMany: {
            data: categories.map((category) => ({
              categoryId: category.categoryId,
              amount: category.amount,
            })),
          },
        },
      },
      select: {
        id: true,
        amount: true,
        type: true,
        description: true,
        TransactionCategory: {
          select: {
            categoryId: true,
            amount: true,
          },
        },
        account: {
          select: {
            currency: true,
          },
        },
      },
    });
  } catch (error) {
    throw new Error("Transaction not found");
  }
}

export async function deleteTransaction(userId: number, transactionId: number) {
  try {
    return await prisma.transaction.delete({
      where: {
        userId: userId,
        id: transactionId,
      },
    });
  } catch (error) {
    throw new Error("Transaction not found");
  }
}
