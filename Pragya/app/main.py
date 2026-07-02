from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.models import (
    ChatRequest,
    SearchRequest,
    RecommendationRequest
)

from app.ai_service import ask_pragya
from app.memory_service import memory_service
from app.recommendation_service import get_recommendation

app = FastAPI(
    title="Pragya API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():

    return {
        "application": "Pragya",
        "status": "Running",
        "version": "1.0"
    }


@app.get("/health")
def health():

    return {
        "status": "healthy"
    }


@app.post("/chat")
def chat(request: ChatRequest):

    return ask_pragya(
        request.session_id,
        request.question
    )


@app.post("/recommend")
def recommend(request: RecommendationRequest):

    return get_recommendation(request.topic)


@app.post("/search")
def search(request: SearchRequest):

    return {
        "query": request.query,
        "results": get_recommendation(request.query)
    }


@app.get("/sessions")
def sessions():

    return memory_service.get_sessions()


@app.get("/sessions/{session_id}")
def session_history(session_id: str):

    return {
        "session_id": session_id,
        "messages": memory_service.get_history(session_id)
    }


@app.delete("/sessions/{session_id}")
def delete_session(session_id: str):

    memory_service.delete_session(session_id)

    return {
        "status": "deleted"
    }