PRG-001 – Pragya Master Specification v1.0
PART 1 – Executive Foundation & Product Strategy
AINews9 – India's AI Literacy Platform
Status: Draft for Review

1. Executive Summary
Pragya is the intelligence layer of AINews9. It is intentionally designed not to compete with general-purpose AI assistants such as ChatGPT, Gemini or Claude. Its primary responsibility is to guide users through structured AI literacy journeys using trusted AINews9 knowledge.

The MVP focuses on five capabilities: Learning Navigator, Smart Search, Article Assistant, Next Lesson Recommendation and AI Tool Advisor. Every response should educate, recommend and encourage the next learning step.
Business Problem
Millions of Indians want to learn AI but face fragmented information, technical jargon and unstructured learning. Existing chatbots answer questions but do not provide a guided curriculum or trusted progression. Pragya addresses this gap by combining conversational AI with AINews9's curated knowledge architecture.
Vision
Become India's most trusted AI Learning Guide that helps every Indian learn AI confidently through structured, safe and practical learning experiences.
Mission
Make AI Simple. Useful. Safe. for Every Indian.
Strategic Objectives
•	Increase AI literacy across all six personas.
•	Improve article discovery and learning completion.
•	Convert visitors into continuous learners.
•	Provide bilingual guidance (English + Hindi).
•	Create an API-first intelligence layer reusable across web, mobile and future channels.
2. Product Philosophy
Learning First
Every conversation should move the learner forward.
Human Centric
Technology supports people, not the other way around.
Guided, Not Generic
Recommendations are preferred over open-ended conversations.
Trust
Responses should be grounded in AINews9 content wherever possible.
Progressive Disclosure
Start simple; reveal complexity only when requested.
3. Product Positioning
Positioning Statement:
Pragya is India's AI Learning Guide that helps learners discover the right learning path, understand AI concepts in simple language and confidently apply AI in daily life.

It is NOT:
• A generic chatbot
• A replacement for ChatGPT
• A search engine

It IS:
• A learning companion
• A curriculum navigator
• A trusted AI literacy assistant

4. Target Personas
Student
Needs structured learning, homework help, career awareness.
Teacher
Needs classroom ideas, lesson planning and safe AI adoption.
Professional
Needs productivity, workplace AI and career growth.
Parent
Needs child safety, responsible AI and educational guidance.
Senior Citizen
Needs simple explanations, fraud awareness and confidence.
Small Business
Needs AI adoption for marketing, operations and growth.
5. MVP Scope
Feature	Included	Notes
Learning Navigator	Yes	Primary capability
Smart Search	Yes	Search across AINews9
Article Assistant	Yes	Context-aware Q&A
Next Lesson	Yes	Learning progression
AI Tool Advisor	Yes	Recommend appropriate AI tools
Memory	No	Phase 2
Quizzes	No	Phase 2
Voice	No	Future
Certificates	No	Future
6. Functional Overview
Learning Navigator
Identifies persona, intent and learning stage, then recommends a curated learning path.
Smart Search
Understands natural language and maps queries to articles, tools and journeys.
Article Assistant
Answers questions using the current article plus related AINews9 knowledge.
Recommendation Engine
Always suggests the next lesson, related tools and relevant articles.
AI Tool Advisor
Matches user needs with beginner-friendly AI tools.
7. High-Level Architecture
User
 ↓
Website Widget / Pragya Page
 ↓
Pragya API
 ↓
OpenAI Responses API
 ↓
AINews9 Knowledge Layer
 ↓
Structured Response

8. Technical Principles
•	API-first architecture
•	Model-agnostic AI layer
•	WordPress as CMS only
•	Reusable services
•	Observability and analytics
•	Security by design
9. Phase-wise Roadmap
Phase 1
Learning Navigator, Search, Recommendations, Tool Advisor.
Phase 2
Progress tracking, quizzes, personalization.
Phase 3
Voice, mobile apps, certificates.
Phase 4
Enterprise APIs and partner ecosystem.
10. Product Decisions
PRG-001
Pragya is an AI Learning Guide, not a generic chatbot.
PRG-002
WordPress remains the content platform; Pragya is the intelligence layer.
PRG-003
API-first architecture from day one.
PRG-004
Every answer should recommend the next learning step.
PRG-005
Bilingual support is a core capability.
Next Parts
Part 2 will include:
• Complete PRD
• UI/UX Specifications
• Desktop/Mobile Wireframes
• Conversation Flows
• Acceptance Criteria
• User Stories

Part 3 will include AI Architecture, System Prompt, Knowledge Graph and Recommendation Engine.

Part 4 will include OpenAI Integration, WordPress, Make.com, APIs, Security, Analytics and Delivery Plan.

