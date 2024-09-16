import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import { router } from "./router";

const app = express();

app.use(cors()); 

app.use(bodyParser.json());

app.use("/api", router);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});