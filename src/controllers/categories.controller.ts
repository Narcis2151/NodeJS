import { Request, Response } from "express";
import logger from "../utils/logger";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategoryName,
} from "../services/categories.service";

import {
  CategoryParams,
  CreateCategoryInput,
  UpdateCategoryNameInput,
} from "../schemas/categories.schemas";

export async function getCategoriesHandler(req: Request, res: Response) {
  try {
    const categories = await getCategories(+res.locals.user);
    return res.status(200).send(categories);
  } catch (e: any) {
    logger.error(e.message);
    return res.status(400).send(e.message);
  }
}

export async function createCategoryHandler(
  req: Request<{}, {}, CreateCategoryInput["body"]>,
  res: Response
) {
  try {
    const category = await createCategory(res.locals.user, req.body);
    return res.status(201).send(category);
  } catch (e: any) {
    logger.error(e.message);
    return res.status(400).send(e.message);
  }
}

export async function getCategoryByIdHandler(
  req: Request<CategoryParams>,
  res: Response
) {
  try {
    const category = await getCategoryById(
      res.locals.user,
      Number(req.params.categoryId)
    );
    return res.status(200).send(category);
  } catch (e: any) {
    logger.error(e.message);
    return res.status(400).send(e.message);
  }
}

export async function updateCategoryNameHandler(
  req: Request<CategoryParams, {}, UpdateCategoryNameInput["body"]>,
  res: Response
) {
  try {
    const updatedCategory = await updateCategoryName(
      res.locals.user,
      Number(req.params.categoryId),
      req.body
    );
    return res.status(200).send(updatedCategory);
  } catch (e: any) {
    logger.error(e.message);
    return res.status(400).send(e.message);
  }
}

export async function deleteCategoryHandler(
  req: Request<CategoryParams>,
  res: Response
) {
  try {
    await deleteCategory(res.locals.user, Number(req.params.categoryId));
    return res.status(204).send();
  } catch (e: any) {
    logger.error(e.message);
    return res.status(400).send(e.message);
  }
}
