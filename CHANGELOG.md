# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.4] – 2026-07-29

### Removed

- **BREAKING**: `RuiAutocomplete` component removed (covered by native Angular Material)
- **BREAKING**: `RuiMultiSelect` — `label` and `appearance` inputs removed; `mat-form-field` must be wrapped by consumer

### Changed

- Multi-Select: composable form field pattern (consumer wraps `<mat-form-field>`)
- Optimize CI pipeline with parallel jobs, artifact reuse, and 4 workers
- Merge deploy-demo into CI workflow; deploy only after tests pass
- Add `workflow_dispatch` trigger to CI workflow
- Demo pages refactored to drop-in replacement pattern, Tailwind removed
- `ControlValueAccessor` and `ArrayValueAccessor`: improved typings and test coverage
- Bump postcss from 8.5.13 to 8.5.23 (reverted bump, then re-applied)
- Bump version to `0.1.4`

### Fixed

- File upload dropzone: missing `()` in signal calls (`disabled` → `disabled()`)
- File upload demo: `toggleControl()` method for enable/disable toggle
- E2E file-upload: improved file chooser wait reliability
- E2E tests: mat-option clicks with `force:true` to avoid pointer interception

## [0.1.3] – 2026-07-25

### Added

- `RuiOnThisPage` component for displaying the table of contents on a page
- Breadcrumb alignment fix and TOC first-heading bug fix

## [0.1.2] – 2026-07-24

### Added

- Image panning support in the `RuiCropper` component
- Improved rotation and constraint behavior in the cropper

### Changed

- Split demo deployment into a separate GitHub Actions workflow

## [0.1.1] – 2026-07-24

### Added

- `Autocomplete` component
- Accessibility improvements across components
- SCSS migration for component styling

### Fixed

- Stabilized E2E tests across all components
- Handle directory requests and catch errors in SPA server
- Correct path in `serve-spa.mjs` (3 levels up from `src` to root)
- Correct webServer path relative to `demo-e2e` directory
- `dist/` prefix in publish and deploy paths
- `dist/` prefix preserved in upload-artifact path

### Changed

- Simplify CI E2E to 2 workers without sharding
- Parallelize E2E tests with Playwright sharding in CI
- Update dependencies (express, rxjs, eslint, playwright, vitest, etc.)
- Update homepage URL to `mat-extended.all-the.rest`

### Fixed

- Deploy demo to `mat-extended.all-the.rest`, add GitHub link in header
- Update AGENTS.md with E2E pre-commit rule and AI tool folder policy
- Cleanup AGENTS.todo.md – restructure tables, remove completed TODOs
- Add nx project names to secondary entry points
- Avoid Nx graph resolution in Playwright webServer
- Install Playwright browsers before E2E tests
- Remove registry-url from publish step to enable OIDC trusted publishing
- Remove unused peerDependencies and improve README
- Update lockfile after removing unused peerDependencies
- Upgrade npm and use `--provenance` for OIDC trusted publishing
- Bump Node.js to 26 for OIDC Trusted Publishing support
- Security overrides and dependency updates

## [0.1.0] – 2026-07-22

### Added

- Initial release with library foundation and core components
- `RuiCropper` component with image cropping functionality
- `RuiFileUpload` component with drag-and-drop support
- `RuiDataGrid` component with sorting, pagination, filtering, and selection
- `RuiDialog` component with overlay and focus management
- `RuiToast` service with overlay notifications
- `RuiMenu`, `RuiMultiSelect`, `RuiBreadcrumb` components
- `RuiAutocomplete` component (see 0.1.1)
- Complete showcase and catalog page in demo app
- Component refactoring and cleanup
- E2E specs with Playwright for desktop and mobile
- CI/CD pipeline with GitHub Actions (build, test, lint, deploy)
- OIDC Trusted Publishing for npm publish
- `ControlValueAccessor` base helper for form integration
- SSR guard and platform utilities
- M3 theming tokens and component-level theming mixins
- Tailwind CSS v4 styling for demo app
- Secondary entry points for all library packages
- Nx monorepo workspace setup
- AGENTS.md with project rules and roadmap
- README with setup instructions and contributing guidelines