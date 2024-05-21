import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

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
          user = await prisma.user.create({
            data: {
              githubId: profile.id,
              username: profile.username,
              email: profile.emails?.[0].value,
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
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
