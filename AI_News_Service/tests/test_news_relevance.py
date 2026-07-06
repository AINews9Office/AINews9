import unittest

from fastapi.testclient import TestClient

from app import main


def article(title, url, description="", content="", source="Example"):
    return {
        "title": title,
        "description": description,
        "content": content,
        "url": url,
        "urlToImage": "https://example.com/image.jpg",
        "publishedAt": "2026-07-06T00:00:00Z",
        "source": {"name": source},
    }


class NewsRelevanceTests(unittest.TestCase):
    def test_rejects_clearly_unrelated_articles(self):
        unrelated = article(
            "Where do bald eagles go during winter?",
            "https://example.com/eagles",
            "A nature guide about bird migration and open water.",
        )

        self.assertFalse(main.is_ai_relevant(unrelated))

    def test_accepts_valid_ai_articles(self):
        relevant = article(
            "AI: OpenAI launches new learning tools",
            "https://example.com/openai",
            "The update helps students understand artificial intelligence.",
        )

        self.assertTrue(main.is_ai_relevant(relevant))

    def test_provider_balanced_results(self):
        newsapi_articles = [
            article(f"AI NewsAPI {index}", f"https://example.com/newsapi-{index}")
            for index in range(12)
        ]
        gnews_articles = [
            article(f"AI GNews {index}", f"https://example.com/gnews-{index}")
            for index in range(6)
        ]

        result = main.merge_balanced_articles(newsapi_articles, gnews_articles, limit=10)

        self.assertEqual(len(result), 10)
        self.assertEqual(result[0]["url"], "https://example.com/newsapi-0")
        self.assertEqual(result[1]["url"], "https://example.com/gnews-0")
        self.assertIn("gnews-4", result[9]["url"])

    def test_maximum_18_articles(self):
        newsapi_articles = [
            article(f"AI NewsAPI {index}", f"https://example.com/newsapi-{index}")
            for index in range(30)
        ]
        gnews_articles = [
            article(f"AI GNews {index}", f"https://example.com/gnews-{index}")
            for index in range(30)
        ]

        result = main.merge_balanced_articles(newsapi_articles, gnews_articles)

        self.assertEqual(len(result), 18)

    def test_response_contract_unchanged(self):
        original_newsapi_key = main.NEWS_API_KEY
        original_gnews_key = main.GNEWS_API_KEY
        original_newsapi_fetch = main.fetch_newsapi_articles
        original_gnews_fetch = main.fetch_gnews_articles
        try:
            main.NEWS_API_KEY = "test-newsapi-key"
            main.GNEWS_API_KEY = "test-gnews-key"
            main.fetch_newsapi_articles = lambda: [
                article("AI NewsAPI item", "https://example.com/newsapi")
            ]
            main.fetch_gnews_articles = lambda: [
                article("AI GNews item", "https://example.com/gnews")
            ]

            response = TestClient(main.app).get("/api/news")

            self.assertEqual(response.status_code, 200)
            payload = response.json()
            self.assertEqual(list(payload.keys()), ["news"])
            self.assertEqual(len(payload["news"]), 2)
            self.assertIn("title", payload["news"][0])
            self.assertIn("description", payload["news"][0])
            self.assertIn("url", payload["news"][0])
            self.assertIn("urlToImage", payload["news"][0])
            self.assertIn("publishedAt", payload["news"][0])
            self.assertIn("source", payload["news"][0])
        finally:
            main.NEWS_API_KEY = original_newsapi_key
            main.GNEWS_API_KEY = original_gnews_key
            main.fetch_newsapi_articles = original_newsapi_fetch
            main.fetch_gnews_articles = original_gnews_fetch


if __name__ == "__main__":
    unittest.main()
