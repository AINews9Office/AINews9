from app.knowledge import knowledge_service


def get_recommendation(question: str):

    article = knowledge_service.recommend(question)

    if article is None:
        return None

    return {
        "current": {
            "id": article.get("id", ""),
            "title": article.get("title", ""),
            "summary": article.get("excerpt", ""),
            "difficulty": "Beginner",
            "reading_time": "5 min",
            "url": article.get("url", "")
        }
    }


def get_related_articles(question: str, limit=3):

    articles = knowledge_service.search(question, limit)

    results = []

    for article in articles:

        results.append({

            "id": article.get("id", ""),

            "title": article.get("title", ""),

            "url": article.get("url", "")

        })

    return results