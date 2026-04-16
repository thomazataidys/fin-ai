import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { AuthService } from "../services/auth.service.js";

const RegisterSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, "Pelo menos uma letra maiúscula")
    .regex(/[0-9]/, "Pelo menos um número")
    .regex(/[^A-Za-z0-9]/, "Pelo menos um caractere especial"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const AuthController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const parsedData = RegisterSchema.parse(req.body);
      const result = await AuthService.register(parsedData);
      
      res.cookie("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
      });

      res.status(201).json({ data: result.user });
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      // NOTE: Rate Limiter needs to be added in middleware layer
      const parsedData = LoginSchema.parse(req.body);
      const result = await AuthService.login(parsedData);
      
      res.cookie("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
      });

      res.status(200).json({ data: result.user });
    } catch (error) {
      next(error);
    }
  },
};
