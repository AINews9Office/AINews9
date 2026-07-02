import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
PRAGYA_CHAT_MODEL = os.getenv("PRAGYA_CHAT_MODEL")

if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY not found in .env")

if not PRAGYA_CHAT_MODEL:
    raise ValueError("PRAGYA_CHAT_MODEL not found in .env")