import mongoose from "mongoose";

// Each document holds the current balance of one product in one warehouse.
const schema = new mongoose.Schema({
  warehouse: { type: String, required: true },
  sku: { type: String, required: true },
  stock: { type: Number, required: true },
  fdos: { type: Number, required: true },
  variance: { type: Number, required: true },
});
// Prevent two balances for the same warehouse and product.
schema.index({ warehouse: 1, sku: 1 }, { unique: true });

export default mongoose.model("StockBalance", schema);
