# DNS + HTTPS checklist (Alibaba Cloud)

## 1. Security group (ECS)

Open inbound:

- TCP 22 (SSH)
- TCP 80 (HTTP / Certbot challenge)
- TCP 443 (HTTPS)

## 2. Domain A records (Alibaba Cloud DNS)

| Type | Host | Value |
|------|------|-------|
| A | `@` | ECS public IP |
| A | `www` | ECS public IP |

Wait until `dig +short your-domain.com` returns the ECS IP.

## 3. ICP filing (mainland China)

If the ECS is in a mainland region, bind the domain only after ICP备案 completes.
Before filing, verify with `http://ECS_PUBLIC_IP/` after deploy.

## 4. First deploy (HTTP)

```bash
cp deploy/env.example deploy/.env
# edit DEPLOY_HOST / DEPLOY_USER / DOMAIN / WEB_ROOT
SETUP_SERVER=1 ./deploy.sh
```

## 5. Enable HTTPS (after DNS works)

```bash
# in deploy/.env:
# ENABLE_SSL=1
# CERTBOT_EMAIL=you@example.com
ENABLE_SSL=1 ./deploy.sh
```

Certbot will install a certificate via the Nginx plugin and redirect HTTP → HTTPS.

## 6. Routine updates

```bash
./deploy.sh
```
