import { z } from "zod";

export const transactionParamsSchema = z.object({
  params: z.object({
    transactionId: z.string({ required_error: "Transaction ID is required" }),
  }),
});

export const fetchTransactionsSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
  }),
});

export const createTransactionSchema = z.object({
  body: z.object({
    amount: z.number({ required_error: "Amount is required" }),
    type: z.enum(["INCOME", "EXPENSE"], { required_error: "Type is required" }),
    description: z.string({ required_error: "Description is required" }),
    accountId: z.number({ required_error: "Account ID is required" }),
    categories: z
      .array(
        z.object({
          categoryId: z.number({ required_error: "Category ID is required" }),
          amount: z.number({ required_error: "Amount is required" }),
        })
      )
      .min(1, { message: "At least one category is required" }),
  }),
});

export const updateTransactionSchema = z.object({
  params: transactionParamsSchema.shape.params,
  body: z.object({
    amount: z.number({ required_error: "Amount is required" }),
    type: z.enum(["INCOME", "EXPENSE"], { required_error: "Type is required" }),
    description: z.string({ required_error: "Description is required" }),
    accountId: z.number({ required_error: "Account ID is required" }),
  }),
});

export const updateTransactionCategorySchema = z.object({
  params: transactionParamsSchema.shape.params,
  body: z.object({
    categories: z
      .array(
        z.object({
          categoryId: z.number({ required_error: "Category ID is required" }),
          amount: z.number({ required_error: "Amount is required" }),
        })
      )
      .min(1, { message: "At least one category is required" }),
  }),
});

export type TransactionParams = z.infer<
  typeof transactionParamsSchema.shape.params
>;
export type FetchTransactionsInput = z.infer<typeof fetchTransactionsSchema>;
export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
export type UpdateTransactionCategoryInput = z.infer<
  typeof updateTransactionCategorySchema
>;
