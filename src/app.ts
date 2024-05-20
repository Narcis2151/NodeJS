import express from "express";
import dotenv from "dotenv";

import logger from "./utils/logger";
import heartbeatRouter from "./routes/heartbeat.routes";
import authRouter from "./routes/auth.routes";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/heartbeat", heartbeatRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  logger.info("App is running!");
});
