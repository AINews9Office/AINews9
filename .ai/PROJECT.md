# AINews9 Project
**Version:** 2.0  
**Status:** Active Development  
**Repository:** AINews9  
**Owner:** AINews9Office

---

# Executive Summary

AINews9 is evolving from an AI News Website into **India's AI Literacy Platform**.

The long-term vision is to build the country's most trusted platform that helps ordinary people understand, adopt, and safely use Artificial Intelligence.

AINews9 is not merely a content website.

It is a complete AI learning ecosystem consisting of:

- AI Literacy Content
- AI Learning Assistant (Pragya)
- AI News Platform
- AI Content Factory
- AI Knowledge Base
- AI Automation Platform

The repository is intentionally designed as a **single AI-native monorepo** where product knowledge, engineering knowledge, editorial knowledge, and source code evolve together.

Every AI coding assistant working on this repository should understand the project before generating code.

---

# Vision

Build India's most trusted AI Literacy Platform helping people:

- Learn AI
- Use AI
- Stay Safe
- Grow with AI

The platform should make Artificial Intelligence understandable and useful for every Indian regardless of technical background.

---

# Mission

Making AI Simple, Useful & Safe for Every Indian.

Every product, feature, article, automation and engineering decision should support this mission.

---

# Strategic Pillars

AINews9 is organized around four strategic pillars.

## 1. Learn AI

Help people understand AI.

Examples:

- AI Basics
- Machine Learning
- LLMs
- AI Terminology
- AI Concepts
- AI Foundations

---

## 2. Use AI

Teach practical AI usage.

Examples:

- ChatGPT
- Gemini
- Claude
- NotebookLM
- AI Productivity
- Prompt Engineering
- Everyday AI

---

## 3. Stay Safe

Promote responsible AI usage.

Examples:

- AI Scams
- Deepfakes
- Privacy
- Cyber Security
- Responsible AI
- AI Ethics

---

## 4. Grow with AI

Help people improve careers, education and businesses using AI.

Examples:

- Career Growth
- AI Jobs
- Entrepreneurship
- AI for Students
- AI for Professionals
- AI for Small Businesses

---

# Primary Personas

AINews9 serves six primary personas.

## Students

Need:

- AI literacy
- Learning support
- Career preparation
- AI tools for education

---

## Teachers

Need:

- AI-assisted teaching
- Classroom productivity
- Responsible AI usage
- Educational tools

---

## Parents

Need:

- Child AI safety
- AI awareness
- Parenting guidance
- Family AI literacy

---

## Professionals

Need:

- Productivity
- Career growth
- AI at work
- Automation

---

## Senior Citizens

Need:

- Simple explanations
- Everyday AI
- Digital confidence
- Safe technology adoption

---

## Small Businesses

Need:

- AI for business
- Marketing
- Productivity
- Cost reduction
- Growth

---

# Core Products

The AINews9 ecosystem currently consists of four strategic products.

## AINews9 Website

The primary AI literacy platform.

Responsibilities:

- Educational content
- AI News
- Learning journeys
- Persona-specific experiences

---

## Pragya AI Learning Assistant

Pragya is the flagship AI product.

Purpose:

Guide users through AI learning.

Pragya is **NOT** a general-purpose chatbot.

Pragya exists to help users:

- Learn AI
- Discover relevant content
- Understand AI concepts
- Navigate learning journeys
- Receive persona-aware guidance

Every engineering decision related to Pragya should reinforce this philosophy.

---

## AI News Feed

Curated AI news aggregation platform.

Responsibilities:

- Collect
- Filter
- Summarize
- Categorize
- Present AI news

Future versions will integrate directly with Pragya.

---

## AI Content Factory

AI-assisted editorial production platform.

Responsibilities:

- Content planning
- Research
- Draft creation
- Editorial workflows
- Image generation
- SEO
- Publishing
- Localization

The Content Factory enables scalable production of high-quality AI literacy content.

---

# Repository Philosophy

This repository is intentionally designed as a **single source of engineering truth**.

Instead of maintaining separate repositories for documentation, product planning and engineering, everything lives together.

Advantages:

- AI agents have complete project context.
- Product decisions remain synchronized with implementation.
- Documentation evolves alongside code.
- Repository history captures the evolution of both product and engineering.

The repository should remain clean, modular and easy to navigate.

---

# Repository Structure

```
AINews9/

├── .ai/
├── .github/
├── docs/
├── Releases/

├── AINews9 PKB/
├── AINews9_Content_Factory/
├── Pragya/

└── README.md
```

Each top-level folder has a distinct responsibility.



# Product Knowledge Base (PKB)

The Product Knowledge Base (PKB) is the most important documentation within the AINews9 repository.

