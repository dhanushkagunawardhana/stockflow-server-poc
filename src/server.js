import "dotenv/config";
import { connectDb } from "./config/database.config.js";
import app from "./app.js";

try {
  await connectDb();
  const port = Number(process.env.PORT ?? 4000);
  app.listen(port, "127.0.0.1", () =>
    console.log(`StockFlow API: http://127.0.0.1:${port}`),
  );
} catch (error) {
  console.error("Could not start StockFlow API:", error);
  process.exitCode = 1;
}
