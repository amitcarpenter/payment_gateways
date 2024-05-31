import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const DB_URI = process.env.DB_URI as string;

export const connectDB = async () => {
  await mongoose.connect(DB_URI , {dbName : "payment_gateways"});
  console.log("Database Connected");
  try {
  } catch (error) {
    console.log(error);
  }
};
