import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthService } from "./auth.service.js";
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

vi.mock("../models/user.model.js");
vi.mock("bcryptjs");
vi.mock("jsonwebtoken");

describe("AuthService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("register", () => {
    it("should reject duplicate email (409)", async () => {
      vi.mocked(UserModel.findByEmail).mockResolvedValue({ id: "1" } as any);

      await expect(
        AuthService.register({
          name: "Test User",
          email: "test@test.com",
          password: "password123",
        })
      ).rejects.toThrow("Email já está em uso.");
    });

    it("should hash password and create tenant/user/profile", async () => {
      vi.mocked(UserModel.findByEmail).mockResolvedValue(null);
      vi.mocked(bcrypt.hash).mockResolvedValue("hashedPwd" as never);
      vi.mocked(UserModel.createUserWithTenantAndProfile).mockResolvedValue({
        user: { id: "u1" },
        tenant: { id: "t1" },
        profile: { id: "p1" },
      } as any);
      vi.mocked(jwt.sign).mockReturnValue("fake-jwt" as any);

      const result = await AuthService.register({
        name: "Test User",
        email: "test@test.com",
        password: "password123",
      });

      expect(bcrypt.hash).toHaveBeenCalledWith("password123", 12);
      expect(UserModel.createUserWithTenantAndProfile).toHaveBeenCalledWith({
        name: "Test User",
        email: "test@test.com",
        passwordHash: "hashedPwd",
      });
      expect(result.token).toBe("fake-jwt");
    });
  });

  describe("login", () => {
    it("should reject invalid email (401)", async () => {
      vi.mocked(UserModel.findByEmail).mockResolvedValue(null);

      await expect(
        AuthService.login({ email: "invalid@test.com", password: "pwd" })
      ).rejects.toThrow("Credenciais inválidas.");
    });

    it("should reject incorrect password (401)", async () => {
      vi.mocked(UserModel.findByEmail).mockResolvedValue({
        passwordHash: "hash",
      } as any);
      vi.mocked(bcrypt.compare).mockResolvedValue(false as never);

      await expect(
        AuthService.login({ email: "valid@test.com", password: "wrong" })
      ).rejects.toThrow("Credenciais inválidas.");
    });

    it("should generate JWT on valid login", async () => {
      vi.mocked(UserModel.findByEmail).mockResolvedValue({
        id: "u1",
        tenantId: "t1",
        passwordHash: "hash",
        profiles: [{ id: "p1", type: "PRIMARY" }],
      } as any);
      vi.mocked(bcrypt.compare).mockResolvedValue(true as never);
      vi.mocked(jwt.sign).mockReturnValue("valid-jwt" as any);

      const result = await AuthService.login({
        email: "valid@test.com",
        password: "right",
      });

      expect(result.token).toBe("valid-jwt");
      expect(result.user.id).toBe("u1");
    });
  });
});
