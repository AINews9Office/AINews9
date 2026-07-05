# Startup Command Validation

**Product:** Pragya - AI Learning Assistant
**Milestone:** C-007 - Google Cloud Run Production Foundation
**Status:** Deployment artifact

---

# 1. Application Entry Point

The FastAPI application entry point is:

```text
app.main:app
```

---

# 2. Production Startup Command

The Dockerfile starts Pragya with:

```sh
uvicorn app.main:app --host 0.0.0.0 --port ${PORT}
```

This command is compatible with Cloud Run because it:

- Binds to `0.0.0.0`.
- Uses the Cloud Run-provided `PORT` variable.
- Starts the existing FastAPI app without changing application behavior.

---

# 3. Local Container Validation

Optional local validation:

```sh
docker build -t pragya-api .
docker run --rm -p 8080:8080 -e PORT=8080 -e OPENAI_API_KEY=local-test-key -e PRAGYA_CHAT_MODEL=gpt-4.1-mini pragya-api
```

Then validate:

```sh
curl http://localhost:8080/health
```

Expected response:

```json
{
  "status": "healthy"
}
```

---

# 4. Cloud Run Validation

After deployment, validate the Cloud Run service URL:

```sh
curl https://SERVICE_URL/health
```

Expected response:

```json
{
  "status": "healthy"
}
```
