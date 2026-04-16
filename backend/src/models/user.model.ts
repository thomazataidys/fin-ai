import { prisma } from "../utils/prisma.js";

interface CreateUserParams {
  name: string;
  email: string;
  passwordHash: string;
}

export const UserModel = {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: { tenant: true, profiles: true },
    });
  },

  async createUserWithTenantAndProfile({
    name,
    email,
    passwordHash,
  }: CreateUserParams) {
    return prisma.$transaction(async (tx) => {
      // 1. Create Tenant
      const tenant = await tx.tenant.create({ data: {} });

      // 2. Create User linked to Tenant
      const user = await tx.user.create({
        data: {
          name,
          email,
          passwordHash,
          tenantId: tenant.id,
          role: "PRIMARY",
        },
      });

      // 3. Create PRIMARY Profile
      const profile = await tx.profile.create({
        data: {
          name,
          userId: user.id,
          tenantId: tenant.id,
          type: "PRIMARY",
        },
      });

      return { user, tenant, profile };
    });
  },
};
