import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "@/controllers/httpApp.js";

describe("GET /health", () => {
  it("responde 200 com envelope JSON", async () => {
    const app = createApp();
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      data: { status: "ok", service: "fin-ai-backend" },
      meta: { version: "0.1.0" },
    });
  });
});
