import { PrismaClient } from "@prisma/client";
import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from "../schemas/transactions.schemas";

const prisma = new PrismaClient();

export async function getTransactions(userId: number) {
  return await prisma.transaction.findMany({
    where: {
      userId: userId,
    },
  });
}

export async function createTransaction(
  userId: number,
  data: CreateTransactionInput["body"]
) {
  const createdTransaction = await prisma.transaction.create({
    data: {
      ...data,
      userId: userId,
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
  try {
    return await prisma.transaction.update({
      where: {
        userId: userId,
        id: transactionId,
      },
      data: {
        ...data,
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
