import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ProfileService } from "../services/profile.service.js";

const CreateProfileSchema = z.object({
  name: z.string().min(2),
});

const UpdateProfileSchema = z.object({
  name: z.string().min(2),
});

export const ProfileController = {
  async getProfiles(req: Request, res: Response, next: NextFunction) {
    try {
      const tenantId = (req as any).user.tenantId;
      const profiles = await ProfileService.getProfiles(tenantId);
      res.status(200).json({ data: profiles });
    } catch (error) {
      next(error);
    }
  },

  async createProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const tenantId = (req as any).user.tenantId;
      const userId = (req as any).user.userId;
      const parsedData = CreateProfileSchema.parse(req.body);
      const profile = await ProfileService.createProfile(
        tenantId,
        userId,
        parsedData.name
      );
      res.status(201).json({ data: profile });
    } catch (error) {
      next(error);
    }
  },

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const tenantId = (req as any).user.tenantId;
      const profileId = req.params.id;
      const parsedData = UpdateProfileSchema.parse(req.body);
      const profile = await ProfileService.updateProfile(
        tenantId,
        profileId,
        parsedData.name
      );
      res.status(200).json({ data: profile });
    } catch (error) {
      next(error);
    }
  },

  async deleteProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const tenantId = (req as any).user.tenantId;
      const profileId = req.params.id;
      await ProfileService.deleteProfile(tenantId, profileId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
