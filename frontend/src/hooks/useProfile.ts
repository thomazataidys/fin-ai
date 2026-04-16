"use client";

import { useCallback, useState } from "react";

/** Placeholder Sprint 1 — perfil do usuário autenticado */
export function useProfile() {
  const [loading] = useState(false);
  const refresh = useCallback(async () => {
    /* TODO: integrar com API após auth */
  }, []);
  return { loading, refresh, profile: null as null | { id: string; email: string } };
}
