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
  deleteCategorySchema,
  updateCategoryNameSchema,
} from "../schemas/categories.schemas";

import validate from "../middleware/validateResource";
import requireUser from "../middleware/requireUser";

const router = Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriesResponse'
 *       401:
 *         description: Unauthorized
 */
router.get("/", requireUser, getCategoriesHandler);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategoryInput'
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryResponse'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  [requireUser, validate(createCategorySchema)],
  createCategoryHandler
);

/**
 * @swagger
 * /categories/{categoryId}:
 *   get:
 *     summary: Get category by ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category
 *     responses:
 *       200:
 *         description: Category details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryResponse'
 *       404:
 *         description: Category not found
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/:categoryId",
  [requireUser, validate(categoryParamsSchema)],
  getCategoryByIdHandler
);

/**
 * @swagger
 * /categories/{categoryId}/name:
 *   put:
 *     summary: Update category name
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCategoryNameInput'
 *     responses:
 *       200:
 *         description: Category name updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryResponse'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.put(
  "/:categoryId/name",
  [requireUser, validate(updateCategoryNameSchema)],
  updateCategoryNameHandler
);

/**
 * @swagger
 * /categories/{categoryId}:
 *   delete:
 *     summary: Delete a category
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteCategoryInput'
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.delete(
  "/:categoryId",
  [requireUser, validate(deleteCategorySchema)],
  deleteCategoryHandler
);

export default router;
