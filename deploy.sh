#!/usr/bin/env bash
# Local one-shot: build Tommy-manus and rsync dist/ to Alibaba Cloud ECS.
# Usage:
#   cp deploy/env.example deploy/.env   # edit values
#   ./deploy.sh                         # build + upload
#   SETUP_SERVER=1 ./deploy.sh          # also install/configure Nginx on first run
#   ENABLE_SSL=1 ./deploy.sh            # after DNS is ready, issue HTTPS cert
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"

ENV_FILE="${ROOT}/deploy/.env"
if [[ -f "$ENV_FILE" ]]; then
  # Load .env without clobbering vars already set in the shell
  while IFS= read -r line || [[ -n "$line" ]]; do
    [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue
    key="${line%%=*}"
    key="${key%"${key##*[![:space:]]}"}"
    key="${key#"${key%%[![:space:]]*}"}"
    [[ -z "$key" ]] && continue
    if [[ -z "${!key+x}" ]]; then
      # shellcheck disable=SC2163
      export "$line"
    fi
  done < "$ENV_FILE"
fi

DEPLOY_HOST="${DEPLOY_HOST:-}"
DEPLOY_USER="${DEPLOY_USER:-root}"
DEPLOY_PORT="${DEPLOY_PORT:-22}"
DEPLOY_SSH_KEY="${DEPLOY_SSH_KEY:-}"
WEB_ROOT="${WEB_ROOT:-/var/www/tommy}"
DOMAIN="${DOMAIN:-}"
WWW_DOMAIN="${WWW_DOMAIN:-}"
SETUP_SERVER="${SETUP_SERVER:-0}"
ENABLE_SSL="${ENABLE_SSL:-0}"
CERTBOT_EMAIL="${CERTBOT_EMAIL:-}"

if [[ -z "$DEPLOY_HOST" ]]; then
  echo "ERROR: Set DEPLOY_HOST in deploy/.env (see deploy/env.example)" >&2
  exit 1
fi

SSH_OPTS=(-p "$DEPLOY_PORT" -o StrictHostKeyChecking=accept-new)
if [[ -n "$DEPLOY_SSH_KEY" ]]; then
  SSH_OPTS+=(-i "$DEPLOY_SSH_KEY")
fi
SSH=(ssh "${SSH_OPTS[@]}" "${DEPLOY_USER}@${DEPLOY_HOST}")
RSYNC_SSH="ssh ${SSH_OPTS[*]}"

echo "==> Building"
npm ci
npm run build
test -f dist/index.html

echo "==> Ensuring remote web root ${WEB_ROOT}"
"${SSH[@]}" "mkdir -p '${WEB_ROOT}'"

if [[ "$SETUP_SERVER" == "1" ]]; then
  if [[ -z "$DOMAIN" ]]; then
    echo "ERROR: DOMAIN required when SETUP_SERVER=1" >&2
    exit 1
  fi
  echo "==> Uploading setup scripts"
  "${SSH[@]}" "mkdir -p /tmp/tommy-deploy"
  rsync -avz -e "$RSYNC_SSH" \
    deploy/nginx.conf.template \
    deploy/setup-server.sh \
    "${DEPLOY_USER}@${DEPLOY_HOST}:/tmp/tommy-deploy/"
  echo "==> Running remote Nginx setup"
  "${SSH[@]}" \
    "DOMAIN='${DOMAIN}' WWW_DOMAIN='${WWW_DOMAIN}' WEB_ROOT='${WEB_ROOT}' ENABLE_SSL='${ENABLE_SSL}' CERTBOT_EMAIL='${CERTBOT_EMAIL}' bash /tmp/tommy-deploy/setup-server.sh"
fi

echo "==> Syncing dist/ -> ${DEPLOY_USER}@${DEPLOY_HOST}:${WEB_ROOT}/"
rsync -avz --delete -e "$RSYNC_SSH" \
  dist/ \
  "${DEPLOY_USER}@${DEPLOY_HOST}:${WEB_ROOT}/"

if [[ "$ENABLE_SSL" == "1" && "$SETUP_SERVER" != "1" ]]; then
  if [[ -z "$DOMAIN" || -z "$CERTBOT_EMAIL" ]]; then
    echo "ERROR: DOMAIN and CERTBOT_EMAIL required when ENABLE_SSL=1" >&2
    exit 1
  fi
  echo "==> Issuing / renewing HTTPS certificate"
  "${SSH[@]}" "mkdir -p /tmp/tommy-deploy"
  rsync -avz -e "$RSYNC_SSH" \
    deploy/nginx.conf.template \
    deploy/setup-server.sh \
    "${DEPLOY_USER}@${DEPLOY_HOST}:/tmp/tommy-deploy/"
  "${SSH[@]}" \
    "DOMAIN='${DOMAIN}' WWW_DOMAIN='${WWW_DOMAIN}' WEB_ROOT='${WEB_ROOT}' ENABLE_SSL=1 CERTBOT_EMAIL='${CERTBOT_EMAIL}' bash /tmp/tommy-deploy/setup-server.sh"
fi

echo "==> Deploy complete"
if [[ -n "$DOMAIN" ]]; then
  echo "    http://${DOMAIN}/  (https after ENABLE_SSL=1 + DNS)"
else
  echo "    http://${DEPLOY_HOST}/"
fi
