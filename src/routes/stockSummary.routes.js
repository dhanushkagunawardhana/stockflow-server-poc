import { Router } from "express";
import { getStockSummary } from "../controllers/stockSummary.controller.js";

const router = Router();
router.get("/stock-summary", getStockSummary);
export default router;
