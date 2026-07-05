window.PRAGYA_CONFIG = {
    VERSION: "1.0.0",
    ENVIRONMENT: "beta",
    API_URL: "https://ainews9-pragya-api.onrender.com",
    API_TIMEOUT_MS: 15000,
    DEFAULT_PILLAR: "Learn AI",
    TOPICS_BY_JOURNEY: {
        "Learn AI": [
            "What is AI?",
            "Generative AI",
            "Machine Learning",
            "Large Language Models",
            "Prompt Engineering",
            "AI Agents"
        ],
        "Use AI": [
            "ChatGPT",
            "Microsoft Copilot",
            "Google Gemini",
            "Claude",
            "NotebookLM",
            "AI for Daily Work"
        ],
        "Stay Safe": [
            "AI Scams",
            "Deepfakes",
            "Privacy",
            "Safe Prompting",
            "AI Hallucinations",
            "Responsible AI"
        ],
        "Grow with AI": [
            "AI Career Skills",
            "AI Resume",
            "AI Productivity",
            "AI Business",
            "AI Entrepreneurship",
            "Future of Work"
        ]
    },
    POPULAR_QUESTIONS: {
        "Learn AI": {
            "Student": ["What is AI in simple words?", "How can I start learning AI as a student?", "What is the difference between AI and machine learning?", "Which AI skills should students learn first?"],
            "Teacher": ["How can AI help me create lesson plans?", "Which AI tools are best for teachers?", "Can AI prepare classroom activities?", "How do I use ChatGPT in teaching?"],
            "Professional": ["What AI concepts should every professional know?", "How can I learn AI without a technical background?", "Which AI skills are useful at work?", "How do large language models work?"],
            "Parent": ["How can I explain AI to my child?", "What should parents know about AI?", "How is AI used in children's education?", "Is AI safe for students to use?"],
            "Senior Citizen": ["What is AI in everyday life?", "How can AI help senior citizens?", "Which AI tools are easy to understand?", "How do I start learning AI slowly?"],
            "Small Business": ["What AI basics should small businesses know?", "How can AI help my business grow?", "Which AI concepts matter for business owners?", "How can I start using AI without a big budget?"]
        },
        "Use AI": {
            "Student": ["How can ChatGPT help me study better?", "Which AI tools are useful for assignments?", "How do I use AI without copying?", "Can AI help me prepare for exams?"],
            "Teacher": ["How can AI help me prepare better lesson plans?", "Can AI create worksheets for my class?", "Which AI tools help teachers save time?", "How can I use AI for student feedback?"],
            "Professional": ["How can AI improve my daily work?", "Which AI tools should professionals use?", "How can I write better emails with AI?", "Can AI help me summarize long documents?"],
            "Parent": ["Which AI tools can help parents support learning?", "How can I use AI safely at home?", "Can AI help explain school topics?", "How do I guide my child while using AI?"],
            "Senior Citizen": ["How can I use AI on my phone?", "Can AI help me write messages?", "Which AI tools are simple for beginners?", "How can AI help with daily tasks?"],
            "Small Business": ["How can AI help with customer messages?", "Which AI tools are useful for small businesses?", "Can AI create marketing content?", "How can AI save time in daily business work?"]
        },
        "Stay Safe": {
            "Student": ["How can students avoid AI scams?", "What are deepfakes?", "How do I use AI without sharing private data?", "How can I check if AI information is wrong?"],
            "Teacher": ["How can teachers identify AI misuse?", "How do I teach students about deepfakes?", "What AI safety rules should classrooms follow?", "How can students use AI responsibly?"],
            "Professional": ["How do I protect company data while using AI?", "What should I avoid entering into AI tools?", "How can I verify AI-generated information?", "What are common AI risks at work?"],
            "Parent": ["How can I keep my child safe while using AI?", "What are AI scams parents should know?", "How do I explain deepfakes to children?", "What privacy rules should children follow with AI?"],
            "Senior Citizen": ["How can I identify AI scams?", "What should I avoid sharing with AI tools?", "How do deepfake scams work?", "How can I use AI safely?"],
            "Small Business": ["How can small businesses avoid AI scams?", "What business data should not be shared with AI?", "How can I check AI-generated content for mistakes?", "What are safe AI practices for teams?"]
        },
        "Grow with AI": {
            "Student": ["Which AI skills can help my future career?", "How can I build an AI-ready resume?", "What AI careers can students explore?", "How can AI improve my productivity?"],
            "Teacher": ["How can AI improve my teaching career?", "Which AI skills should teachers learn?", "Can AI help me create better learning materials?", "How can teachers grow with AI tools?"],
            "Professional": ["Which AI skills can improve my career?", "How do I add AI skills to my resume?", "How can AI improve productivity at work?", "What is the future of work with AI?"],
            "Parent": ["How can parents prepare children for AI careers?", "Which AI skills will matter in the future?", "How can AI support family productivity?", "What should children learn for the future of work?"],
            "Senior Citizen": ["How can senior citizens benefit from AI?", "Can AI help me learn new skills?", "How can AI support independent living?", "What AI tools are useful after retirement?"],
            "Small Business": ["How can AI help grow my small business?", "Can AI improve business productivity?", "Which AI skills should business owners learn?", "How can I use AI for entrepreneurship?"]
        }
    },
    INTENT_KEYWORDS: {
        greeting: ["hello", "hi", "hey", "namaste", "good morning", "good afternoon", "good evening"],
        compare: ["compare", "difference", "versus", "vs", "better than", "which is better"],
        news: ["news", "latest", "today", "update", "announcement", "launched"],
        tools: ["tool", "tools", "app", "apps", "software", "platform", "chatgpt", "gemini", "copilot", "claude", "notebooklm"],
        safe: ["safe", "safety", "scam", "scams", "deepfake", "privacy", "hallucination", "responsible", "risk"],
        grow: ["career", "resume", "job", "business", "entrepreneurship", "productivity", "future of work", "skills"],
        use: ["use", "create", "write", "prepare", "summarize", "generate", "automate", "prompt"],
        learn: ["learn", "what is", "explain", "understand", "basics", "concept", "machine learning", "llm", "generative ai"]
    },
    PILLAR_KEYWORDS: {
        "Learn AI": ["learn", "what is", "explain", "understand", "basics", "concept", "machine learning", "large language model", "llm", "generative ai", "ai agents"],
        "Use AI": ["use", "tool", "tools", "chatgpt", "gemini", "copilot", "claude", "notebooklm", "prompt", "create", "write", "summarize", "automate"],
        "Stay Safe": ["safe", "safety", "scam", "scams", "deepfake", "privacy", "hallucination", "responsible ai", "risk", "misuse"],
        "Grow with AI": ["career", "resume", "job", "business", "entrepreneurship", "productivity", "future of work", "skills", "grow"]
    },
    PERSONA_KEYWORDS: {
        "Student": ["student", "students", "school", "college", "exam", "assignment"],
        "Teacher": ["teacher", "teachers", "teaching", "classroom", "lesson", "educator"],
        "Professional": ["professional", "professionals", "employee", "workplace", "office", "manager"],
        "Parent": ["parent", "parents", "child", "children", "kids"],
        "Senior Citizen": ["senior citizen", "senior citizens", "retired", "elderly"],
        "Small Business": ["small business", "business owner", "shop", "startup", "entrepreneur"]
    },
    DOMAIN_KEYWORDS: {
        ALLOWED: ["ai", "artificial intelligence", "chatgpt", "gemini", "copilot", "claude", "notebooklm", "machine learning", "generative", "prompt", "llm", "large language model", "deepfake", "automation", "ai tool", "ai tools", "privacy", "safe prompting", "hallucination", "responsible ai", "career skills", "resume", "productivity", "future of work", "ai business", "entrepreneurship"],
        UNRELATED: ["ipl", "cricket score", "pizza recipe", "weather today", "stock price", "movie ticket", "train status"]
    }
};
