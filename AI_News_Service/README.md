# AI News Service

Independent Cloud Run microservice for the AINews9 AI News Feed.

## API Contract

The public endpoint remains backward compatible with the existing Render service:

```text
GET /api/news
```

Response shape:

```json
{
  "news": []
}
```

Article objects preserve the fields consumed by the WordPress frontend:

- `title`
- `description`
- `url`
- `urlToImage`
- `publishedAt`
- `source.name`

The service also exposes:

```text
GET /health
```

## Local Run

```bash
pip install -r requirements.txt
NEWS_API_KEY=... GNEWS_API_KEY=... uvicorn app.main:app --host 0.0.0.0 --port 8080
```

At least one provider key must be configured for `/api/news`.

## Cloud Build

Configure the Cloud Build trigger with:

- Repository: `AINews9`
- Branch: `main`
- Build config path: `AI_News_Service/cloudbuild.yaml`
- Service account: `pragya-build@ainews9-pragya.iam.gserviceaccount.com`
- Included files:
  - `AI_News_Service/cloudbuild.yaml`
  - `AI_News_Service/Dockerfile`
  - `AI_News_Service/.dockerignore`
  - `AI_News_Service/app/**`
  - `AI_News_Service/requirements.txt`

Documentation-only changes should not trigger the AI News Service deployment.

The deployment flow is:

```text
GitHub
-> Cloud Build
-> Artifact Registry
-> Cloud Run
-> WordPress frontend
```

## Required Secrets

Create these Secret Manager secrets before the first deployment:

- `ai-news-newsapi-key`
- `ai-news-gnews-api-key`

Grant `roles/secretmanager.secretAccessor` on these secrets to:

```text
pragya-runtime@ainews9-pragya.iam.gserviceaccount.com
```

## Deployment

The Cloud Build config deploys:

- Region: `asia-south1`
- Service: `ai-news-service`
- Runtime service account: `pragya-runtime@ainews9-pragya.iam.gserviceaccount.com`
- Artifact Registry repository: `pragya`

After the first successful deployment, update the WordPress frontend base URL from:

```text
https://ai-news-feed.onrender.com
```

to the Cloud Run service URL.

No `/api/news` path or response-schema change is required.

## Validation

```bash
curl https://SERVICE_URL/health
curl https://SERVICE_URL/api/news
```

Expected:

- `/health` returns HTTP 200 and `{"status":"healthy"}`
- `/api/news` returns HTTP 200 and a JSON object with a non-empty `news` array
