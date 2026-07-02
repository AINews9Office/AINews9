from app.wordpress_service import wordpress_service
from difflib import SequenceMatcher


class KnowledgeService:

    def similarity(self, a, b):
        return SequenceMatcher(
            None,
            a.lower(),
            b.lower()
        ).ratio()

    def search(self, question, top_k=3):

        articles = wordpress_service.search_articles(question, top_k)

        scored = []

        for article in articles:

            title = article.get("title", {}).get("rendered", "")

            score = self.similarity(
                question,
                title
            ) * 100

            scored.append(
                (
                    score,
                    wordpress_service.get_article_content(article)
                )
            )

        scored.sort(
            reverse=True,
            key=lambda x: x[0]
        )

        return [
            x[1]
            for x in scored[:top_k]
        ]

    def recommend(self, question):

        results = self.search(question, 1)

        if results:
            return results[0]

        return None

    def build_context(self, question):

        articles = self.search(question, 3)

        context = ""

        for article in articles:

            context += f"""

Title:
{article['title']}

Summary:
{article['excerpt']}

Full Article:
{article['content'][:5000]}

URL:
{article['url']}

==================================================

"""

        return context


knowledge_service = KnowledgeService()