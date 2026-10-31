import mongoose from "mongoose";

export async function connectDb() {
  const uri = process.env.DATABASE_URL;
  if (!uri) throw new Error("Set DATABASE_URL in .env");
  await mongoose.connect(uri);
}
