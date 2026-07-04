# AINews9 Decision Log

**Version:** 2.0

**Status:** Active

**Last Updated:** July 2026

---

# Purpose

This document records major product, architecture, engineering, and technology decisions made during the development of AINews9 and Pragya.

The objective is to preserve decision history, avoid revisiting previously approved discussions, and provide a single source of truth for engineering and product teams.

All significant changes to product behaviour or architecture should be documented before implementation.

---

# Decision Categories

| Prefix | Category |
|----------|----------|
| PD | Product Decision |
| AD | Architecture Decision |
| TD | Technology Decision |
| ED | Engineering Decision |

---

# Decision Status

| Status | Meaning |
|----------|----------|
| Approved | Official project direction |
| Draft | Under discussion |
| Superseded | Replaced by another decision |
| Deprecated | No longer applicable |

---

# Product Decisions

---

## PD-001

### Guided Learning Journey

**Status**

Approved

**Date**

July 2026

### Context

The original Pragya MVP began directly with a conversational interface.

This approach provided limited context and reduced personalization.

### Decision

Pragya shall begin with a Guided Learning Journey before entering the conversation.

User Flow:

```
Welcome

↓

Choose AI Journey

↓

Choose Persona

↓

Choose Topic

↓

Conversation

↓

Continue Learning
```

### Rationale

- Better personalization
- Higher recommendation quality
- Lower cognitive load
- Faster onboarding
- Stronger AI literacy experience

### Impact

Impacts:

- UI
- Conversation Flow
- Session Management
- Recommendation Engine
- Knowledge Engine

---

## PD-002

### Context Flexibility

**Status**

Approved

**Date**

July 2026

### Context

Users frequently change topics during conversations.

Restricting users to a predefined journey creates unnecessary friction.

### Decision

Users may ask any AI-related question at any time.

Pragya shall intelligently adapt the active learning context without forcing users back into the original journey.

### Rationale

Natural conversations evolve.

The AI should follow the learner rather than forcing navigation.

### Impact

Impacts:

- Session Context
- Understanding Layer
- Recommendation Engine
- Gateway

---

## PD-003

### Journey First. Chat Second.

**Status**

Approved

**Date**

July 2026

### Decision

Pragya is a Guided AI Learning Companion.

The primary user experience begins with a Guided Journey rather than an empty chat screen.

### Impact

Defines the overall UX philosophy of Pragya.

---

## PD-004

### Continue Learning Philosophy

**Status**

Approved

### Decision

Every meaningful AI response should encourage continued learning whenever appropriate.

Responses may include:

- Related Articles
- AI Tools
- Suggested Questions
- Next Learning Topics

### Rationale

AINews9 promotes AI literacy rather than one-time question answering.

---

## PD-005

### Static Topic Suggestions for Phase 1 MVP

**Status**

Approved

**Date**

July 2026

### Decision

For Phase 1 MVP, Pragya topic suggestions shall be static and configuration-driven.

Topic suggestions should be selected from the user's AI journey and persona.

LLM-generated topic suggestions are not required for Sprint 1.1.

### Rationale

Static suggestions reduce implementation risk, improve predictability, and allow the guided onboarding experience to be tested independently.

### Impact

Impacts:

- Guided Journey
- Topic Suggestions
- Configuration
- Widget Experience

---

# Architecture Decisions

---

## AD-001

### Gateway Architecture

**Status**

Approved

### Decision

Every request shall pass through a central Gateway before entering the intelligence layer.

Gateway responsibilities include:

- Greeting Handling
- Small Talk
- Domain Guard
- Safety Guard
- Context Loading
- Request Routing

The Gateway does not generate AI responses.

### Impact

Foundation of the request-processing pipeline.

---

## AD-002

### Modular Intelligence Architecture

**Status**

Approved

### Decision

Pragya shall use modular intelligence components.

```
Gateway

↓

Understanding Layer

↓

Knowledge Engine

↓

Recommendation Engine

↓

Large Language Model

↓

Learning Journey Engine
```

