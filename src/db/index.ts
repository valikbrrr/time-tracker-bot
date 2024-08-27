import mongoose from "mongoose";

const dbConString = process.env.DB_CONN_STRING 

export const dbConnection = async () => {
  try {
      await mongoose.connect(`${dbConString}`);
      console.log("MongoDB connected");
  } catch (error) {
      console.error("MongoDB connection error:", error);
  }
};
