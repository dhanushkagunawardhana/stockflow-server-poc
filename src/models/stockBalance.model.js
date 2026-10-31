import mongoose from "mongoose";

const schema = new mongoose.Schema({
  warehouse: { type: String, required: true },
  sku: { type: String, required: true },
  stock: { type: Number, required: true },
  fdos: { type: Number, required: true },
  variance: { type: Number, required: true },
});
schema.index({ warehouse: 1, sku: 1 }, { unique: true });

export default mongoose.model("StockBalance", schema);
