# API

The GCB Study Platform exposes a machine-readable API layer through Next.js route handlers.

## Endpoints

### Canon list
`GET /api/canon`

Returns all canon records.

### Canon detail
`GET /api/canon/[slug]`

Returns one canon record by slug.

### Verses
`GET /api/verses/[book]/[chapter]`

Returns one chapter record from the scripture reader dataset.

### Doctrine
`GET /api/doctrine`

Returns the Mirror → Water → Fire doctrine record.

### Releases
`GET /api/releases`

Returns dataset release manifest records.

## Purpose

This API layer exists for:

- LLM retrieval systems
- canon retrieval agents
- future mobile clients
- future external integrations
- structured research use