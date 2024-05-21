import { z } from "zod";

export const budgetParamsSchema = z.object({
  params: z.object({
    budgetId: z.string({ required_error: "Budget ID is required" }),
  }),
});

export const createBudgetSchema = z.object({
  body: z.object({
    amountAvailable: z.number({ required_error: "Budget Amount is required" }).positive(),
    categoryId: z.number({ required_error: "Category ID is required" }),
  }),
});

export const updateBudgetAmountSchema = z.object({
  params: budgetParamsSchema.shape.params,
  body: z.object({
    amountAvailable: z.number({ required_error: "Budget Amount is required" }).positive(),
  }),
});

export type BudgetParams = z.infer<typeof budgetParamsSchema.shape.params>;
export type CreateBudgetInput = z.infer<typeof createBudgetSchema>;
export type UpdateBudgetAmountInput = z.infer<typeof updateBudgetAmountSchema>;
