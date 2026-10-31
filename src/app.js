import express from "express";
import cors from "cors";
import stockSummaryRoutes from "./routes/stockSummary.routes.js";

const app = express();
// Browsers enforce CORS. Split the env value so several frontend URLs can be allowed.
const allowedOrigins = (
  process.env.CORS_ALLOWED_ORIGINS ?? "http://localhost:3000"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
app.use(cors({ origin: allowedOrigins }));
// Mount all stock summary routes under /api.
app.use("/api", stockSummaryRoutes);
// Controllers pass unexpected errors here; clients receive a consistent JSON response.
app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ error: "Unable to load stock summary." });
});
export default app;
