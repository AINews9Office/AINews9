import re
import requests

WP_API = "https://beta.ainews9.com/wp-json/wp/v2/posts"


class WordPressService:

    def clean_html(self, html):

        html = re.sub(r"<[^>]+>", " ", html)
        html = re.sub(r"\s+", " ", html)

        return html.strip()

    def search_articles(self, question, per_page=3):

        try:

            r = requests.get(
                WP_API,
                params={
                    "search": question,
                    "per_page": per_page
                },
                timeout=15
            )

            r.raise_for_status()

            return r.json()

        except Exception as e:

            print("WP Search Error:", e)

            return []

    def get_article_content(self, article):

        return {
            "id": article.get("id"),
            "title": article.get("title", {}).get("rendered", ""),
            "excerpt": self.clean_html(
                article.get("excerpt", {}).get("rendered", "")
            ),
            "content": self.clean_html(
                article.get("content", {}).get("rendered", "")
            ),
            "url": article.get("link", "")
        }


wordpress_service = WordPressService()