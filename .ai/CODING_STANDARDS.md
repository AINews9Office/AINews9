# Coding Standards

## Purpose

These coding standards apply to every AI coding assistant and developer contributing to the AINews9 platform.

---

# General Principles

Always write:

- Clean code
- Readable code
- Modular code
- Reusable code
- Production-ready code

Prefer simplicity over cleverness.

---

# Architecture

Follow:

- SOLID Principles
- Separation of Concerns
- Single Responsibility Principle

Keep business logic separate from API routes.

---

# Python Standards

Use:

- Type hints
- Docstrings for public functions
- Meaningful variable names
- Small functions
- Small modules

Avoid:

- Global variables
- Large functions
- Duplicate logic

---

# File Organization

Keep related functionality together.

Avoid circular imports.

Avoid unnecessary files.

---

# Error Handling

Always:

- Handle expected errors gracefully.
- Return meaningful messages.
- Log useful information.
- Never expose secrets.

---

# Security

Never:

- Hardcode API keys.
- Commit .env files.
- Expose sensitive information.
- Trust user input.

Validate all external input.

---

# Performance

Prefer:

- Efficient algorithms
- Lazy loading where appropriate
- Reusable services

Avoid premature optimization.

---

# Documentation

Whenever a feature changes:

- Update documentation if required.
- Keep comments concise.
- Let code explain itself whenever possible.

---

# Testing

Before considering work complete:

- Existing functionality must continue to work.
- New functionality should be manually tested.
- Avoid breaking changes.

---

# Repository Rules

Do not:

- Rename files without approval.
- Move folders without approval.
- Delete working code.
- Rewrite architecture without approval.

---

# Commit Philosophy

Every commit should:

- Build successfully.
- Improve maintainability.
- Preserve backward compatibility.
- Leave the repository in a better state.

---

# AINews9 Principle

Code should be simple enough that another developer—or another AI agent—can understand it quickly.

Write for long-term maintainability, not short-term speed.