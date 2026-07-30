---
name: publish
description: Publish a new release of @all-the.rest/mat-extended to npm. USE WHEN user says "publish", "release", "npm publish", "create a release", or "tag a release".
---

# Publish Workflow

This project publishes `@all-the.rest/mat-extended` to npm via GitHub Actions triggered by semantic version tags.

## Version strategy on `main`

The version on `main` is always the **next** unreleased version with a `-snapshot` suffix:

```
packages/mat-extended/package.json → "0.x.y-snapshot"
```

This means `main` always reflects what the next release will be, and the released tag points to HEAD - 1 (the commit before the snapshot bump).

## Release flow

### 1. Prepare release commit (HEAD - 1)

The commit being tagged must have the **stable** version (no `-snapshot` suffix):

```
packages/mat-extended/package.json → "0.x.y"
```

### 2. Bump version on `main` (HEAD)

After tagging, bump `main` to the next version with `-snapshot`:

```
packages/mat-extended/package.json → "0.x.(y+1)-snapshot"
```

Also update demo version strings (see below).

### 3. Tag and push

```
git tag -a vX.Y.Z -m "Release vX.Y.Z"
git push origin main --follow-tags
```

The tag `vX.Y.Z` points to the commit **before** the snapshot bump (HEAD - 1). The release workflow builds from that tagged commit.

## Demo page version strings

Three files contain hardcoded version strings that must be updated on `main` after each release:

| File | String | Example |
| ---- | ------ | ------- |
| `apps/demo/src/app/overview.ts` | `Active Development &middot; v0.1.5-alpha` | `v0.1.6-snapshot` |
| `apps/demo/src/app/app.html` | `v0.1.5-alpha &middot; MIT` | `v0.1.6-snapshot &middot; MIT` |

After bumping `package.json` to the next snapshot version, update these demo strings to match.

## Prerequisites

- All CI steps must pass (lint, test, build, e2e)
- CHANGELOG.md must be updated for the new version (under `## [Unreleased]`, then moved to a versioned section)
- `packages/mat-extended/package.json` must have the correct stable version for the tag commit
- Demo version strings on `main` must reflect the next snapshot version
- git working tree must be clean

## Step 1: Validate pre-publish state

Run the full CI pipeline locally first:

```
pnpm nx lint --fix
pnpm nx run-many -t test --skip-nx-cache
pnpm nx build mat-extended
pnpm nx build demo
pnpm nx run demo-e2e:e2e --skip-nx-cache
```

All must pass green. If any fail, fix before proceeding.

## Step 2: Update changelog

1. Add an entry to `CHANGELOG.md` under `## [Unreleased]`
2. Move the section to a versioned heading like `## [X.Y.Z] – YYYY-MM-DD`
3. Remove the `## [Unreleased]` header if it becomes empty

## Step 3: Tag the stable commit and push

Tag the commit that has the stable (non-snapshot) version — this is HEAD - 1:

```
git tag -a vX.Y.Z -m "Release vX.Y.Z"
git push origin main --follow-tags
```

This triggers `release.yml` which runs test-and-build, then publishes to npm automatically.

## Step 4: Verify CI Actions

Monitor two workflows in GitHub Actions:

### `release.yml` — npm publish

| Job | Purpose |
| --- | ------- |
| `test-and-build` | Builds all entry points, runs test + lint + e2e, uploads dist artifact |
| `publish` | Depends on `test-and-build`; downloads dist artifact, runs `npm publish --provenance --access public`, creates GitHub Release with changelog |

The publish job extracts the changelog section for the matching version from `CHANGELOG.md` and uses it as the release notes.

### `ci.yml` — demo deploy

The `deploy-demo` job runs on every push to `main` (after `test-and-lint` and `e2e` pass). It deploys the built demo to GitHub Pages using `actions/deploy-pages@v4`.

Both workflows are defined in `.github/workflows/ci.yml` (demo deploy + e2e) and `.github/workflows/release.yml` (npm publish).

## Step 5: Confirm demo is live

After the `release.yml` publish job succeeds, the `deploy-demo` workflow will also pick up the `main` push and redeploy the demo. Verify the demo is live at the GitHub Pages URL.

## npm publish details

| Field | Value |
| ----- | ----- |
| Package | `@all-the.rest/mat-extended` |
| Registry | `https://registry.npmjs.org` |
| Access | `public` |
| Provenance | enabled (`--provenance`) |
| Build output | `dist/packages/mat-extended` |
| Executor | `@nx/angular:package` |

## Secondary Entry Points

Each component has its own secondary entry point. When adding a new component, ensure it has:
- `packages/mat-extended/<component>/ng-package.json`
- `packages/mat-extended/<component>/package.json`
- Entry in `packages/mat-extended/project.json` (if applicable)

## Breaking changes

Since `v0.x.x`, breaking changes are allowed in minor versions per the versioning rule in `AGENTS.md` §16. Document them in `CHANGELOG.md` under a **Breaking Changes** section.