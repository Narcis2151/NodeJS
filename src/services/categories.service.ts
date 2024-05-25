import { PrismaClient } from "@prisma/client";

import {
  CreateCategoryInput,
  UpdateCategoryNameInput,
} from "../schemas/categories.schemas";

const prisma = new PrismaClient();

export async function getCategories(userId: number) {
  return await prisma.category.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      name: true,
    },
  });
}

export async function createCategory(
  userId: number,
  data: CreateCategoryInput["body"]
) {
  const createdCategory = await prisma.category.create({
    data: {
      ...data,
      user: {
        connect: {
          id: userId,
        },
      },
    },
    select: {
      id: true,
      name: true,
    },
  });

  return createdCategory;
}

export async function getCategoryById(userId: number, categoryId: number) {
  const category = await prisma.category.findUnique({
    where: {
      userId: userId,
      id: categoryId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
}

export async function updateCategoryName(
  userId: number,
  categoryId: number,
  data: UpdateCategoryNameInput["body"]
) {
  try {
    return await prisma.category.update({
      where: {
        userId: userId,
        id: categoryId,
      },
      data: {
        name: data.name,
      },
      select: {
        id: true,
        name: true,
      },
    });
  } catch (error) {
    throw new Error("Failed to update category name");
  }
}

export async function deleteCategory(userId: number, categoryId: number, newCategoryId: number) {
  try {
    await prisma.transactionCategory.updateMany({
      where: {
        categoryId: categoryId
      },
      data: {
        categoryId: newCategoryId
      }
    });

    await prisma.budget.deleteMany({
      where: {
        userId: userId,
        categoryId: categoryId
      }
    });

    await prisma.category.delete({
      where: {
        userId: userId,
        id: categoryId,
      },
    });
  } catch (error) {
    throw new Error("Failed to delete category");
  }
}
