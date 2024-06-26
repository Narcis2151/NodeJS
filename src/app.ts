import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import { setupSwagger } from "./swagger";
import "./config/passport";

import logger from "./utils/logger";
import deserializeUser from "./middleware/deserializeUser";
import heartbeatRouter from "./routes/heartbeat.routes";
import authRouter from "./routes/auth.routes";
import accountsRouter from "./routes/accounts.routes";
import categoriesRouter from "./routes/categories.routes";
import transactionsRouter from "./routes/transactions.routes";
import budgetsRouter from "./routes/budgets.routes";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 60000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(deserializeUser);
app.use("/heartbeat", heartbeatRouter);
app.use("/auth", authRouter);
app.use("/accounts", accountsRouter);
app.use("/categories", categoriesRouter);
app.use("/transactions", transactionsRouter);
app.use("/budgets", budgetsRouter);

setupSwagger(app);

app.listen(PORT, () => {
  logger.info("App is running!");
});
