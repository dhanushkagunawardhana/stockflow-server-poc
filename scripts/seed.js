import "dotenv/config";
import mongoose from "mongoose";
import { connectDb } from "../src/config/database.config.js";
import Product from "../src/models/product.model.js";
import StockBalance from "../src/models/stockBalance.model.js";
import MonthlyMovement from "../src/models/monthlyMovement.model.js";

const products = [
  ["RIC-5K-001", "Premium Rice 5kg", "healthy"],
  ["OIL-1L-002", "Cooking Oil 1L", "variance-detected"],
  ["MLK-400-003", "Milk Powder 400g", "low-stock"],
  ["TEA-200-004", "Black Tea 200g", "healthy"],
  ["SOP-BAR-005", "Laundry Soap Bar", "healthy"],
  ["WTR-15L-006", "Bottled Water 1.5L", "healthy"],
];
const warehouses = ["colombo", "kandy", "galle"];
const months = ["2026-08", "2026-09", "2026-10"];

try {
  await connectDb();
  for (const [sku, name, status] of products) {
    await Product.updateOne(
      { sku },
      { $set: { name, status } },
      { upsert: true },
    );
  }
  for (let w = 0; w < warehouses.length; w++) {
    for (let p = 0; p < products.length; p++) {
      const sku = products[p][0];
      await StockBalance.updateOne(
        { warehouse: warehouses[w], sku },
        {
          $set: {
            stock: 300 + p * 135 + w * 80,
            fdos: p % 2 === 0 ? 10 + w * 5 : 0,
            variance: p === 1 ? 4 + w : 0,
          },
        },
        { upsert: true },
      );
    }
    for (let m = 0; m < months.length; m++) {
      await MonthlyMovement.updateOne(
        { warehouse: warehouses[w], month: months[m] },
        {
          $set: {
            delivered: 300 + w * 80 + m * 45,
            issued: 430 + w * 90 + m * 55,
            returned: 70 + w * 20 + m * 10,
            variance: 4 + w + m,
            withFdos: 50 + w * 15 + m * 8,
          },
        },
        { upsert: true },
      );
    }
  }
  console.log("Seed complete: 6 products, 18 balances, 9 monthly movements.");
} catch (error) {
  console.error("Seed failed:", error);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