PRG-001 – Pragya Master Specification v1.0
PART 2 – Product Requirements Document (PRD), User Experience & User Stories
1. Product Requirements Document
This section defines the functional scope of Pragya MVP. The objective is to deliver an AI Learning Guide that integrates seamlessly with AINews9 and guides users to the right content rather than acting as a generic chatbot.
Homepage Widget
Floating widget available on every page. Opens a conversational panel with quick persona shortcuts and a free-text question box.
Dedicated Pragya Page
Landing page containing hero section, chat interface, suggested questions, learning journeys and recently published AI content.
Learning Navigator
Detects user intent and persona and recommends a structured learning path.
Smart Search
Natural language search across articles, guides, AI tools and learning journeys.
Article Assistant
Context-aware assistant embedded into article pages. Answers questions using the current article and related content.
Recommendation Engine
Suggests next lesson, related articles and suitable AI tools after every interaction.
2. User Stories
•	As a student, I want Pragya to tell me where to begin learning AI.
•	As a teacher, I want classroom-ready AI resources.
•	As a professional, I want AI recommendations that improve productivity.
•	As a parent, I want guidance on safe AI usage for children.
•	As a senior citizen, I want simple explanations without jargon.
•	As a small business owner, I want AI tools that help grow my business.
3. Acceptance Criteria
•	Every response includes an answer and at least one recommended article.
•	Persona selection changes recommendations.
•	Search returns relevant AINews9 content.
•	Widget loads in under 3 seconds.
•	Responses are available in English initially with bilingual-ready architecture.
4. UI/UX Specification
Design philosophy: Minimal, approachable, trustworthy and learning-first. Pragya should feel like a mentor, not a chatbot.
Homepage Widget
Components:
• Greeting
• Persona chips
• Suggested questions
• Input box
• Ask button
• Continue Learning section
Dedicated Page Layout
Hero
↓
Search
↓
Popular Questions
↓
Learning Journeys
↓
Recommended Articles
↓
Recent AI News
↓
Footer
5. Mobile Experience
The widget opens as a bottom sheet. Large touch targets, one-column layout, persistent input field and collapsible recommendations.
6. Conversation Flow
Greeting
↓
Detect Persona
↓
Understand Intent
↓
Generate Answer
↓
Recommend Articles
↓
Recommend Next Lesson
↓
Offer Follow-up
7. Suggested Starter Prompts
•	What is AI?
•	I am a student. Where should I start?
•	Which AI tool should I use for homework?
•	How can I stay safe while using AI?
•	Will AI replace my job?
8. Wireframe (Text)
Homepage Widget

+----------------------------------+
| Hi, I'm Pragya                   |
| Your AI Learning Guide           |
|----------------------------------|
| [Student] [Teacher] [Parent]     |
| [Professional] [Business]        |
|                                  |
| Ask anything...                  |
| ______________________________   |
|            [Ask Pragya]          |
+----------------------------------+
Dedicated Pragya Page

Hero
Search
Suggested Questions
Learning Paths
Chat Area
Recommended Articles
Continue Learning
Footer
9. Non-functional Requirements
•	Responsive on desktop, tablet and mobile.
•	Accessible keyboard navigation.
•	Graceful fallback if AI service is unavailable.
•	Analytics for every interaction.
•	Future-ready for API-first architecture.
10. Out of Scope (MVP)
•	User login
•	Memory
•	Gamification
•	Voice
•	Certificates
•	Community discussions
PRG-001 – Pragya Master Specification v1.0
PART 3 – AI Intelligence Layer, Conversation Design, Knowledge Architecture & Recommendation Engine
1. AI Design Principles
•	Teach before answering.
•	Recommend before ending.
•	Prefer AINews9 knowledge over generic responses.
•	Be transparent when uncertain.
•	Keep explanations beginner-friendly by default.
•	Support English first with bilingual-ready architecture.
2. Conversation Framework
Every conversation follows the same structure:

1. Greeting
2. Detect Persona
3. Detect Intent
4. Determine Learning Stage
5. Retrieve AINews9 knowledge
6. Generate response
7. Recommend articles
8. Recommend next lesson
9. Suggest AI tool
10. Offer follow-up question

3. Intent Classification
Intent	Examples	Action
Learn AI	What is AI?	Start learning journey
Use AI	Best AI for homework	Recommend tools
Stay Safe	AI scam	Safety articles
Grow with AI	AI career	Growth journey
Search	ChatGPT	Search knowledge
Compare	ChatGPT vs Gemini	Comparison guide
4. Persona Detection
Priority:
1. Explicit persona selected by user.
2. Infer from question.
3. Ask clarifying question if uncertain.

5. Master System Prompt (MVP)
You are Pragya, India's AI Learning Guide for AINews9.

Your goal is to educate, guide and recommend—not simply answer questions.

Rules:
• Explain in simple language.
• Prefer AINews9 knowledge whenever available.
• Never pretend to know unpublished AINews9 content.
• Recommend the next lesson after every meaningful answer.
• Recommend relevant AI tools only when appropriate.
• Be encouraging, neutral and trustworthy.
• Refuse unsafe requests politely and educate the user.

6. Response Template
Answer
↓
Why it Matters
↓
Recommended Articles
↓
Next Lesson
↓
Related AI Tool
↓
Suggested Follow-up Question

