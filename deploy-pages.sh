#!/usr/bin/env bash
# Parallel Serverless deploy — does NOT touch Alibaba ECS / ./deploy.sh
#
# Usage:
#   ./deploy-pages.sh
# Recommended if CLI login fails (common in CN networks):
#   1) Open https://vercel.com/account/tokens  create a token
#   2) VERCEL_TOKEN=xxx ./deploy-pages.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"

export NPM_CONFIG_REGISTRY="${NPM_CONFIG_REGISTRY:-https://registry.npmjs.org}"
export VERCEL_TELEMETRY_DISABLED=1
export NO_UPDATE_NOTIFIER=1
VERCEL_VERSION="${VERCEL_VERSION:-56.5.0}"
VERCEL_BIN="$ROOT/node_modules/.bin/vercel"

echo "==> Building static site"
npm run build

echo "==> Ensuring Vercel CLI"
if [[ ! -x "$VERCEL_BIN" ]]; then
  npm install -D "vercel@${VERCEL_VERSION}"
fi

# Vercel CLI's update-check worker hardcodes registry.npmjs.org and often
# aborts login/deploy on restricted networks. Stub it so auth can proceed.
WORKER="$ROOT/node_modules/vercel/dist/get-latest-worker.cjs"
if [[ -f "$WORKER" && ! -f "$WORKER.orig" ]]; then
  cp "$WORKER" "$WORKER.orig"
  printf '%s\n' 'process.exit(0)' > "$WORKER"
  echo "==> Disabled Vercel CLI npm update-check (network workaround)"
fi

echo "==> Deploying to Vercel (production)"
echo "    ECS ./deploy.sh is untouched — this is a parallel URL only."

# --cwd ROOT avoids CLI mistaking local ./deploy/ folder as the app
ARGS=(--cwd "$ROOT" deploy --prod --yes)
if [[ -n "${VERCEL_TOKEN:-}" ]]; then
  ARGS+=(--token "$VERCEL_TOKEN")
  echo "==> Using VERCEL_TOKEN"
else
  echo "==> No VERCEL_TOKEN — CLI may open browser login"
  echo "    If login fails with fetch failed, use a token instead:"
  echo "    https://vercel.com/account/tokens"
fi

"$VERCEL_BIN" "${ARGS[@]}"
