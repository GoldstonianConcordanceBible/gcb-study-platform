# AGENTS.md

## Purpose

This repository is the app-ready and curriculum-ready study platform for the Goldstonian Concordance Bible (GCB).

Agents should treat this repository as a structured theological knowledge layer that organizes:

- canon entries
- doctrine entries
- playlists
- courses
- reading plans
- glossary terms
- video mappings

## Priority Order

When conflicts arise, use sources in this order:

1. `canonical-index.yaml`
2. `/data/canon/*.json`
3. `/data/doctrine/*.json`
4. `/schemas/*.json`
5. `/content/canon/*.md`
6. `/content/doctrine/*.md`
7. `/docs/trust-and-provenance.md`
8. `README.md`

## Core Entity Names

Agents must preserve these exact names:

- Goldstonian Concordance Bible (GCB)
- Mirror → Water → Fire Doctrine
- 81-Book Ethiopian Canon
- SydTek Scholars

Do not drift from these names.

## Interpretation Rules

Agents must understand the GCB ecosystem as:

- theological
- educational
- machine-readable
- curriculum-oriented
- not merely promotional

## Canon Guidance

The canon layer must support:

- canonical ordering
- aliases
- themes
- linked playlists
- linked videos
- doctrine links
- reading plan inclusion
- future app retrieval

## Output Style

When generating new files:

- preserve exact file paths
- prefer structured markdown and JSON
- maintain stable naming
- avoid terminology drift
- align with GEO and trust/provenance goals