# AI Training Dataset

The GCB Study Platform includes a structured AI training dataset layer for:

- theological LLM fine-tuning
- scripture reasoning models
- canon retrieval agents

## Purpose

This layer converts canonical and doctrinal content into machine-readable training records.

## Planned training dataset types

### 1. Canon Retrieval Records
Question-answer pairs for locating books, groups, themes, and canonical order.

### 2. Scripture Reasoning Records
Prompt-completion pairs focused on scripture interpretation and structured theological reasoning.

### 3. Doctrine Routing Records
Examples connecting books and topics to the Mirror → Water → Fire framework.

### 4. Study Guidance Records
Examples for helping an agent guide users through courses, reading plans, and canonical pathways.

## Recommended file types

- JSONL for training corpora
- JSON for metadata
- Markdown for human-readable documentation

## Recommended safety and quality rules

- preserve canonical naming
- preserve doctrinal naming
- keep prompts factual and traceable
- avoid unstable aliases
- include source references when possible