import { describe, expect, it } from "vitest";
import { healthService } from "@/services/healthService.js";

describe("healthService", () => {
  it("retorna status ok", () => {
    expect(healthService()).toEqual({ status: "ok", service: "fin-ai-backend" });
  });
});
