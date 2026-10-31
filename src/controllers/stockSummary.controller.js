import { getStockSummaryData, isValidStockSummaryFilter } from "../services/stockSummary.service.js";

export async function getStockSummary(req, res, next) {
  const warehouse = req.query.warehouse ?? "all";
  const month = req.query.month ?? "2026-08";
  if (!isValidStockSummaryFilter({ warehouse, month })) {
    return res.status(400).json({ error: "Invalid warehouse or month filter." });
  }
  try {
    return res.json(await getStockSummaryData({ warehouse, month }));
  } catch (error) {
    next(error);
  }
}
