# Production Deployment Guide

**Product:** Pragya - AI Learning Assistant
**Milestone:** C-007 - Google Cloud Run Production Foundation
**Status:** Deployment artifact

---

# 1. Purpose

This guide defines the production deployment path for Pragya on Google Cloud Run.

The deployment flow is:

```
VS Code
-> git push origin main
-> GitHub
-> Cloud Build
-> Artifact Registry
-> Cloud Run
-> Production Live
```

No manual deployment should be required after the initial Google Cloud configuration is complete.

---

# 2. Repository Deployment Files

The Cloud Run production foundation uses these repository files:

- `Dockerfile`
- `.dockerignore`
- `cloudbuild.yaml`
- `Pragya/docs/CLOUD_RUN_CONFIGURATION_GUIDE.md`
- `Pragya/docs/ENVIRONMENT_VARIABLES.md`
- `Pragya/docs/HEALTH_CHECK_VALIDATION.md`
- `Pragya/docs/STARTUP_COMMAND_VALIDATION.md`

---

# 3. Initial Google Cloud Setup

The following setup is required once per Google Cloud project:

1. Select or create the Google Cloud project.
2. Enable required APIs:
   - Cloud Build API
   - Cloud Run Admin API
   - Artifact Registry API
   - Secret Manager API
3. Create the Artifact Registry Docker repository.
4. Create the OpenAI API key secret in Secret Manager.
5. Grant Cloud Build service account permissions.
6. Connect the GitHub repository to Cloud Build.
7. Create a Cloud Build trigger for pushes to `main`.

---

# 4. Cloud Build Trigger

Recommended trigger configuration:

- Event: Push to branch
- Branch: `main`
- Configuration file: `cloudbuild.yaml`
- Location: Repository root

Required trigger substitutions may use the defaults in `cloudbuild.yaml` or override them:

- `_REGION`
- `_SERVICE_NAME`
- `_ARTIFACT_REPOSITORY`
- `_IMAGE_NAME`
- `_PRAGYA_CHAT_MODEL`
- `_OPENAI_API_KEY_SECRET`

---

# 5. Deployment Process

After setup, production deployment is automatic:

1. Merge approved code into `main`.
2. Push `main` to GitHub.
3. Cloud Build builds the Docker image.
4. Cloud Build pushes the image to Artifact Registry.
5. Cloud Build deploys a new Cloud Run revision.
6. Cloud Run routes production traffic to the latest deployed revision.

---

# 6. Production Validation

After deployment, validate:

- Cloud Build completed successfully.
- Cloud Run has a new active revision.
- `/health` returns `{"status":"healthy"}`.
- `/` returns the Pragya application status.
- `/chat` works with a valid request.
- Cloud Run logs do not show missing environment variables.

---

# 7. Rollback Procedure

Use Cloud Run revision rollback:

1. Open the Cloud Run service.
2. Select the previous known-good revision.
3. Route 100% traffic to that revision.
4. Validate `/health`.
5. Validate `/chat`.
6. Review the failed revision logs.
7. Fix through the normal `main` branch deployment workflow.

Code rollback is not normally required for an immediate production rollback.
