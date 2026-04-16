import type { HealthPayload } from "@/services/healthService.js";

export function healthView(payload: HealthPayload) {
  return {
    data: payload,
    meta: { version: "0.1.0" },
  };
}
