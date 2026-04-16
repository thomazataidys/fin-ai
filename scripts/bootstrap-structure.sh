#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FRONT="$ROOT/frontend/src"
BACK="$ROOT/backend/src"

mkdir -p \
  "$FRONT/app/(auth)/login" \
  "$FRONT/app/(auth)/register" \
  "$FRONT/app/(auth)/recover" \
  "$FRONT/app/(dashboard)/dashboard" \
  "$FRONT/app/api/health" \
  "$FRONT/components/ui" \
  "$FRONT/lib/stores" \
  "$FRONT/hooks"

touch \
  "$FRONT/app/(auth)/layout.tsx" \
  "$FRONT/app/(auth)/login/page.tsx" \
  "$FRONT/app/(auth)/register/page.tsx" \
  "$FRONT/app/(auth)/recover/page.tsx" \
  "$FRONT/app/(dashboard)/layout.tsx" \
  "$FRONT/app/(dashboard)/dashboard/page.tsx" \
  "$FRONT/app/api/health/route.ts"

mkdir -p \
  "$BACK/models" \
  "$BACK/services" \
  "$BACK/controllers" \
  "$BACK/views" \
  "$BACK/__tests__"

touch \
  "$BACK/index.ts" \
  "$BACK/__tests__/setup.ts" \
  "$BACK/__tests__/services.test.ts" \
  "$BACK/__tests__/controllers.integration.test.ts"
