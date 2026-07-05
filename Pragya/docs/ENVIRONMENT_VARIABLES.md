# Environment Variable Documentation

**Product:** Pragya - AI Learning Assistant
**Milestone:** C-007 - Google Cloud Run Production Foundation
**Status:** Deployment artifact

---

# 1. Required Variables

| Variable | Required | Source | Purpose |
|----------|----------|--------|---------|
| `OPENAI_API_KEY` | Yes | Google Secret Manager | Authenticates OpenAI API requests |
| `PRAGYA_CHAT_MODEL` | Yes | Cloud Run environment variable | Selects the Pragya chat model |

---

# 2. Optional Variables

| Variable | Required | Current Use |
|----------|----------|-------------|
| `CONTENT_MODEL` | No | Not used by current backend implementation |
| `PREMIUM_MODEL` | No | Not used by current backend implementation |
| `LOG_LEVEL` | No | Not used by current backend implementation |

---

# 3. Secret Handling

Rules:

- Do not commit `.env` files.
- Do not place API keys in source code.
- Store `OPENAI_API_KEY` in Google Secret Manager for production.
- Use Cloud Run service configuration for environment-specific values.

---

# 4. Local Development

Local development may use `Pragya/.env`.

Production must not depend on a local `.env` file. Cloud Run receives configuration from service environment variables and Secret Manager.

---

# 5. Failure Behavior

The backend validates required variables during startup.

If `OPENAI_API_KEY` or `PRAGYA_CHAT_MODEL` is missing, application startup fails with a configuration error.
