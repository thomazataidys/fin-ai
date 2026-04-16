import cors from "cors";
import express, { type Express } from "express";
import { healthService } from "@/services/healthService.js";
import { healthView } from "@/views/healthView.js";
import cookieParser from "cookie-parser";

import authRoutes from "../routes/auth.routes.js";
import profileRoutes from "../routes/profile.routes.js";
import { errorMiddleware } from "../middlewares/error.middleware.js";

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
  app.use(cookieParser());

  app.get("/health", (_req, res) => {
    const payload = healthService();
    res.json(healthView(payload));
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/profiles", profileRoutes);

  app.use(errorMiddleware);

  return app;
}
