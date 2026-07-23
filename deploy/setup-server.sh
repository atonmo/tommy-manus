#!/usr/bin/env bash
# Run ON the ECS (or via: ssh user@host 'bash -s' < deploy/setup-server.sh)
# Env (optional): DOMAIN, WWW_DOMAIN, WEB_ROOT, ENABLE_SSL, CERTBOT_EMAIL
set -euo pipefail

DOMAIN="${DOMAIN:-}"
WWW_DOMAIN="${WWW_DOMAIN:-}"
WEB_ROOT="${WEB_ROOT:-/var/www/tommy}"
ENABLE_SSL="${ENABLE_SSL:-0}"
CERTBOT_EMAIL="${CERTBOT_EMAIL:-}"

if [[ -z "$DOMAIN" ]]; then
  echo "ERROR: DOMAIN is required (e.g. example.com)" >&2
  exit 1
fi

if [[ -z "${WWW_DOMAIN}" ]]; then
  if [[ "$DOMAIN" =~ ^[0-9.]+$ ]]; then
    WWW_DOMAIN="$DOMAIN"
  else
    WWW_DOMAIN="www.${DOMAIN}"
  fi
fi

# Deduplicate server_name tokens
SERVER_NAMES="$DOMAIN"
if [[ -n "$WWW_DOMAIN" && "$WWW_DOMAIN" != "$DOMAIN" ]]; then
  SERVER_NAMES="$DOMAIN $WWW_DOMAIN"
fi

echo "==> Installing Nginx"
if command -v apt-get >/dev/null 2>&1; then
  sudo apt-get update -y
  sudo apt-get install -y nginx
elif command -v yum >/dev/null 2>&1; then
  sudo yum install -y nginx
elif command -v dnf >/dev/null 2>&1; then
  sudo dnf install -y nginx
else
  echo "ERROR: Unsupported package manager. Install nginx manually." >&2
  exit 1
fi

echo "==> Preparing web root: ${WEB_ROOT}"
sudo mkdir -p "$WEB_ROOT"
sudo chown -R "${SUDO_USER:-$USER}:${SUDO_USER:-$USER}" "$WEB_ROOT" 2>/dev/null || true

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMPLATE="${SCRIPT_DIR}/nginx.conf.template"
if [[ ! -f "$TEMPLATE" ]]; then
  # When piped over SSH, template may live next to this script on remote after upload
  TEMPLATE="/tmp/tommy-deploy/nginx.conf.template"
fi
if [[ ! -f "$TEMPLATE" ]]; then
  echo "ERROR: nginx.conf.template not found" >&2
  exit 1
fi

TMP_CONF="$(mktemp)"
sed \
  -e "s|__DOMAIN__ __WWW_DOMAIN__|${SERVER_NAMES}|g" \
  -e "s|__DOMAIN__|${DOMAIN}|g" \
  -e "s|__WWW_DOMAIN__|${WWW_DOMAIN}|g" \
  -e "s|__WEB_ROOT__|${WEB_ROOT}|g" \
  "$TEMPLATE" > "$TMP_CONF"

if [[ -d /etc/nginx/sites-available ]]; then
  SITE="/etc/nginx/sites-available/tommy-manus"
  sudo cp "$TMP_CONF" "$SITE"
  sudo ln -sfn "$SITE" /etc/nginx/sites-enabled/tommy-manus
  if [[ -f /etc/nginx/sites-enabled/default ]]; then
    sudo rm -f /etc/nginx/sites-enabled/default
  fi
else
  SITE="/etc/nginx/conf.d/tommy-manus.conf"
  sudo cp "$TMP_CONF" "$SITE"
fi
rm -f "$TMP_CONF"

echo "==> Testing & reloading Nginx"
sudo nginx -t
sudo systemctl enable nginx
sudo systemctl start nginx
sudo systemctl reload nginx || true

if [[ "$ENABLE_SSL" == "1" ]]; then
  if [[ -z "$CERTBOT_EMAIL" ]]; then
    echo "ERROR: CERTBOT_EMAIL required when ENABLE_SSL=1" >&2
    exit 1
  fi
  echo "==> Installing Certbot & issuing certificate for ${DOMAIN}"
  if command -v apt-get >/dev/null 2>&1; then
    sudo apt-get install -y certbot python3-certbot-nginx
  elif command -v yum >/dev/null 2>&1; then
    sudo yum install -y certbot python3-certbot-nginx || sudo yum install -y certbot
  elif command -v dnf >/dev/null 2>&1; then
    sudo dnf install -y certbot python3-certbot-nginx
  fi
  sudo certbot --nginx \
    -d "$DOMAIN" \
    -d "$WWW_DOMAIN" \
    --non-interactive \
    --agree-tos \
    -m "$CERTBOT_EMAIL" \
    --redirect
  sudo nginx -t
  sudo systemctl reload nginx
  echo "==> HTTPS enabled"
else
  echo "==> SSL skipped (set ENABLE_SSL=1 CERTBOT_EMAIL=you@example.com to enable)"
fi

echo "==> Server setup done. Web root: ${WEB_ROOT}"
echo "    Open http://${DOMAIN}/ after DNS A record points here and dist is uploaded."
