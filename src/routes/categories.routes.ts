import { Router } from "express";
import {
  createCategoryController,
  deleteCategoryController,
  getCategoryByIdController,
  getCategoriesController,
  updateCategoryNameController,
} from "../controllers/categories.controller";
import {
  categoryParamsSchema,
  createCategorySchema,
  updateCategoryNameSchema,
} from "../schemas/categories.schemas";

import validate from "../middleware/validateResource";
import requireUser from "../middleware/requireUser";

const router = Router();

router.get("/", requireUser, getCategoriesController);
router.post(
  "/",
  [requireUser, validate(createCategorySchema)],
  createCategoryController
);
router.get(
  "/:categoryId",
  [requireUser, validate(categoryParamsSchema)],
  getCategoryByIdController
);
router.put(
  "/:categoryId/name",
  [requireUser, validate(updateCategoryNameSchema)],
  updateCategoryNameController
);
router.delete(
  "/:categoryId",
  [requireUser, validate(categoryParamsSchema)],
  deleteCategoryController
);

export default router;