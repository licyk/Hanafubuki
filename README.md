# Hanafubuki build infrastructure

This repository owns Hanafubuki native package and release publication workflows. Product source,
release tooling, schemas, and tests remain in the private development repository selected by the
`HANAFUBUKI_SOURCE_REPOSITORY` Repository Secret.

`Hanafubuki packages` builds an explicitly selected source ref without publishing it.
`Hanafubuki release` publishes an explicitly selected stable source tag. Every job resolves and
checks out the same immutable source commit over SSH; this repository's own commit is never used as
the product release identity.

Each native package job owns Tauri's platform-specific output layout and uploads one clean target
handoff containing only canonical packages and `target.json`. The isolated Updater job signs the
single payload declared by each manifest when credentials are present. The publisher consumes the
five manifests directly; it never scans or filters Tauri work directories.
