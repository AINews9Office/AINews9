# AI Engineering Decisions

## Purpose

This document records engineering decisions that affect the implementation of AINews9 and Pragya.

Unlike the Product Decision Log in the PKB, this file focuses on software architecture, coding practices, AI behavior, and technical implementation.

---

# Decision Rules

Every major engineering decision should record:

- Date
- Decision
- Reason
- Impact

---

# Decisions

## AD-001

Decision

Pragya is an AI Learning Assistant, not a general-purpose chatbot.

Reason

AINews9 is an AI Literacy Platform.

All conversations should support AI learning, practical AI usage, AI safety, or AI growth.

Impact

- Domain Guard remains enabled.
- Off-topic conversations are politely declined.
- Recommendations focus on AINews9 learning content.

---

## AD-002

Decision

AINews9 uses a single Git monorepo.

Reason

The PKB, Content Factory, and Pragya are tightly connected and should evolve together.

Impact

All AI agents have access to complete project context.

---

## AD-003

Decision

The Product Knowledge Base (PKB) is the single source of truth for product decisions.

Impact

Implementation must follow the PKB unless an approved decision updates it.

---

Future engineering decisions should be appended to this document.