### Rationale

Improves maintainability and future scalability.

---

## AD-003

### Session Context

**Status**

Approved

### Decision

Every conversation maintains structured session context.

Example:

- Journey
- Persona
- Topic
- Language
- Learning Stage
- Conversation History

Context evolves naturally during conversation.

---

## AD-004

### AI Model Independence

**Status**

Approved

### Decision

Product behaviour shall remain independent of the underlying AI model.

Pragya must support future replacement or addition of models such as:

- OpenAI
- Gemini
- Claude
- Future LLMs

without changing business logic.

---

## AD-005

### In-Memory Session Context for Phase 1 MVP

**Status**

Approved

### Decision

For Phase 1 MVP, Pragya may store session context in memory.

The implementation does not require database-backed persistence, user accounts, or cross-instance session synchronization.

### Rationale

In-memory context is sufficient for the MVP and keeps the first implementation simple.

The session model should remain modular so persistent storage can be introduced in a later phase.

### Impact

Impacts:

- Session Context
- Session Manager
- Conversation Flow
- Deployment Scalability

---

## AD-006

### Minimal Gateway for Early Phase 1

**Status**

Approved

### Decision

During early Phase 1, the Gateway should remain minimal.

It should focus on request entry, basic routing, session loading, and simple validation.

Deep reasoning, advanced understanding, and recommendation strategy belong to later sprint capabilities.

### Rationale

This preserves the approved architecture while avoiding premature complexity.

### Impact

Impacts:

- Gateway
- Request Routing
- Understanding Layer
- Sprint 1.1 Implementation

---

# Technology Decisions

---

## TD-001

### Backend Framework

**Status**

Approved

### Decision

FastAPI shall be the backend framework for Pragya Phase 1.

---

## TD-002

### Primary Knowledge Source

**Status**

Approved

### Decision

AINews9 Knowledge Base shall remain the highest priority knowledge source.

External model knowledge supplements—but does not replace—the curated AINews9 content.

---

## TD-003

### Frontend Integration

**Status**

Approved

### Decision

Pragya will initially integrate with the AINews9 WordPress platform through the website widget.

Future channels may include mobile applications, WhatsApp, Microsoft Teams, and Slack.

---

# Engineering Decisions

---

## ED-001

### Documentation Before Implementation

**Status**

Approved

### Decision

Every significant product behaviour change shall be documented before implementation.

Implementation shall follow documentation rather than define it.

---

## ED-002

### Capability-Based Development

**Status**

Approved

### Decision

Development will follow:

```
Phase

↓

Epic

↓

Sprint

↓

Capability
```

Capabilities shall be independently testable.

---

## ED-003

### AI-Assisted Development Workflow

**Status**

Approved

### Decision

Development workflow:

```
Brainstorm

↓

Product Decision

↓

Documentation

↓

Engineering Review

↓

Implementation

↓

Testing

↓

Release
```

Codex, Gemini CLI, Claude Code, and future AI coding assistants shall implement according to approved documentation.

---

## ED-004

### Refactor and Reuse Existing Pragya Codebase

**Status**

Approved

### Decision

Existing Pragya code should be refactored and reused where appropriate.

Implementation should not discard working modules unless replacement is necessary to meet approved product behaviour.

### Rationale

The current codebase already contains useful FastAPI, OpenAI, WordPress, session, persona, and domain-guard foundations.

Reusing these foundations reduces risk and preserves working behaviour.

### Impact

Impacts:

- Sprint Planning
- Refactoring Strategy
- Code Review
- Regression Testing

---

# Superseded Decisions

None.

---

# Pending Decisions

Future product decisions will be added here as the platform evolves.

---

# Version History

## Version 2.0

Major update introducing structured Product, Architecture, Technology, and Engineering decision records.

This document now serves as the authoritative decision history for Pragya and AINews9.

---

# End of Document
