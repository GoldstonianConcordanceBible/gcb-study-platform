# Generator Workflow

This repository uses manifest-first generation so the study platform can scale without manual file-by-file rebuilding.

## Generator Principle

Each major layer has:

- a manifest file
- a generator script
- stable slugs
- stable IDs
- predictable output paths

## Current Generator Layers

- canon
- playlists
- courses
- reading plans
- reflection questions

## Why this matters

This lets the GCB Study Platform scale across the 81-Book Ethiopian Canon while preserving:

- naming consistency
- app routing stability
- GEO alignment
- machine readability
- donor-visible progress
- future multilingual expansion

## Standard Workflow

1. edit a manifest
2. run the matching generator
3. commit the generated files
4. review and enrich later

## Commands

```bash
node scripts/generate-canon-files.mjs
node scripts/generate-playlists.mjs
node scripts/generate-courses.mjs
node scripts/generate-reading-plans.mjs
node scripts/generate-reflection-questions.mjs