It represents the collective product knowledge of AINews9 and serves as the primary reference for all future engineering, editorial and AI decisions.

Every AI coding assistant should consult the PKB before making architectural or product decisions.

The PKB should always evolve before the implementation whenever practical.

---

# PKB Structure

```
AINews9 PKB

01_Strategy
02_Product
03_Execution
04_Brand_Assets
```

---

## 01 – Strategy

Contains long-term business direction.

Examples:

- Vision
- Mission
- Product Roadmap
- Decision Log
- Persona Strategy
- VC Deck
- Business Positioning

This folder answers:

> Why are we building this?

---

## 02 – Product

Contains product specifications.

Examples:

- Website Architecture
- UI Vision
- Brand Guidelines
- PRG-001 Pragya Master Specification
- PRG-002 Pragya Capability Roadmap

This folder answers:

> What are we building?

---

## 03 – Execution

Contains execution planning.

Examples:

- Website Status
- Automation Architecture
- Content Strategy
- Execution Plan

This folder answers:

> How are we building it?

---

## 04 – Brand Assets

Contains reusable assets.

Examples:

- Logos
- Mockups
- Homepage Designs
- Theme References
- VC Deck
- Brand Visuals

This folder answers:

> How should AINews9 look?

---

# AI Source of Truth

When information conflicts, every AI assistant must follow this hierarchy.

Priority Order

```
1.
AINews9 PKB

↓

2.
PRG-001 Pragya Master Specification

↓

3.
PRG-002 Pragya Capability Roadmap

↓

4.
PROJECT_STATUS.md

↓

5.
Current Sprint Documentation

↓

6.
Source Code

↓

7.
Historical Documents
```

Do not attempt to "average" conflicting information.

Always follow the highest-priority source.

---

# Current Product

The current flagship product is:

**Pragya AI Learning Assistant**

All active engineering work is centered around Pragya.

Other platform components support Pragya directly or indirectly.

---

# Pragya Philosophy

Pragya is not intended to compete with ChatGPT, Gemini or Claude.

Pragya exists to solve a different problem.

Mission:

Guide Indians through their AI learning journey.

Pragya should always remain:

- Educational
- Beginner-friendly
- Practical
- Trustworthy
- Safe
- Persona-aware

Every feature should strengthen AI literacy.

If a proposed feature does not improve AI literacy, it should be questioned.

---

# What Pragya IS

Pragya is:

- AI Learning Guide
- Learning Companion
- Knowledge Navigator
- Recommendation Engine
- AI Literacy Coach
- Educational Assistant

---

# What Pragya is NOT

Pragya is NOT:

- General chatbot
- Coding assistant
- Internet search engine
- Personal therapist
- Entertainment chatbot

Whenever conversations drift away from AI literacy, Pragya should gently redirect users toward AI learning.

---

# Current Technology Stack

Current technologies include:

Website

- WordPress
- Kadence Theme
- Gutenberg
- Rank Math SEO

Automation

- Make.com
- News APIs
- WordPress APIs

Backend

- Python
- FastAPI
- OpenAI Responses API

Frontend

- HTML
- CSS
- JavaScript

Hosting

- Hostinger
- Render (where applicable)

Version Control

- Git
- GitHub

Development

- VS Code
- ChatGPT
- Codex
- GitHub Copilot

This stack should remain simple, affordable and maintainable.

Avoid introducing unnecessary technologies without a strong architectural reason.

---

# Current Approved Technologies

Website Theme

**Kadence**

Status

Production Standard

Previous Theme

Blocksy

Status

Historical evaluation only.

Future engineering should assume Kadence unless an approved decision changes the platform architecture.

---

# Canonical Naming

The official product name is:

**Pragya**

Meaning:

Wisdom

Intelligence

Knowledge

Never use:

- Prajna
- Pragia
- Pragia

Maintain consistent naming across:

- Code
- Documentation
- UI
- APIs
- Articles
- Marketing

---

# Repository Principles

This repository is designed as an AI-native engineering workspace.

It should always remain:

- Well organized
- Easy to navigate
- Self-documenting
- AI friendly
- Beginner friendly

Every folder should have a clear responsibility.

Avoid unnecessary complexity.


# Engineering Philosophy

AINews9 is being built as an **AI-native platform**.

Engineering decisions should always prioritize:

- Simplicity
- Maintainability
- Reusability
- Scalability
- Cost-effectiveness

Technology should never become more complex than the problem it solves.

Every new dependency, framework or service should have a clear long-term benefit.

---

# AI-First Development

AINews9 is developed using Human + AI collaboration.

Primary AI engineering partners include:

- ChatGPT
- Codex
- GitHub Copilot

