import { PrismaClient } from "@prisma/client";
import {
  CreateBudgetInput,
  UpdateBudgetAmountInput,
} from "../schemas/budgets.schemas";

const prisma = new PrismaClient();

export async function getBudgets(userId: number) {
  const budgets = await prisma.budget.findMany({
    where: {
      userId: userId,
    },
    include: {
      category: true,
    },
  });
  const returnedBudgets = [];
  for (const budget of budgets) {
    const spentAmount = await prisma.transaction.aggregate({
      where: {
        categoryId: budget.categoryId,
      },
      _sum: {
        amount: true,
      },
    });

    returnedBudgets.push({
      ...budget,
      spentAmount: spentAmount._sum.amount || 0,
    });
  }

  return returnedBudgets;
}

export async function createBudget(
  userId: number,
  data: CreateBudgetInput["body"]
) {
  const createdBudget = await prisma.budget.create({
    data: {
      ...data,
      userId: userId,
    },
    include: {
      category: true,
    },
  });
  const spentAmount = await prisma.transaction.aggregate({
    where: {
      categoryId: createdBudget.categoryId,
    },
    _sum: {
      amount: true,
    },
  });

  return {
    ...createdBudget,
    spentAmount: spentAmount._sum.amount || 0,
  };
}

export async function getBudgetById(userId: number, budgetId: number) {
  const budget = await prisma.budget.findUnique({
    where: {
      userId: userId,
      id: budgetId,
    },
    include: {
      category: true,
    },
  });

  if (!budget) {
    throw new Error("Budget not found");
  }

  const spentAmount = await prisma.transaction.aggregate({
    where: {
      categoryId: budget.categoryId,
    },
    _sum: {
      amount: true,
    },
  });

  return budget;
}

export async function updateBudgetAmount(
  userId: number,
  budgetId: number,
  data: UpdateBudgetAmountInput["body"]
) {
  try {
    const budget = await prisma.budget.update({
      where: {
        userId: userId,
        id: budgetId,
      },
      data: {
        amountAvailable: data.amountAvailable,
      },
      include: {
        category: true,
      },
    });

    const spentAmount = await prisma.transaction.aggregate({
      where: {
        categoryId: budget.categoryId,
      },
      _sum: {
        amount: true,
      },
    });

    return {
      ...budget,
      spentAmount: spentAmount._sum.amount || 0,
    };
  } catch (error) {
    throw new Error("Budget not found");
  }
}

export async function deleteBudget(userId: number, budgetId: number) {
  try {
    return await prisma.budget.delete({
      where: {
        userId: userId,
        id: budgetId,
      },
    });
  } catch (error) {
    throw new Error("Budget not found");
  }
}
