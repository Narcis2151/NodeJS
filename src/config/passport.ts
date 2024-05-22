import { PrismaClient } from "@prisma/client";
import { Currency } from "@prisma/client";
import { Strategy as GitHubStrategy } from "passport-github2";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: process.env.GITHUB_CALLBACK_URL!,
    },
    async (_accessToken: any, _refreshToken: any, profile: any, done: any) => {
      try {
        let user = await prisma.user.findUnique({
          where: { githubId: profile.id },
        });

        if (!user) {
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

          user = await prisma.user.create({
            data: {
              githubId: profile.id,
              username: profile.username,
              email: profile.emails?.[0].value,
              categories: {
                create: defaultCategories.map((category) => ({
                  name: category,
                })),
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
          });
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    done(null, user!.id);
  } catch (error) {
    done(error, null);
  }
});
