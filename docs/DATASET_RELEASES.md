# Dataset Releases

The GCB Study Platform supports formal dataset releases for scholarly archiving and reuse.

## Release targets

### GitHub Releases
Use GitHub releases as version checkpoints for software and datasets.

### Zenodo
Connect the GitHub repository to Zenodo and archive releases for persistent scholarly records.

### Figshare
Use Figshare for dataset-oriented publication with strong descriptive metadata.

### Harvard Dataverse
Use Harvard Dataverse for research data and code packaging.

## Recommended release sequence

### Release 1 — Canon Dataset
Contents:
- `data/canon/`
- `content/canon/`
- `data/bible-text/`
- `data/playlists/`
- `data/courses/`
- `content/courses/`

### Release 2 — Article and Podcast Metadata
Contents:
- `data/articles/`
- `content/essays/`
- `data/podcasts/`
- `content/podcasts/`

### Release 3 — AI Training Dataset
Contents:
- `data/training/`
- `docs/AI_TRAINING_DATASET.md`
- retrieval and prompt records

### Release 4 — API Snapshot
Contents:
- API response snapshots
- endpoint documentation
- route metadata

## Metadata rule

Every release should include:

- a clear title
- a clear description
- version number
- creator metadata
- license
- keywords
- repository reference
- related publication links when available