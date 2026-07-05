# Cloud Run Configuration Guide

**Product:** Pragya - AI Learning Assistant
**Milestone:** C-007 - Google Cloud Run Production Foundation
**Status:** Deployment artifact

---

# 1. Service Configuration

Recommended initial Cloud Run service settings:

| Setting | Value |
|---------|-------|
| Service name | `pragya-api` |
| Region | `asia-south1` |
| Platform | Managed |
| Ingress | Internet |
| Authentication | Allow unauthenticated |
| Container port | `8080` |
| Startup command | Dockerfile `CMD` |
| Health endpoint | `/health` |

---

# 2. Runtime Configuration

Cloud Run provides the runtime `PORT` environment variable.

The Dockerfile starts Pragya with:

```sh
uvicorn app.main:app --host 0.0.0.0 --port ${PORT}
```

This binds the FastAPI app to the Cloud Run-compatible host and port.

---

# 3. Environment Variables

Required runtime configuration:

- `OPENAI_API_KEY`
- `PRAGYA_CHAT_MODEL`

`OPENAI_API_KEY` should be mounted from Google Secret Manager.

`PRAGYA_CHAT_MODEL` is configured through Cloud Run environment variables by `cloudbuild.yaml`.

---

# 4. Cloud Build Service Account Permissions

The Cloud Build service account requires permissions to:

- Build container images.
- Push images to Artifact Registry.
- Deploy Cloud Run services.
- Read the configured Secret Manager secret.

Typical roles:

- Cloud Run Admin
- Artifact Registry Writer
- Secret Manager Secret Accessor
- Service Account User, scoped to the runtime service account

---

# 5. Artifact Registry

The default `cloudbuild.yaml` expects:

- Region: `asia-south1`
- Repository: `pragya`
- Image: `pragya-api`

The image path is:

```text
asia-south1-docker.pkg.dev/PROJECT_ID/pragya/pragya-api:COMMIT_SHA
```

---

# 6. Runtime Service Account

Use a dedicated Cloud Run runtime service account for production.

It should have only the permissions required by Pragya at runtime. For the current Phase 1 backend, no Google Cloud API access is required by application code unless Secret Manager is mounted by runtime configuration.
