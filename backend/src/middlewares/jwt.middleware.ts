import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomError } from "../services/auth.service.js";

const JWT_SECRET = process.env.JWT_SECRET ?? "supersecret";

export function jwtGuard(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    let token = authHeader && authHeader.split(" ")[1];

    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      throw new CustomError("Não autorizado", 401);
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded; // { userId, tenantId, profileId }

    next();
  } catch (error) {
    next(new CustomError("Não autorizado", 401));
  }
}
