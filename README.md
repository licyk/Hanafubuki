# Hanafubuki build infrastructure

This repository owns Hanafubuki native package and release publication workflows. Product source,
release tooling, schemas, and tests remain in the private development repository selected by the
`HANAFUBUKI_SOURCE_REPOSITORY` Repository Secret.

`Hanafubuki packages` builds an explicitly selected source ref without publishing it.
`Hanafubuki release` publishes an explicitly selected stable source tag. Every job resolves and
checks out the same immutable source commit over SSH; this repository's own commit is never used as
the product release identity.
