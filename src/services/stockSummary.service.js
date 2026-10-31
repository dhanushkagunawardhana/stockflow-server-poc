import Product from "../models/product.model.js";
import StockBalance from "../models/stockBalance.model.js";
import MonthlyMovement from "../models/monthlyMovement.model.js";

const warehouses = ["colombo", "kandy", "galle"];
const months = ["2026-08", "2026-09", "2026-10"];
const metrics = ["delivered", "issued", "returned", "variance", "withFdos"];

export function isValidStockSummaryFilter({ warehouse, month }) {
  return ["all", ...warehouses].includes(warehouse) && months.includes(month);
}

export async function getStockSummaryData({ warehouse, month }) {
  const warehouseFilter = warehouse === "all" ? { warehouse: { $in: warehouses } } : { warehouse };
  const [products, balances, movements] = await Promise.all([
    Product.find().lean(),
    StockBalance.find(warehouseFilter).lean(),
    MonthlyMovement.find({ ...warehouseFilter, month }).lean(),
  ]);
  const bySku = new Map(products.map((product) => [product.sku, product]));
  const rows = new Map();
  for (const balance of balances) {
    const product = bySku.get(balance.sku);
    if (!product) continue;
    const row = rows.get(balance.sku) ?? {
      sku: balance.sku, name: product.name, stock: 0, fdos: 0, variance: 0, status: product.status,
    };
    row.stock += balance.stock;
    row.fdos += balance.fdos;
    row.variance += balance.variance;
    rows.set(balance.sku, row);
  }
  const productRows = [...rows.values()].sort((a, b) => a.name.localeCompare(b.name));
  const movement = Object.fromEntries(metrics.map((key) => [key, movements.reduce((sum, item) => sum + item[key], 0)]));
  const totals = {
    activeProducts: productRows.length,
    remainingStock: productRows.reduce((sum, row) => sum + row.stock, 0),
    deliveredThisMonth: movement.delivered,
    withFdos: productRows.reduce((sum, row) => sum + row.fdos, 0),
    stockVariance: productRows.reduce((sum, row) => sum + row.variance, 0),
  };
  return {
    warehouse, month, totals,
    movement: [{ month: new Date(month + "-01T00:00:00Z").toLocaleString("en-US", { month: "short", year: "numeric", timeZone: "UTC" }), ...movement }],
    products: productRows,
  };
}
