import mongoose from "mongoose";
import { logger } from "../utils/logger";

const dbConString = process.env.DB_CONN_STRING 

export const dbConnection = async () => {
  try {
      await mongoose.connect(`${dbConString}`);
      logger.info("MongoDB connected");
  } catch (error) {
      logger.error("MongoDB connection error:", error);
  }
};