7. Knowledge Architecture
Primary Knowledge Sources
• Articles
• Learning Hubs
• Personas
• Four Pillars
• FAQs
• AI Tools
• Prompt Library
• Glossary
• News

Metadata:
Article ID
Persona
Pillar
Difficulty
Estimated Reading Time
Prerequisites
Related Lessons

8. Recommendation Engine
Inputs:
• Persona
• Intent
• Current article
• Learning stage
• Preferred language

Outputs:
• Best answer
• Related article
• Next lesson
• AI tool
• Continue learning path

9. Learning Graph
Persona
 ↓
Learning Journey
 ↓
Hub
 ↓
Category
 ↓
Article
 ↓
Related Articles
 ↓
Quiz (Future)
 ↓
Certificate (Future)

10. Safety Guardrails
•	Never provide harmful instructions.
•	Flag misinformation when detected.
•	Use cautious language for medical, legal and financial topics.
•	Protect user privacy.
•	Do not fabricate citations.
11. Prompt Engineering Strategy
System Prompt
+
AINews9 Knowledge Context
+
Current Article Context (optional)
+
Conversation History
+
User Query
=
Final Prompt to OpenAI

12. Evaluation Metrics
•	Recommendation click-through rate
•	Learning completion rate
•	Answer relevance
•	Grounded response rate
•	Average conversation length
•	User satisfaction
13. Future AI Capabilities
•	Memory
•	Adaptive learning paths
•	Voice conversations
•	Hindi-first conversations
•	Quiz generation
•	Prompt coaching
•	Learning analytics
PRG-001 – Pragya Master Specification v1.0
PART 4 – Technical Architecture, APIs, Integration, MVP Delivery & Roadmap
1. Technical Architecture
Presentation Layer
• WordPress Website
• Future Mobile App
• Future WhatsApp

Application Layer
• Pragya API (FastAPI preferred)
• Recommendation Service
• Search Service

AI Layer
• OpenAI Responses API
• Future multi-model abstraction

Knowledge Layer
• WordPress Articles
• Learning Metadata
• AI Tool Library
• Glossary

2. API Specification
Endpoint	Purpose
POST /chat	Main conversational endpoint.
POST /recommend	Returns recommended articles, tools and next lessons.
POST /search	Natural language search.
GET /learning-path/{persona}	Returns learning journey.
GET /article/{id}	Returns article metadata.
GET /health	Health check.
3. Sample API Contract
Request
{
  "persona":"student",
  "question":"What is AI?"
}

Response
{
  "answer":"...",
  "recommended_articles":["L001","L002"],
  "next_lesson":"L002",
  "recommended_tool":"ChatGPT"
}
4. WordPress Integration
•	Use WordPress REST API as primary content source.
•	Store persona, pillar, category and difficulty as metadata.
•	Expose articles through custom API if required.
•	Embed Pragya widget on every article.
•	Show 'Ask Pragya about this lesson' below article content.
5. Make.com Integration
Automations:
• Sync newly published articles.
• Refresh Pragya knowledge index.
• Notify admins on failures.
• Publish AI news summaries.
• Generate analytics reports.
6. Knowledge Index
Initial MVP may use JSON exported from WordPress.
Future versions can migrate to vector search.
Priority order:
1. AINews9 content
2. AI tool database
3. Glossary
4. General model knowledge.
7. Security
•	Protect API keys via server-side configuration.
•	Rate limit anonymous users.
•	Log errors without storing sensitive prompts.
•	Validate and sanitize inputs.
•	Use moderation for unsafe content.
8. Analytics
•	Daily conversations
•	Top questions
•	Top personas
•	Recommendation CTR
•	Article completion
•	Average response time
•	OpenAI token usage
•	Estimated AI cost
9. Development Backlog
Priority	Feature
P1	Homepage Widget
P1	Pragya Landing Page
P1	/chat API
P1	Recommendation Engine
P1	Article Assistant
P2	Search Improvements
P2	Progress Tracking
P3	Voice
P3	Mobile App
10. Sprint Plan
Sprint 1
Architecture, API skeleton, WordPress integration.

Sprint 2
Homepage widget, chat endpoint, search.

Sprint 3
Recommendation engine, article assistant.

Sprint 4
Testing, optimisation, production launch.
11. Cost Strategy
Start with OpenAI only.
No vector database for MVP.
Reuse WordPress.
Scale infrastructure only after user adoption.
12. MVP Launch Checklist
•	Homepage widget working
•	Dedicated Pragya page published
•	OpenAI integration tested
•	Recommendations verified
•	Article assistant enabled
•	Analytics enabled
•	Error logging configured
13. Phase Roadmap
V1: Learning Guide
V2: Personalization
V3: Quizzes & Progress
V4: Voice + Mobile
V5: Enterprise APIs & Learning Ecosystem
14. Final Guiding Principle
Pragya should never try to replace general AI assistants. Its purpose is to make AINews9 the best place to learn AI through guided, trustworthy and structured learning journeys.

