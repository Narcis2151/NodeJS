import express from "express";
import dotenv from "dotenv";

import logger from "./utils/logger";
import heartbeatRouter from "./routes/heartbeat.routes";
import authRouter from "./routes/auth.routes";
import accountsRouter from "./routes/accounts.routes";
import cors from "cors";
import deserializeUser from "./middleware/deserializeUser";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(deserializeUser);
app.use("/heartbeat", heartbeatRouter);
app.use("/auth", authRouter);
app.use("/accounts", accountsRouter);

app.listen(PORT, () => {
  logger.info("App is running!");
});
