import mongoose from "mongoose";

// Mongoose keeps the MongoDB connection and exposes models to the rest of the app.
export async function connectDb() {
  const uri = process.env.DATABASE_URL;
  if (!uri) throw new Error("Set DATABASE_URL in .env");
  await mongoose.connect(uri);
}
