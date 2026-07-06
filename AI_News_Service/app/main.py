import logging
import os
import re
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
DEFAULT_NEWS_QUERY = (
    '"artificial intelligence" OR "machine learning" OR "generative AI" '
    'OR "large language model" OR ChatGPT OR OpenAI OR Anthropic OR DeepMind'
)
DEFAULT_GNEWS_QUERY = (
    '"artificial intelligence" OR "machine learning" OR "generative AI" '
    "OR ChatGPT OR OpenAI OR Anthropic"
)
NEWS_QUERY = os.getenv("NEWS_QUERY", DEFAULT_NEWS_QUERY)
GNEWS_QUERY = os.getenv("GNEWS_QUERY", DEFAULT_GNEWS_QUERY)
AI_RELEVANCE_TERMS = (
    "artificial intelligence",
    "machine learning",
    "generative ai",
    "large language model",
    "language model",
    "llm",
    "chatgpt",
    "openai",
    "anthropic",
    "deepmind",
    "neural network",
    "ai governance",
    "ai model",
    "ai tool",
    "ai system",
    "ai startup",
    "ai investment",
    "ai research",
    "ai safety",
    "ai ethics",
    "ai skills",
    "ai-led",
    "artificial-intelligence",
)

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
    newsapi_articles: list[dict[str, Any]] = []
    gnews_articles: list[dict[str, Any]] = []

    if NEWS_API_KEY:
        try:
            newsapi_articles = fetch_newsapi_articles()
        except requests.RequestException:
            logger.exception("news_provider_failed provider=newsapi")

    if GNEWS_API_KEY:
        try:
            gnews_articles = fetch_gnews_articles()
        except requests.RequestException:
            logger.exception("news_provider_failed provider=gnews")

    if not NEWS_API_KEY and not GNEWS_API_KEY:
        logger.error("news_provider_missing")
        raise HTTPException(
            status_code=503,
            detail="No news provider is configured.",
        )

    articles = merge_balanced_articles(newsapi_articles, gnews_articles)

    if not articles:
        logger.error("news_empty_response")
        raise HTTPException(
            status_code=502,
            detail="Unable to load AI news.",
        )

    return {"news": articles}


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
    return [
        normalize_newsapi_article(article)
        for article in articles
        if is_ai_relevant(article)
    ]


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
    return [
        normalize_gnews_article(article)
        for article in articles
        if is_ai_relevant(article)
    ]


def is_ai_relevant(article: dict[str, Any]) -> bool:
    text = " ".join(
        str(article.get(field) or "")
        for field in ("title", "description", "content")
    ).lower()
    if re.search(r"\bai\b", text):
        return True
    return any(term in text for term in AI_RELEVANCE_TERMS)


def merge_balanced_articles(
    newsapi_articles: list[dict[str, Any]],
    gnews_articles: list[dict[str, Any]],
    limit: int = MAX_ARTICLES,
) -> list[dict[str, Any]]:
    merged: list[dict[str, Any]] = []
    seen_urls: set[str] = set()
    providers = [newsapi_articles, gnews_articles]
    positions = [0, 0]

    while len(merged) < limit and any(
        positions[index] < len(provider)
        for index, provider in enumerate(providers)
    ):
        added_this_round = False
        for index, provider in enumerate(providers):
            while positions[index] < len(provider):
                article = provider[positions[index]]
                positions[index] += 1
                url = article.get("url")
                title = article.get("title")
                if not url or not title or url in seen_urls:
                    continue
                seen_urls.add(url)
                merged.append(article)
                added_this_round = True
                break
            if len(merged) >= limit:
                break
        if not added_this_round:
            break

    return merged


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
