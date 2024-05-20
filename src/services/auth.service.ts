import { PrismaClient } from "@prisma/client";
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

  const user = await prisma.user.create({
    data: {
      username: registerUserInput.username,
      email: registerUserInput.email,
      password: await bcrypt.hash(registerUserInput.password, 10),
    },
    select: {
      id: true,
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
    user.password
  );

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  const accessToken = signJwt({ userId: user.id });
  return accessToken;
}
