import mongoose from "mongoose";
import { envOrThrow } from "#utils";

try {
  await mongoose.connect(envOrThrow("MONGO_URI"), {
    dbName: "ecommerce",
  });
  console.log("MongoDB connected via Mongoose");
} catch (error) {
  console.error("MongoDB connection error:", error);
  process.exit(1);
}
