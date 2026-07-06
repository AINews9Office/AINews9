import logging
import os
from typing import Any

import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware


logging.basicConfig(
    level=os.getenv("LOG_LEVEL", "INFO").upper(),
    format="%(asctime)s %(levelname)s %(name)s %(message)s",
)
logger = logging.getLogger("ai_news_service")

REQUEST_TIMEOUT_SECONDS = float(os.getenv("NEWS_REQUEST_TIMEOUT_SECONDS", "20"))
MAX_ARTICLES = int(os.getenv("NEWS_MAX_ARTICLES", "18"))
NEWS_QUERY = os.getenv("NEWS_QUERY", "artificial intelligence OR AI")
GNEWS_QUERY = os.getenv("GNEWS_QUERY", "artificial intelligence")

NEWS_API_KEY = os.getenv("NEWS_API_KEY")
GNEWS_API_KEY = os.getenv("GNEWS_API_KEY")

cors_origins = [
    origin.strip()
    for origin in os.getenv(
        "NEWS_CORS_ORIGINS",
        "https://ainews9.com,https://beta.ainews9.com",
    ).split(",")
    if origin.strip()
]

app = FastAPI(title="AINews9 AI News Service")
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "healthy"}


@app.get("/api/news")
def get_news() -> dict[str, list[dict[str, Any]]]:
    articles: list[dict[str, Any]] = []

    if NEWS_API_KEY:
        try:
            articles.extend(fetch_newsapi_articles())
        except requests.RequestException:
            logger.exception("news_provider_failed provider=newsapi")

    if GNEWS_API_KEY:
        try:
            articles.extend(fetch_gnews_articles())
        except requests.RequestException:
            logger.exception("news_provider_failed provider=gnews")

    if not NEWS_API_KEY and not GNEWS_API_KEY:
        logger.error("news_provider_missing")
        raise HTTPException(
            status_code=503,
            detail="No news provider is configured.",
        )

    articles = deduplicate_articles(articles)

    if not articles:
        logger.error("news_empty_response")
        raise HTTPException(
            status_code=502,
            detail="Unable to load AI news.",
        )

    return {"news": articles[:MAX_ARTICLES]}


def fetch_newsapi_articles() -> list[dict[str, Any]]:
    logger.info("news_provider_request provider=newsapi")
    response = requests.get(
        "https://newsapi.org/v2/everything",
        params={
            "q": NEWS_QUERY,
            "language": "en",
            "sortBy": "publishedAt",
            "pageSize": MAX_ARTICLES,
            "apiKey": NEWS_API_KEY,
        },
        timeout=REQUEST_TIMEOUT_SECONDS,
    )
    response.raise_for_status()
    payload = response.json()
    articles = payload.get("articles", [])
    if not isinstance(articles, list):
        logger.error("news_provider_invalid_schema provider=newsapi")
        return []

    logger.info("news_provider_success provider=newsapi count=%s", len(articles))
    return [normalize_newsapi_article(article) for article in articles]


def fetch_gnews_articles() -> list[dict[str, Any]]:
    logger.info("news_provider_request provider=gnews")
    response = requests.get(
        "https://gnews.io/api/v4/search",
        params={
            "q": GNEWS_QUERY,
            "lang": "en",
            "max": min(MAX_ARTICLES, 10),
            "apikey": GNEWS_API_KEY,
        },
        timeout=REQUEST_TIMEOUT_SECONDS,
    )
    response.raise_for_status()
    payload = response.json()
    articles = payload.get("articles", [])
    if not isinstance(articles, list):
        logger.error("news_provider_invalid_schema provider=gnews")
        return []

    logger.info("news_provider_success provider=gnews count=%s", len(articles))
    return [normalize_gnews_article(article) for article in articles]


def normalize_newsapi_article(article: dict[str, Any]) -> dict[str, Any]:
    return {
        "source": article.get("source") or {"id": None, "name": "Unknown Source"},
        "author": article.get("author"),
        "title": article.get("title"),
        "description": article.get("description"),
        "url": article.get("url"),
        "urlToImage": article.get("urlToImage"),
        "publishedAt": article.get("publishedAt"),
        "content": article.get("content"),
    }


def normalize_gnews_article(article: dict[str, Any]) -> dict[str, Any]:
    image = article.get("image")
    return {
        "title": article.get("title"),
        "description": article.get("description"),
        "content": article.get("content"),
        "url": article.get("url"),
        "image": image,
        "publishedAt": article.get("publishedAt"),
        "lang": article.get("lang", "en"),
        "source": article.get("source") or {"name": "Unknown Source"},
        "urlToImage": image,
    }


def deduplicate_articles(articles: list[dict[str, Any]]) -> list[dict[str, Any]]:
    seen_urls: set[str] = set()
    deduplicated: list[dict[str, Any]] = []

    for article in articles:
        url = article.get("url")
        title = article.get("title")
        if not url or not title:
            continue
        if url in seen_urls:
            continue
        seen_urls.add(url)
        deduplicated.append(article)

    return deduplicated
