# StockFlow Server POC

A small local Express + MongoDB example for the Stock Summary page. It is a classroom demo with no API authentication; run it only on your own computer.

## Start

1. Start a local MongoDB server.
2. Run `npm install`.
3. Copy `.env.example` to `.env`. Set `DATABASE_URL` to your MongoDB connection string. `CORS_ALLOWED_ORIGINS` accepts comma-separated frontend origins.
4. Run `npm run seed`. It is safe to run again; records are updated by their unique keys.
5. Run `npm run dev`. The API listens at `http://127.0.0.1:4000`.
6. In the sibling frontend, run `npm install` and `npm run dev`.

Try `http://127.0.0.1:4000/api/stock-summary?warehouse=all&month=2026-08`. Warehouse values: `all`, `colombo`, `kandy`, `galle`. Months: `2026-08`, `2026-09`, `2026-10`. Invalid filters return HTTP 400.

Import `docs/openapi.json` into Postman to explore the available API and query parameters.

The browser page uses Axios to request this endpoint. The route returns totals, one chart record, and product rows. Product search and status filtering happen in the browser. The Add Stock dialog is only a visual demonstration.
