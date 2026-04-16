import { prisma } from "../utils/prisma.js";
import { CustomError } from "./auth.service.js";

export const ProfileService = {
  async getProfiles(tenantId: string) {
    return prisma.profile.findMany({
      where: {
        tenantId,
        isDeleted: false,
      },
    });
  },

  async createProfile(tenantId: string, userId: string, name: string) {
    return prisma.profile.create({
      data: {
        tenantId,
        userId,
        name,
        type: "SECONDARY",
      },
    });
  },

  async updateProfile(tenantId: string, profileId: string, name: string) {
    const profile = await prisma.profile.findFirst({
      where: { id: profileId, tenantId, isDeleted: false },
    });
    if (!profile) {
      throw new CustomError("Perfil não encontrado.", 404);
    }

    return prisma.profile.update({
      where: { id: profileId },
      data: { name },
    });
  },

  async deleteProfile(tenantId: string, profileId: string) {
    const profile = await prisma.profile.findFirst({
      where: { id: profileId, tenantId, isDeleted: false },
    });
    if (!profile) {
      throw new CustomError("Perfil não encontrado.", 404);
    }
    if (profile.type === "PRIMARY") {
      throw new CustomError("O Perfil Primário não pode ser excluído.", 403);
    }

    return prisma.profile.update({
      where: { id: profileId },
      data: { isDeleted: true },
    });
  },
};
