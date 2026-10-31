import { Router } from "express";
import { getStockSummary } from "../controllers/stockSummary.controller.js";

const router = Router();
// Together with app.js's /api prefix, this becomes GET /api/stock-summary.
router.get("/stock-summary", getStockSummary);
export default router;
