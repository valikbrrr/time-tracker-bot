import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { router } from "./router";
import { logger } from "../utils/logger";

const app = express();
logger.info(`work index`);

// Настройка CORS
app.use(cors());
app.use(bodyParser.json());

// Middleware для логирования запросов
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Middleware для логирования статуса ответа
app.use((req: Request, res: Response, next: NextFunction) => {
  const originalSend = res.send;

  res.send = function (body?: any): Response {
    logger.info(`Response status: ${res.statusCode}`);
    return originalSend.call(this, body);
  };

  next();
});

app.use("/api", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
