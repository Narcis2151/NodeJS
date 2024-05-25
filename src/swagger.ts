// src/swagger.ts

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "This is the API documentation for your application",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        CategoryParams: {
          type: "object",
          properties: {
            categoryId: {
              type: "string",
              example: "1",
            },
          },
        },
        CreateCategoryInput: {
          type: "object",
          required: ["name"],
          properties: {
            name: {
              type: "string",
              example: "Groceries",
            },
          },
        },
        UpdateCategoryNameInput: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Updated Category Name",
            },
          },
        },
        DeleteCategoryInput: {
          type: "object",
          properties: {
            newCategoryId: {
              type: "number",
              example: 2,
            },
          },
        },
        CategoryResponse: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            name: {
              type: "string",
              example: "Groceries",
            },
          },
        },
        CategoriesResponse: {
          type: "array",
          items: {
            $ref: "#/components/schemas/CategoryResponse",
          },
        },

        RegisterUserInput: {
          type: "object",
          required: ["username", "email", "password"],
          properties: {
            username: {
              type: "string",
              example: "john_doe",
            },
            email: {
              type: "string",
              format: "email",
              example: "john_doe@example.com",
            },
            password: {
              type: "string",
              example: "strongPassword123",
            },
          },
        },
        LoginUserInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "john_doe@example.com",
            },
            password: {
              type: "string",
              example: "strongPassword123",
            },
          },
        },
        JwtToken: {
          type: "object",
          properties: {
            accessToken: {
              type: "string",
              example:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.yLrTft6cCO8eBYa1R7sWmj-PB6QU3LQjNzj2XsQvwN0",
            },
          },
        },
        AccountParams: {
          type: "object",
          properties: {
            accountId: {
              type: "string",
              example: "12345",
            },
          },
        },
        CreateAccountInput: {
          type: "object",
          required: ["name", "balance", "currency"],
          properties: {
            name: {
              type: "string",
              example: "Savings Account",
            },
            balance: {
              type: "number",
              example: 1000.0,
            },
            currency: {
              type: "string",
              enum: ["RON", "USD", "EUR", "GBP"],
              example: "USD",
            },
          },
        },
        UpdateAccountNameInput: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Updated Account Name",
            },
          },
        },
        UpdateAccountBalanceInput: {
          type: "object",
          properties: {
            balance: {
              type: "number",
              example: 2000.0,
            },
            currency: {
              type: "string",
              enum: ["RON", "USD", "EUR", "GBP"],
              example: "USD",
            },
          },
        },
        DeleteAccountInput: {
          type: "object",
          properties: {
            newAccountId: {
              type: "number",
              example: 54321,
            },
          },
        },
        AccountResponse: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            name: {
              type: "string",
              example: "Cash Account",
            },
            currency: {
              type: "string",
              enum: ["RON", "USD", "EUR", "GBP"],
              example: "RON",
            },
            balance: {
              type: "number",
              example: 1000.0,
            },
            balanceUpdatedAt: {
              type: "string",
              format: "date-time",
              example: "2021-08-01T12:00:00Z",
            },
          },
        },
        AccountsResponse: {
          type: "array",
          items: {
            $ref: "#/components/schemas/AccountResponse",
          },
        },
        TransactionParams: {
          type: "object",
          properties: {
            transactionId: {
              type: "string",
              example: "1",
            },
          },
        },
        FetchTransactionsInput: {
          type: "object",
          properties: {
            page: {
              type: "string",
              example: "1",
            },
            limit: {
              type: "string",
              example: "10",
            },
          },
        },
        CreateTransactionInput: {
          type: "object",
          required: [
            "amount",
            "type",
            "description",
            "accountId",
            "categoryIds",
          ],
          properties: {
            amount: {
              type: "number",
              example: 100.0,
            },
            type: {
              type: "string",
              enum: ["INCOME", "EXPENSE"],
              example: "EXPENSE",
            },
            description: {
              type: "string",
              example: "Grocery shopping",
            },
            accountId: {
              type: "number",
              example: 1,
            },
            categories: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  categoryId: {
                    type: "number",
                    example: 1,
                  },
                  amount: {
                    type: "number",
                    example: 100.0,
                  },
                },
              },
            },
          },
        },
        UpdateTransactionInput: {
          type: "object",
          properties: {
            amount: {
              type: "number",
              example: 100.0,
            },
            type: {
              type: "string",
              enum: ["INCOME", "EXPENSE"],
              example: "EXPENSE",
            },
            description: {
              type: "string",
              example: "Grocery shopping",
            },
            accountId: {
              type: "number",
              example: 1,
            },
          },
        },
        TransactionCategory: {
          type: "object",
          properties: {
            categoryId: {
              type: "number",
              example: 1,
            },
            amount: {
              type: "number",
              example: 100.0,
            },
          },
        },
        UpdateTransactionCategoryInput: {
          type: "object",
          properties: {
            categories: {
              type: "array",
              items: {
                $ref: "#/components/schemas/TransactionCategory",
              },
            },
          },
        },
        TransactionResponse: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            amount: {
              type: "number",
              example: 100.0,
            },
            type: {
              type: "string",
              enum: ["INCOME", "EXPENSE"],
              example: "EXPENSE",
            },
            description: {
              type: "string",
              example: "Grocery shopping",
            },
            account: {
              type: "object",
              properties: {
                currency: {
                  type: "string",
                  example: "USD",
                },
              },
            },
            TransactionCategory: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  categoryId: {
                    type: "number",
                    example: 1,
                  },
                  amount: {
                    type: "number",
                    example: 100.0,
                  },
                },
              },
            },
          },
        },
        TransactionsResponse: {
          type: "array",
          items: {
            $ref: "#/components/schemas/TransactionResponse",
          },
        },
        BudgetParams: {
          type: "object",
          properties: {
            budgetId: {
              type: "string",
              example: "1",
            },
          },
        },
        CreateBudgetInput: {
          type: "object",
          required: ["amountAvailable", "categoryId"],
          properties: {
            amountAvailable: {
              type: "number",
              example: 1000.0,
            },
            categoryId: {
              type: "number",
              example: 1,
            },
          },
        },
        UpdateBudgetAmountInput: {
          type: "object",
          properties: {
            amountAvailable: {
              type: "number",
              example: 1500.0,
            },
          },
        },
        BudgetResponse: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            amountAvailable: {
              type: "number",
              example: 1000.0,
            },
            category: {
              type: "object",
              properties: {
                id: {
                  type: "integer",
                  example: 1,
                },
                name: {
                  type: "string",
                  example: "Groceries",
                },
              },
            },
            amountSpent: {
              type: "number",
              example: 200.0,
            },
          },
        },
        BudgetsResponse: {
          type: "array",
          items: {
            $ref: "#/components/schemas/BudgetResponse",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express): void {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
