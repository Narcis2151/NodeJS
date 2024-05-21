import { Router } from "express";
import {
  createCategoryHandler,
  deleteCategoryHandler,
  getCategoryByIdHandler,
  getCategoriesHandler,
  updateCategoryNameHandler,
} from "../controllers/categories.controller";
import {
  categoryParamsSchema,
  createCategorySchema,
  updateCategoryNameSchema,
} from "../schemas/categories.schemas";

import validate from "../middleware/validateResource";
import requireUser from "../middleware/requireUser";

const router = Router();

router.get("/", requireUser, getCategoriesHandler);
router.post(
  "/",
  [requireUser, validate(createCategorySchema)],
  createCategoryHandler
);
router.get(
  "/:categoryId",
  [requireUser, validate(categoryParamsSchema)],
  getCategoryByIdHandler
);
router.put(
  "/:categoryId/name",
  [requireUser, validate(updateCategoryNameSchema)],
  updateCategoryNameHandler
);
router.delete(
  "/:categoryId",
  [requireUser, validate(categoryParamsSchema)],
  deleteCategoryHandler
);

export default router;
