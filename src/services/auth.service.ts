import { PrismaClient } from "@prisma/client";
import { Currency } from "@prisma/client";
import { signJwt } from "../utils/jwt";
import bcrypt from "bcrypt";

import { LoginUserInput, RegisterUserInput } from "../schemas/auth.schemas";

const prisma = new PrismaClient();

export async function registerUser(registerUserInput: RegisterUserInput) {
  const userExists = await prisma.user.findFirst({
    where: {
      email: registerUserInput.email,
    },
  });

  if (userExists) {
    throw new Error("Email already registered");
  }

  const defaultCategories = [
    "Groceries",
    "Rent",
    "Utilities",
    "Transportation",
    "Health",
    "Entertainment",
    "Other",
  ];
  const defaultAccounts = [
    { name: "Cash", balance: 0, currency: Currency.RON },
    { name: "Bank", balance: 0, currency: Currency.EUR },
    { name: "Credit Card", balance: 0, currency: Currency.USD },
  ];

  const user = await prisma.user.create({
    data: {
      username: registerUserInput.username,
      email: registerUserInput.email,
      password: await bcrypt.hash(registerUserInput.password, 10),
      categories: {
        create: defaultCategories.map((category) => ({ name: category })),
      },
      accounts: {
        create: defaultAccounts.map((account) => ({
          name: account.name,
          balance: account.balance,
          currency: account.currency,
          balanceUpdatedAt: new Date(),
        })),
      },
    },
    select: {
      id: true,
      username: true,
      email: true,
      categories: true,
      accounts: true,
    },
  });
  const accessToken = signJwt({ userId: user.id });
  return accessToken;
}

export async function loginUser(loginUserInput: LoginUserInput) {
  const user = await prisma.user.findFirst({
    where: {
      email: loginUserInput.email,
    },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatch = await bcrypt.compare(
    loginUserInput.password,
    user.password!
  );

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  const accessToken = signJwt({ userId: user.id });
  return accessToken;
}
