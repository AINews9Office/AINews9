# AINews9 Architecture

**Version:** 1.0
**Status:** Active
**Owner:** AINews9
**Last Updated:** 02 July 2026

---

# Purpose

This document explains the technical architecture of the AINews9 platform.

It is intended for AI coding assistants and developers.

Before implementing any new feature, understand this architecture.

---

# Architecture Philosophy

AINews9 follows a modular architecture.

Each component has a single responsibility.

Business logic should remain separated from:

- API Layer
- Configuration
- Data
- External Services
- User Interface

Avoid monolithic implementations.

---

# Platform Overview

```
                        User
                          │
                          ▼
                 Pragya Widget
                          │
                          ▼
                    FastAPI Server
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
 AI Service        Knowledge Service   Memory Service
        │                 │                 │
        ▼                 ▼                 ▼
 Recommendation     Persona Engine   Domain Guard
        │
        ▼
 WordPress Integration
        │
        ▼
 AINews9 Website
```

---

# Repository Architecture

```
AINews9/

├── .ai
├── .github

├── AINews9 PKB
├── AINews9_Content_Factory

├── Pragya
│      ├── app
│      ├── data
│      ├── docs
│      ├── tests
│      └── Pragya_Widget_v1
│
├── docs
└── Releases
```

Each folder has a dedicated responsibility.

Never mix documentation with implementation.

---

# Pragya Architecture

```
User

↓

Widget

↓

FastAPI

↓

Services

↓

Knowledge

↓

OpenAI

↓

Response
```

Pragya should remain service-oriented.

---

# Current Backend

```
FastAPI

↓

Routes

↓

Services

↓

Models

↓

External APIs
```

Business logic belongs inside Services.

Routes should remain lightweight.

---

# Current Services

Current implementation contains:

AI Service

Responsible for:

- OpenAI integration
- Prompt execution
- AI response generation

---

Knowledge Service

Responsible for:

- Knowledge lookup
- Context preparation
- Article retrieval

---

Memory Service

Responsible for:

- Session history
- Conversation memory
- Future personalization

---

Persona Service

Responsible for:

- Persona detection
- Persona-specific recommendations
- Learning adaptation

---

Recommendation Service

Responsible for:

- Article suggestions
- Learning paths
- Related content

---

Domain Guard

Responsible for:

- Domain validation
- Off-topic detection
- Safe redirection

---

WordPress Service

Responsible for:

- Article retrieval
- Search
- Content integration

No other module should directly access WordPress.

---

# API Layer

Routes should only:

- Validate input
- Call services
- Return responses

Routes should never contain business logic.

---

# Configuration Layer

Configuration belongs in:

config.py

Never hardcode:

- URLs
- Keys
- Models
- Environment values

---

# Data Layer

Current data includes:

articles.json

personas.json

tools.json

Future data sources should remain independent from business logic.

---

# Widget Architecture

The widget should remain lightweight.

Responsibilities:

- UI
- User interaction
- API communication

Never place AI logic inside the widget.

---

# WordPress Integration

WordPress is the publishing platform.

Pragya consumes content from WordPress.

WordPress should not contain AI business logic.

---

# AI Flow

```
User Question

↓

Domain Guard

↓

Persona Detection

↓

Knowledge Retrieval

↓

Recommendation Engine

↓

Prompt Construction

↓

OpenAI

↓

Response

↓

Memory Update

↓

User
```

Maintain this order whenever possible.

---

# Feature Development Rules

Before adding a feature:

1. Identify owning service.
2. Extend existing module.
3. Avoid duplicate logic.
4. Preserve API compatibility.
5. Update documentation if architecture changes.

---

# Future Architecture

Phase 2

- Persistent Memory
- User Profiles
- Learning Progress
- Bookmarks

---

Phase 3

- Learning Paths
- Assessments
- Certifications
- AI Tutor

---

Phase 4

- Multi-Agent Architecture
- RAG
- Vector Database
- Knowledge Graph
- Multi-language Intelligence

---

# Architecture Principles

Always:

- Keep modules focused.
- Prefer composition over duplication.
- Keep APIs stable.
- Build reusable services.
- Write testable code.

Never:

- Create God classes.
- Hardcode integrations.
- Bypass services.
- Mix UI and business logic.

---

# Final Principle

Architecture should make future development easier.

Every new feature should improve the architecture instead of increasing complexity.