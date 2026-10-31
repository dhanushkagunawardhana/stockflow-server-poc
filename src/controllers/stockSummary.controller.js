import {
  getStockSummaryData,
  isValidStockSummaryFilter,
} from "../services/stockSummary.service.js";

// The controller translates HTTP query parameters into a service call and JSON response.
export async function getStockSummary(req, res, next) {
  const warehouse = req.query.warehouse ?? "all";
  const month = req.query.month ?? "2026-08";
  if (!isValidStockSummaryFilter({ warehouse, month })) {
    // Reject unsupported filters before querying MongoDB.
    return res
      .status(400)
      .json({ error: "Invalid warehouse or month filter." });
  }
  try {
    return res.json(await getStockSummaryData({ warehouse, month }));
  } catch (error) {
    // Express sends database errors to the central error handler in app.js.
    next(error);
  }
}
