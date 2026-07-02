from app.messages import DOMAIN_REDIRECT


AI_KEYWORDS = [

    # Core AI
    "ai",
    "artificial intelligence",
    "machine learning",
    "deep learning",
    "neural network",
    "large language model",
    "llm",
    "generative ai",

    # AI Concepts
    "prompt",
    "prompt engineering",
    "ai agent",
    "rag",
    "vector database",
    "automation",

    # AI Tools
    "chatgpt",
    "gpt",
    "gemini",
    "claude",
    "copilot",
    "notebooklm",
    "perplexity",
    "grok",
    "midjourney",
    "dall-e",

    # AI Safety
    "deepfake",
    "ai safety",
    "privacy",
    "responsible ai",
    "ethics",

    # Careers
    "future jobs",
    "future skills",
    "career",
    "productivity",

    # Personas
    "student",
    "teacher",
    "professional",
    "parent",
    "senior citizen",
    "small business",

    # AINews9
    "learn ai",
    "use ai",
    "stay safe",
    "grow with ai"
]


class DomainGuard:

    def is_ai_question(self, question: str):

        question = question.lower().strip()

        for keyword in AI_KEYWORDS:

            if keyword in question:
                return True

        return False

    def reject(self):

        return DOMAIN_REDIRECT


domain_guard = DomainGuard()