import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { loginRateLimiter } from "../middlewares/auth.middleware.js";

const router: Router = Router();

router.post("/register", AuthController.register);
router.post("/login", loginRateLimiter, AuthController.login);

export default router;
