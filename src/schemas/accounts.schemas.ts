import {z} from "zod";

export const accountParamsSchema = z.object({
  params: z.object({
    accountId: z.string({required_error: "Account ID is required"}),
  }),
});

export const createAccountSchema = z.object({
  body: z.object({
    name: z.string({required_error: "Account Name is required"}),
    balance: z.number({required_error: "Balance is required"}).positive(),
    currency: z.enum(["RON", "USD", "EUR", "GBP"], {
      required_error: "Currency is required",
    }),
  }),
});

export const updateAccountNameSchema = z.object({
  params: accountParamsSchema.shape.params,
  body: z.object({
    name: z.string({required_error: "Account Name is required"}),
  }),
});

export const updateAccountBalanceSchema = z.object({
  params: accountParamsSchema.shape.params,
  body: z.object({
    balance: z.number({required_error: "Balance is required"}).positive(),
    currency: z.enum(["RON", "USD", "EUR", "GBP"], {
      required_error: "Currency is required",
    }),
  }),
});

export const deleteAccountSchema = z.object({
  params: accountParamsSchema.shape.params,
  body: z.object({
    newAccountId: z.number({required_error: "New Account ID is required"}),
  }),
});

export type AccountParams = z.infer<typeof accountParamsSchema.shape.params>;
export type CreateAccountInput = z.infer<typeof createAccountSchema>;
export type UpdateAccountNameInput = z.infer<typeof updateAccountNameSchema>;
export type UpdateAccountBalanceInput = z.infer<
  typeof updateAccountBalanceSchema
>;
export type DeleteAccountInput = z.infer<typeof deleteAccountSchema>;
