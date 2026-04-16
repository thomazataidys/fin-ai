import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";

const JWT_SECRET = process.env.JWT_SECRET ?? "supersecret";

export class CustomError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.name = "CustomError";
  }
}

export const AuthService = {
  async register(data: any) {
    const existingUser = await UserModel.findByEmail(data.email);
    if (existingUser) {
      throw new CustomError("Email já está em uso.", 409);
    }

    const passwordHash = await bcrypt.hash(data.password, 12);

    const { user, tenant, profile } =
      await UserModel.createUserWithTenantAndProfile({
        name: data.name,
        email: data.email,
        passwordHash,
      });

    const token = jwt.sign(
      { userId: user.id, tenantId: tenant.id, profileId: profile.id },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return { token, user: { id: user.id, name: user.name, email: user.email } };
  },

  async login(data: any) {
    const user = await UserModel.findByEmail(data.email);
    if (!user) {
      throw new CustomError("Credenciais inválidas.", 401);
    }

    const isMatch = await bcrypt.compare(data.password, user.passwordHash);
    if (!isMatch) {
      throw new CustomError("Credenciais inválidas.", 401);
    }

    const primaryProfile = user.profiles.find((p) => p.type === "PRIMARY");

    const token = jwt.sign(
      {
        userId: user.id,
        tenantId: user.tenantId,
        profileId: primaryProfile?.id,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return { token, user: { id: user.id, name: user.name, email: user.email } };
  },
};
