export function healthService() {
  return { status: "ok" as const, service: "fin-ai-backend" };
}

export type HealthPayload = ReturnType<typeof healthService>;
