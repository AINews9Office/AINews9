# PRG-006
# AI News Service Specification

**Version:** 1.0

**Status:** Planned

**Owner:** AINews9 Engineering

**Product:** AINews9 Platform

**Last Updated:** July 2026

---

# Purpose

This document defines the platform specification for migrating the AI News Feed backend from Render to Google Cloud Run.

The AI News Service supports the AINews9 ecosystem by providing news feed data to the WordPress frontend.

This is not a Pragya conversational feature.

The migration must preserve existing frontend behaviour and maintain backward compatibility with the current `/api/news` endpoint.

---

# Scope

Included:

- AI News Service migration from Render to Google Cloud Run.
- Cloud-native deployment.
- Cloud Build deployment pipeline.
- Artifact Registry image storage.
- Cloud Run runtime configuration.
- Secret Manager usage where production secrets are required.
- Monitoring and logging readiness.
- Backward-compatible `/api/news` API endpoint.
- Independent scaling from Pragya's conversational backend.
- Shared GCP infrastructure alignment with the Pragya Cloud Run foundation.

Excluded:

- WordPress frontend redesign.
- Response schema changes.
- New news personalization features.
- Caching implementation.
- Scheduled refresh implementation.
- Categorization enhancements.
- Multilingual news feed expansion.

---

# Current Architecture (Render)

The current AI News Feed backend is hosted on Render.

Current characteristics:

- Render-hosted backend service.
- WordPress frontend calls the news API over HTTP.
- Existing frontend expects the `/api/news` endpoint.
- Existing response schema is consumed by WordPress and must remain stable.
- Deployment and runtime configuration are separate from the Pragya Cloud Run backend.

Known migration principle:

- The existing WordPress frontend should require only a base URL change after migration.

---

# Target Architecture (Cloud Run)

The target architecture moves the AI News Service to Google Cloud Run.

Deployment flow:

```text
GitHub
-> Cloud Build
-> Artifact Registry
-> Cloud Run
-> AI News API
-> WordPress Frontend
```

Target characteristics:

- Cloud Run production hosting.
- Cloud Build automated deployment.
- Artifact Registry container image storage.
- Independent scaling from the Pragya API service.
- Shared GCP project and infrastructure standards.
- Environment-specific configuration outside source code.
- Secret Manager usage for production secrets where required.

---

# API Contract

The AI News Service must preserve the existing endpoint:

```text
GET /api/news
```

Backward compatibility requirements:

- Do not change the `/api/news` path.
- Do not change the response schema.
- Do not rename existing response fields.
- Do not remove existing response fields.
- Do not change field types expected by the WordPress frontend.
- Do not require WordPress frontend changes beyond the API base URL.
- Returned articles should be filtered for AI relevance using article title, description, and content.
- Results from configured news providers should be merged in a balanced way so one provider cannot consume the full response when multiple providers return relevant articles.

The migration is considered compatible only when the existing WordPress frontend can switch from the Render base URL to the Cloud Run base URL without additional frontend logic changes.

---

# Cloud Build Deployment

The AI News Service should use Google Cloud Build for deployment automation.

Pipeline responsibilities:

1. Detect approved source changes.
2. Build the service container image.
3. Push the image to Artifact Registry.
4. Deploy the image to Cloud Run.
5. Preserve Cloud Run revision history for rollback.

The pipeline should follow the same production governance principles established for the Pragya Cloud Run backend.

GitHub Actions are not required for this capability unless approved separately.

---

# Secret Manager Usage

Production secrets must not be committed to source control.

Secret handling requirements:

- Store production secrets in Google Secret Manager.
- Grant secret access only to the runtime service account that requires it.
- Keep non-secret configuration in Cloud Run environment variables.
- Avoid embedding API keys, tokens, or credentials in deployment files.

If the AI News Service does not require secrets at runtime, Secret Manager integration may remain available but unused.

---

# Monitoring & Logging

The service should emit operational logs suitable for Cloud Run and Cloud Logging.

Minimum logging expectations:

- Startup events.
- Request failures.
- Upstream API failures, if any.
- Data parsing failures.
- Deployment revision visibility through Cloud Run.

Monitoring expectations:

- Cloud Run revision status.
- Request count.
- Error rate.
- Latency.
- Container startup failures.

Logs must not expose secrets or sensitive credentials.

---

# Scalability

The AI News Service should scale independently from the Pragya conversational backend.

Scalability requirements:

- Cloud Run autoscaling support.
- Stateless request handling where practical.
- Independent Cloud Run service configuration.
- Independent deployment and rollback.
- Compatibility with future caching or scheduled refresh improvements.

---

# Future Enhancements

Potential future enhancements include:

- Response caching.
- Scheduled refresh.
- News categorization.
- Multilingual news feed support.
- Feed freshness monitoring.
- Source reliability scoring.
- Admin controls for feed operations.

These enhancements are outside the initial migration scope.

---

# Acceptance Criteria

The AI News Service migration is ready for implementation when:

- The existing Render endpoint contract is documented.
- The Cloud Run deployment design is approved.
- Required environment variables and secrets are identified.
- The WordPress frontend base URL update path is confirmed.
- Backward compatibility requirements for `/api/news` are accepted.

The migration is complete when:

- Cloud Run serves `/api/news`.
- The response schema matches the Render service response schema.
- WordPress works after only a base URL change.
- Cloud Build deploys the service.
- Cloud Run logs and monitoring are available.
- Rollback path is verified.

---

# Document Status

Status: Planned

Version: 1.0

Approved By: Product Owner

Next Review: Before AI News Service implementation
