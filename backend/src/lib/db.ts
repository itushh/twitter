import { config } from "dotenv";
import mongoose from "mongoose";

config();

const MONGO_URI = process.env.MONGODB_URI as string;

export const connectDB = async () => {
  if (!MONGO_URI) {
    console.error("DATABASE CONNECTION ERROR : connection string missing in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log("MongoDB connected successfully!");

  } catch (error: any) {
    handleMongoError(error);
    process.exit(1);
  }
};

const handleMongoError = (error: any) => {
  console.error("MongoDB Connection Failed");

  // 1. Authentication error
  if (error.message?.includes("bad auth") || error.message?.includes("Authentication failed")) {
    console.error("DATABASE CONNECTION ERROR : Auth Error : Invalid username/password");
  }

  // 2. Network error
  else if (error.name === "MongoNetworkError") {
    console.error("DATABASE CONNECTION ERROR : Network Error : Cannot reach MongoDB server");
  }

  // 3. Timeout error
  else if (error.name === "MongoServerSelectionError") {
    console.error("DATABASE CONNECTION ERROR : Timeout Error : Server selection timed out");
  }

  // 4. DNS / wrong URI
  else if (error.message?.includes("ENOTFOUND")) {
    console.error("DATABASE CONNECTION ERROR : DNS Error : Invalid host in MONGO_URI");
  }

  // 5. Fallback (because life is unpredictable)
  else {
    console.error("DATABASE CONNECTION ERROR : Unknown MongoDB Error : ", error.message);
  }

  // Full error log
  console.error("DATABASE CONNECTION ERROR : Error Details : ", error);
};