import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  const mongoURI = process.env.MONGODB_URI;
  if (!mongoURI) {
    console.error("MongoDB URI is not defined in environment variables.");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
