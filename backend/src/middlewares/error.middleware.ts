import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { CustomError } from "../services/auth.service.js";

export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof z.ZodError) {
    return res.status(400).json({
      error: "Validação falhou",
      details: err.errors,
    });
  }

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  console.error("Internal Error:", err);
  return res.status(500).json({ error: "Erro interno do servidor." });
}
