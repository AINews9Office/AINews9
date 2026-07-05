# Health Check Validation

**Product:** Pragya - AI Learning Assistant
**Milestone:** C-007 - Google Cloud Run Production Foundation
**Status:** Deployment artifact

---

# 1. Health Endpoint

Pragya exposes:

```text
GET /health
```

Expected response:

```json
{
  "status": "healthy"
}
```

---

# 2. Root Endpoint

Pragya also exposes:

```text
GET /
```

Expected response:

```json
{
  "application": "Pragya",
  "status": "Running",
  "version": "1.0"
}
```

---

# 3. Validation Steps

After Cloud Run deployment:

1. Open the Cloud Run service URL.
2. Validate `/health`.
3. Validate `/`.
4. Review Cloud Run logs for startup or configuration errors.
5. Confirm no missing environment variable errors are present.

---

# 4. Failure Indicators

Investigate deployment if:

- Cloud Run revision fails to become ready.
- `/health` does not return HTTP 200.
- Logs show missing `OPENAI_API_KEY`.
- Logs show missing `PRAGYA_CHAT_MODEL`.
- The container does not bind to the expected port.
