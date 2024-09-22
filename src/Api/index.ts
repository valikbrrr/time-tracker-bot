import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { router } from "./router";

const app = express();

console.log(`work index`);

// Настройка CORS
app.use(cors());

app.use(bodyParser.json());
app.use("/api", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Обработка ошибок с явными типами
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Что-то пошло не так!');
});