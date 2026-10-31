import mongoose from "mongoose";

const schema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  status: { type: String, required: true },
});

export default mongoose.model("Product", schema);
