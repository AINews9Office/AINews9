# GitHub Copilot Instructions

**Version:** 1.0  
**Status:** Active  
**Owner:** AINews9  
**Last Updated:** 02 July 2026

---

# Mission

You are contributing to the AINews9 platform.

Your goal is not simply to generate code.

Your goal is to help build **India's AI Literacy Platform** while preserving architecture, maintainability and product vision.

Always understand the project before making changes.

---

# Read Before Coding

Before implementing any feature, always review:

1. `.ai/PROJECT.md`
2. `.ai/CURRENT_SPRINT.md`
3. `.ai/ARCHITECTURE.md`
4. Relevant documents in `AINews9 PKB`
5. Existing implementation

Never start coding without understanding the current context.

---

# AI Source of Truth

When documentation conflicts, follow this order:

```
AINews9 PKB

↓

PRG-001 Pragya Master Specification

↓

PRG-002 Pragya Capability Roadmap

↓

PROJECT_STATUS.md

↓

CURRENT_SPRINT.md

↓

Source Code

↓

Historical Documents
```

Never invent requirements.

Never merge conflicting information.

Follow the highest-priority document.

---

# Product Philosophy

AINews9 exists to:

**Make AI Simple, Useful & Safe for Every Indian.**

Pragya exists to:

- Teach AI
- Guide AI learning
- Recommend learning content
- Improve AI literacy

Pragya is **NOT** a general-purpose chatbot.

---

# Engineering Philosophy

Write production-quality software.

Prioritize:

- Readability
- Maintainability
- Simplicity
- Reusability
- Scalability

Avoid unnecessary complexity.

---

# Repository Rules

Always:

- Preserve repository structure.
- Keep folders organized.
- Extend existing modules.
- Reuse existing services.
- Write modular code.
- Respect architecture.

Never:

- Rename major folders.
- Remove existing architecture.
- Duplicate logic.
- Rewrite working modules without justification.

---

# Coding Rules

Prefer:

- Small functions
- Clear naming
- Single responsibility
- Dependency injection where appropriate
- Configuration over hardcoding

Avoid:

- Large methods
- Global state
- Hidden side effects
- Unnecessary abstractions

---

# API Rules

FastAPI routes should:

- Validate requests
- Call services
- Return responses

Business logic belongs inside services.

---

# Service Rules

Existing services should be extended before creating new ones.

Current services include:

- AI Service
- Knowledge Service
- Memory Service
- Persona Service
- Recommendation Service
- Domain Guard
- WordPress Service

Do not bypass service boundaries.

---

# Configuration Rules

Never hardcode:

- API Keys
- URLs
- Secrets
- Tokens
- Model names

Use:

- `.env`
- `config.py`

---

# WordPress Rules

WordPress is the publishing platform.

Pragya consumes WordPress content.

Never place business logic inside WordPress integration.

Keep integration isolated inside `wordpress_service.py`.

---

# Documentation Rules

Documentation exists for:

- Humans
- AI Agents

When architecture changes:

- Update relevant documentation.
- Keep PROJECT_STATUS synchronized.
- Preserve Source of Truth.

---

# Testing Rules

Before considering work complete:

- Verify implementation.
- Preserve existing functionality.
- Avoid regressions.
- Keep APIs backward compatible.

---

# Commit Philosophy

Each commit should:

- Solve one logical problem.
- Be understandable.
- Avoid unrelated changes.

Prefer small, focused commits.

---

# Response Style

When responding:

- Be concise.
- Explain assumptions.
- Identify risks.
- Recommend improvements where appropriate.

Do not generate unnecessary code.

---

# If Requirements Are Unclear

Never guess.

Instead:

- State assumptions.
- Ask focused clarification questions.
- Wait for confirmation when ambiguity affects implementation.

---

# Long-Term Goal

Every contribution should move AINews9 closer to becoming:

**India's Most Trusted AI Literacy Platform**

Technology is a means to achieve that mission—not the goal itself.