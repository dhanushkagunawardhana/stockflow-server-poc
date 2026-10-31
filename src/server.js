import "dotenv/config";
import { connectDb } from "./config/database.config.js";
import app from "./app.js";

// Start listening only after MongoDB connects, so requests never use a disconnected database.
try {
  await connectDb();
  const port = Number(process.env.PORT ?? 4000);
  app.listen(port, "127.0.0.1", () =>
    console.log(`StockFlow API: http://127.0.0.1:${port}`),
  );
} catch (error) {
  // A startup failure should stop the process instead of leaving an unusable API running.
  console.error("Could not start StockFlow API:", error);
  process.exitCode = 1;
}
