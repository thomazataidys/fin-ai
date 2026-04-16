import "dotenv/config";
import type { Express } from "express";
import { createApp } from "./controllers/httpApp.js";

const app: Express = createApp();

const port = Number(process.env.PORT ?? 4000);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${port}`);
  });
}

export { app };
