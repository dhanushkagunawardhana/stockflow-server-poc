import mongoose from "mongoose";

// A product stores the information shared by all warehouses for one SKU.
const schema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  status: { type: String, required: true },
});

// A model provides Mongoose query methods such as find() and updateOne().
export default mongoose.model("Product", schema);
