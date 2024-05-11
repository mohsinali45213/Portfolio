import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.DATABASE_URL}/Portfolio`)
    console.log("Database Connected...");
  } catch (error) {
    console.log("Database Not Connected...",error);
  }
};
