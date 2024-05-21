import {z} from 'zod';

export const categoryParamsSchema = z.object({
  params: z.object({
    categoryId: z.string({required_error: 'Category ID is required'}),
  }),
});

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string({required_error: 'Category Name is required'}),
  }),
});

export const updateCategoryNameSchema = z.object({
  params: categoryParamsSchema.shape.params,
  body: z.object({
    name: z.string({required_error: 'Category Name is required'}),
  }),
});

export type CategoryParams = z.infer<typeof categoryParamsSchema.shape.params>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryNameInput = z.infer<typeof updateCategoryNameSchema>;