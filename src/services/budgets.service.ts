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
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  const returnedBudgets = [];
  for (const budget of budgets) {
    const spentAmount = await prisma.transactionCategory.aggregate({
      where: {
        categoryId: budget.categoryId,
      },
      _sum: {
        amount: true,
      },
    });

    returnedBudgets.push({
      id: budget.id,
      amountAvailable: budget.amountAvailable,
      category: budget.category,
      amountSpent: spentAmount._sum.amount || 0,
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
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  const spentAmount = await prisma.transactionCategory.aggregate({
    where: {
      categoryId: createdBudget.categoryId,
    },
    _sum: {
      amount: true,
    },
  });

  return {
    id: createdBudget.id,
    amountAvailable: createdBudget.amountAvailable,
    category: createdBudget.category,
    amountSpent: spentAmount._sum.amount || 0,
  };
}

export async function getBudgetById(userId: number, budgetId: number) {
  const budget = await prisma.budget.findUnique({
    where: {
      userId: userId,
      id: budgetId,
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!budget) {
    throw new Error("Budget not found");
  }

  const spentAmount = await prisma.transactionCategory.aggregate({
    where: {
      categoryId: budget.categoryId,
    },
    _sum: {
      amount: true,
    },
  });

  return {
    id: budget.id,
    amountAvailable: budget.amountAvailable,
    category: budget.category,
    amountSpent: spentAmount._sum.amount || 0,
  };
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
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const spentAmount = await prisma.transactionCategory.aggregate({
      where: {
        categoryId: budget.categoryId,
      },
      _sum: {
        amount: true,
      },
    });

    return {
      id: budget.id,
      amountAvailable: budget.amountAvailable,
      category: budget.category,
      anountSpent: spentAmount._sum.amount || 0,
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
