import express from "express";
import cors from "cors";
import stockSummaryRoutes from "./routes/stockSummary.routes.js";

const app = express();
const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS ?? "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
app.use(
  cors({ origin: allowedOrigins }),
);
app.use("/api", stockSummaryRoutes);
app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ error: "Unable to load stock summary." });
});
export default app;
