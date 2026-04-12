# GCB Build System

The GCB Study Platform uses a manifest-first build system so the repository can regenerate its core study infrastructure automatically.

## Principle

Instead of manually authoring every book, course, playlist, article, podcast, and reflection file, the repository uses:

- canonical manifest files
- generator scripts
- orchestration scripts
- validation scripts

This makes the platform durable, reproducible, and scalable.

## Main Commands

### Build the full ecosystem

```bash
npm run build:gcb