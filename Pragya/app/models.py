from pydantic import BaseModel


class ChatRequest(BaseModel):
    session_id: str
    question: str


class SearchRequest(BaseModel):
    query: str


class RecommendationRequest(BaseModel):
    topic: str