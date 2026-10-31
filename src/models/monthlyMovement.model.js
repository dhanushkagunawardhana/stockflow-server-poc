import mongoose from "mongoose";

// Each document records one warehouse's movement totals for one month.
const schema = new mongoose.Schema({
  warehouse: { type: String, required: true },
  month: { type: String, required: true },
  delivered: { type: Number, required: true },
  issued: { type: Number, required: true },
  returned: { type: Number, required: true },
  variance: { type: Number, required: true },
  withFdos: { type: Number, required: true },
});
// There is one movement record per warehouse and month.
schema.index({ warehouse: 1, month: 1 }, { unique: true });

export default mongoose.model("MonthlyMovement", schema);
