import { Router } from "express";
import { ProfileController } from "../controllers/profile.controller.js";
import { jwtGuard } from "../middlewares/jwt.middleware.js";

const router: Router = Router();

router.use(jwtGuard);

router.get("/", ProfileController.getProfiles);
router.post("/", ProfileController.createProfile);
router.patch("/:id", ProfileController.updateProfile);
router.delete("/:id", ProfileController.deleteProfile);

export default router;
