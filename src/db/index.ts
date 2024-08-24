import mongoose from "mongoose";

const dbConString = process.env.DB_CONN_STRING 

export const dbConnection = async () => {
  if (dbConString) {
    console.log("db start");
    
    await mongoose.connect(dbConString).catch((err) => {
    });
  }
};
