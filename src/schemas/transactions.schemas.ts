import { z } from "zod";

export const transactionParamsSchema = z.object({
  params: z.object({
    transactionId: z.string({ required_error: "Transaction ID is required" }),
  }),
});

export const createTransactionSchema = z.object({
  body: z.object({
    amount: z.number({ required_error: "Amount is required" }),
    type: z.enum(["INCOME", "EXPENSE"], { required_error: "Type is required" }),
    description: z.string({ required_error: "Description is required" }),
    accountId: z.number({ required_error: "Account ID is required" }),
    categoryId: z.number({ required_error: "Category ID is required" }),
  }),
});

export const updateTransactionSchema = z.object({
  params: transactionParamsSchema.shape.params,
  body: z.object({
    amount: z.number({ required_error: "Amount is required" }),
    type: z.enum(["INCOME", "EXPENSE"], { required_error: "Type is required" }),
    description: z.string({ required_error: "Description is required" }),
    accountId: z.number({ required_error: "Account ID is required" }),
    categoryId: z.number({ required_error: "Category ID is required" }),
  }),
});

export type TransactionParams = z.infer<
  typeof transactionParamsSchema.shape.params
>;
export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