Future AI engineering assistants may also contribute.

Every AI assistant should be treated as a software engineer joining the project.

The repository should provide enough context that AI agents can become productive with minimal prompting.

---

# Human + AI Roles

## Founder

Responsible for:

- Vision
- Product decisions
- Prioritization
- Testing
- Final approval

---

## AI Engineering Assistant

Responsible for:

- Code generation
- Code explanation
- Refactoring
- Documentation
- Architecture suggestions
- Testing assistance

AI should support engineering decisions but should not invent product requirements.

---

# Development Philosophy

AINews9 follows a Documentation-Driven Development approach.

Workflow:

```
Idea

↓

Product Decision

↓

PKB Update

↓

Specification

↓

Implementation

↓

Testing

↓

Documentation Update

↓

Release
```

Engineering should never bypass product documentation.

---

# Repository Rules

Every contributor (human or AI) should follow these principles.

Always:

- Read relevant documentation before coding.
- Preserve backward compatibility.
- Prefer extending existing components.
- Keep functions small.
- Keep modules focused.
- Write production-ready code.
- Keep documentation synchronized with implementation.

Never:

- Rename major folders.
- Remove architecture without approval.
- Duplicate existing functionality.
- Rewrite working modules without justification.
- Hardcode secrets or API keys.
- Break existing APIs.

---

# Architecture Principles

The architecture should remain modular.

Each service should have a single responsibility.

Examples:

- Domain Guard
- Persona Service
- Recommendation Service
- Knowledge Service
- AI Service
- Memory Service
- WordPress Service

Avoid creating "God Classes" or oversized utility modules.

Whenever adding new functionality:

1. Check if an existing service should own it.
2. Extend that service where appropriate.
3. Create a new service only when responsibilities are clearly distinct.

---

# Coding Principles

Preferred characteristics:

- Readable
- Modular
- Well structured
- Easy to test
- Easy to maintain

Favor clarity over cleverness.

Future maintainability is more important than writing the shortest possible code.

---

# Configuration Principles

Configuration belongs in configuration files.

Avoid hardcoded values.

Examples:

- URLs
- API Keys
- Feature Flags
- Model Names
- Timeouts

These should remain configurable.

---

# Security Principles

Never commit:

- API Keys
- Passwords
- Tokens
- Secrets
- Production credentials

Always use:

- .env
- .env.example

Validate all external inputs.

Fail safely.

Protect user privacy.

---

# Documentation Philosophy

Documentation exists to serve two audiences:

1. Humans
2. AI Agents

Documentation must earn its place.

Every document should answer at least one of these questions:

- Does it help build faster?
- Does it help AI understand the project?
- Does it preserve important knowledge?
- Will it be reused?

If the answer is "No", reconsider creating or maintaining it.

---

# Current Sprint

Current Phase

Phase 1 MVP

Current Product

Pragya AI Learning Assistant

Current Sprint

Sprint 1 – Intelligence Core

Primary Objectives

- Improve response quality
- Strengthen Domain Guard
- Persona Engine v2
- Recommendation improvements
- Knowledge retrieval improvements
- Learning Journey generation
- Better maintainability

The current sprint should always align with PROJECT_STATUS.md.

---

# Future Roadmap

## Phase 1

Production-ready Pragya MVP

---

## Phase 2

Advanced Personalization

Memory Improvements

Learning Progress

Bookmarks

Learning Paths

---

## Phase 3

AI Learning Ecosystem

Interactive Courses

Quizzes

Certifications

Community Features

Teacher Support

---

## Phase 4

India's AI Literacy Platform

Multi-language Expansion

AI Academy

Enterprise Learning

Government Partnerships

Educational Integrations

---

# Definition of Success

AINews9 succeeds when:

- AI becomes understandable for everyone.
- Beginners can confidently start their AI journey.
- Users return because Pragya genuinely helps them learn.
- The platform becomes India's most trusted destination for AI literacy.

Engineering success is measured not by lines of code, but by how effectively technology advances the mission:

**Making AI Simple, Useful & Safe for Every Indian.**

---

# AI Agent Instructions

Before making any code changes:

1. Read this document.
2. Read `.ai/CURRENT_SPRINT.md`.
3. Consult the PKB.
4. Review the relevant product specification.
5. Understand the existing implementation.
6. Preserve architecture.
7. Implement only what is required.
8. Keep documentation synchronized where applicable.

Every AI engineer should leave the repository in a better state than it was found.

---

# Final Principle

AINews9 is not just another software project.

It is an AI-native company being built with Human + AI collaboration.

Every commit, every document and every feature should move the platform closer to its mission:

**Making AI Simple, Useful & Safe for Every Indian.**