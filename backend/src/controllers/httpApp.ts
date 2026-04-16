import cors from "cors";
import express, { type Express } from "express";
import { healthService } from "@/services/healthService.js";
import { healthView } from "@/views/healthView.js";

export function createApp(): Express {
  const app = express();

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(",").map((s) => s.trim()).filter(Boolean)
        : true,
    }),
  );
  app.use(express.json());

  app.get("/health", (_req, res) => {
    const payload = healthService();
    res.json(healthView(payload));
  });

  return app;
}
