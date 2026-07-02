from openai import OpenAI

from app.config import OPENAI_API_KEY
from app.config import PRAGYA_CHAT_MODEL

from app.prompts import SYSTEM_PROMPT
from app.knowledge import knowledge_service
from app.recommendation_service import get_recommendation
from app.persona_service import persona_service
from app.memory_service import memory_service
from app.domain_guard import domain_guard

client = OpenAI(api_key=OPENAI_API_KEY)


def ask_pragya(session_id: str, question: str):

    # =====================================
    # DOMAIN GUARD
    # =====================================

    if not domain_guard.is_ai_question(question):

        return {
            "session_id": session_id,
            "persona": "General Learner",
            "answer": domain_guard.reject()
        }

    # =====================================
    # PERSONA
    # =====================================

    persona = persona_service.detect(question)

    persona_instruction = f"""
The user belongs to this persona:

{persona}

Adapt your explanation accordingly.

Student:
Use simple language and relatable study examples.

Teacher:
Explain how AI can improve teaching, lesson planning and student engagement.

Professional:
Focus on productivity, workplace use cases and career growth.

Parent:
Explain how AI can help children learn safely and responsibly.

Senior Citizen:
Use very simple language and everyday examples. Avoid jargon.

Small Business:
Focus on marketing, customer service, productivity and business growth.

General Learner:
Use simple beginner-friendly explanations.
"""

    # =====================================
    # KNOWLEDGE
    # =====================================

    recommendation = get_recommendation(question)

    knowledge_context = knowledge_service.build_context(question)

    # =====================================
    # MEMORY
    # =====================================

    history = memory_service.get_history(session_id)

    messages = []

    for msg in history:
        messages.append(
            {
                "role": msg["role"],
                "content": msg["content"]
            }
        )

    messages.append(
        {
            "role": "user",
            "content": question
        }
    )

    instructions = f"""
{SYSTEM_PROMPT}

You are Pragya, the AI Learning Assistant of AINews9.

Mission:
Making AI Simple, Useful & Safe for Every Indian.

{persona_instruction}

AINews9 Knowledge

--------------------------------

{knowledge_context}

--------------------------------

Rules

1. Maximum 120 words.

2. Beginner friendly.

3. Practical examples.

4. Never answer non-AI questions.

5. Prefer AINews9 knowledge.

6. Encourage the user to continue learning on AINews9.

7. Never fabricate facts.

8. If the user asks in Hindi, answer in Hindi.
"""

    response = client.responses.create(

        model=PRAGYA_CHAT_MODEL,

        instructions=instructions,

        input=messages

    )

    answer = response.output_text

    memory_service.add_message(
        session_id,
        "user",
        question
    )

    memory_service.add_message(
        session_id,
        "assistant",
        answer
    )

    result = {

        "session_id": session_id,

        "persona": persona,

        "answer": answer

    }

    if recommendation:

        current = recommendation["current"]

        result["continue_learning"] = {

            "article_id": current["id"],

            "title": current["title"],

            "difficulty": current["difficulty"],

            "reading_time": current["reading_time"],

            "url": current["url"]

        }

    return result