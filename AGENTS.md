# AGENTS.md – Regeln für "Angular Material Extended"

> Verbindliches Regelwerk für ALLE Agents (KI & Humans), die an diesem Repository arbeiten. MUSS vor jeder Arbeit gelesen werden.

## 0. TL;DR

- Plan in [`AGENTS.todo.md`](./AGENTS.todo.md) FÜHREN – nichts ohne Task-Eintrag bauen.
- Angular v22, **Standalone + Signals + Zoneless**, **pnpm** ausschließlich.
- **KEIN Inline-CSS** – immer externe `.scss` via `styleUrl`. Selector-Prefix: **`rui-`**.
- Keine Commits/Pushes ohne explizite Anweisung.

---

## 1. Plan-Pflicht

- Vor Beginn einer Aufgabe MUSS der Task in [`AGENTS.todo.md`](./AGENTS.todo.md) als `- [ ]` existieren, vor Beginn auf `- [~]`, danach auf `- [x]`.
- Neue Erkenntnisse/Follow-ups werden als Sub-Tasks ergänzt.

## 2. Projekt-Identität

|                 |                                                        |
| --------------- | ------------------------------------------------------ |
| Display-Name    | Angular Material Extended                              |
| npm-Package     | `@all-the.rest/mat-extended` (+ Secondary Entrypoints) |
| Selector-Prefix | `rui-` (z.B. `<rui-cropper>`)                          |
| GitHub Repo     | `reisi007/angular-material-extended`                   |
| Lizenz          | MIT                                                    |
| Package Manager | **pnpm** (ausschließlich)                              |

> **Unofficial-Disclaimer**: Community-Erweiterung, NICHT mit Google/Angular-Team affiliiert. Disclaimer MUSS in jeder README erhalten bleiben.

## 3. Tooling & Versions

|                        |                                                    |
| ---------------------- | -------------------------------------------------- |
| Node                   | `>=22` (lokal v26)                                 |
| Package Manager        | **pnpm** (`engines.pnpm` in `package.json` setzen) |
| Angular                | v22 (oder neuestes stable)                         |
| Angular Material + CDK | v22 (M3 Theming)                                   |
| Monorepo               | Nx                                                 |
| Test-Runner            | Vitest (`vitest-angular` executor)                 |

- **KEINE** `npm install` / `yarn` – IMMER `pnpm install` / `pnpm add`. Lockfile `pnpm-lock.yaml` MUSS committed werden.

## 4. Code-Style (Angular v22)

- **STANDALONE COMPONENTS ONLY** – keine NgModules.
- **Signals first**: `input()`, `output()`, `model()`, `computed()`, `signal()`, `effect()`. **KEINE** `@Input()`/`@Output()`, **KEINE** `EventEmitter`.
- **Signal Inputs IMMER mit `()` aufrufen** in Templates (z.B. `disabled()`, `value()`). Fehlende `()` verursachen Angular-Diagnostic NG8109 und MÜSSEN vor Commit behoben werden.
- **Control Flow**: `@if`, `@for`, `@switch` – KEINE structural directives.
- **Zoneless**: KEINE `setTimeout`/`zone.run`-Hacks.
- **strict TS**: `strict: true`, `noUncheckedIndexedAccess`, keine `any` ohne Begründung.

## 5. Styling-Regeln (Library vs. Demo)

### Library-Komponenten (eigenständig, pure CSS)

- **Komponenteneigene SCSS via `styleUrl`**: Kein Inline-`styles`, kein Inline-`<style>` in Templates.
- **Semantische Klassennamen** mit `rui-`-Prefix (z.B. `.rui-toast__message`).
- **Keine Tailwind-Utilities** in Library-Templates.
- **M3-Tokens konsequent**: `var(--mat-sys-*)`, keine hardcoded Farben/Pixel-Werte.
- **ViewEncapsulation**: Standard `Emulated`. Kein `::ng-deep`.

### Demo-App (Tailwind erlaubt)

- **Tailwind CSS v4** (PostCSS via `@tailwindcss/postcss`).
- M3-Tokens via Arbitrary-Values (`bg-[var(--mat-sys-surface)]`).
- Content scannt **ausschließlich** `apps/demo/src/`.

## 6. Verbot von eslint-disable-Kommentaren

- **KEINE** `eslint-disable`-, `eslint-disable-next-line`- oder `eslint-disable-line`-Kommentare.
- **KEINE** `// @ts-ignore` oder `// @ts-expect-error`.
- Pre-existing Lint-Fehler MÜSSEN vor dem Commit behoben werden.

## 7. Definition of Done (DoD)

| Kriterium            | Beschreibung                                                                   |
| -------------------- | ------------------------------------------------------------------------------ |
| Implementierung      | Code vollständig inkl. aller Inputs/Outputs/Signals                            |
| Unit-Tests           | ≥80% Coverage (Statements + Branches + Functions)                              |
| E2E-Tests            | Playwright-Tests mit mobile Chrome + Desktop Chrome                            |
| CI-Pipeline          | `pnpm nx test` + `pnpm nx lint` + Playwright E2E laufen grün in GitHub Actions |
| Barrierefreiheit     | Keyboard-Navigation, ARIA-Labels, Focus-Management                             |
| Demo-Seite           | Feature wird in der Demo-App demonstriert                                      |
| Keine eslint-disable | Alle Lint-Regeln werden eingehalten                                            |

> Ein Feature ist erst dann `[x]`, wenn die GitHub Action grün durchläuft.

## 8. Changelog.md (Release Notes)

- **Pflicht**: Jede Änderung MUSS vor dem Release in `CHANGELOG.md` eingetragen werden.
- **Format**: Keep a Changelog mit SemVer (`## [x.y.z] – YYYY-MM-DD`).
- **Kategorien**: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`.
- **Unreleased**: Neue Änderungen unter `## [Unreleased]`, nicht direkt in versionierte Sektion.
- **Einträge**: Eigener Bullet-Punkt pro Änderung, keine leeren Einträge.

## 9. Forms-Integration

Jede form-fähige Komponente MUSS beides unterstützen:

1. **Reactive Forms** via `ControlValueAccessor` (Helper in `libs/mat-extended/src/lib/common/control-value-accessor.ts`).
2. **Signal-API** via `model()` parallel.

```ts
export class RuiCropper extends RuiValueAccessor<string> implements ControlValueAccessor {
  readonly croppedImage = model<string>(); // parallele Signal-API
}
```

### 9.1 Composable Form Fields – KEIN internes `mat-form-field`

- **Komponenten sind composable, NICHT self-contained.** `mat-form-field` MUSS vom Consumer gekapselt werden.
- **KEINE** `<mat-form-field>` in Library-Komponenten-Templates. Der Consumer entscheidet über Appearance, Label, Hint, Error.
- Komponenten rendern nur das native Input/Select/Textarea und binden auf `matInput`/`matSelect` etc.
- **Showcase-Code** in der Demo MUSS immer `<mat-form-field>` zeigen:

```html
<!-- RICHTIG -->
<mat-form-field appearance="outline">
  <mat-label>Fruits</mat-label>
  <mat-select multiple>
    @for (opt of options(); track opt) {
      <mat-option [value]="opt">{{ opt }}</mat-option>
    }
  </mat-select>
</mat-form-field>

<!-- FALSCH – mat-form-field inside der Komponente -->
<rui-multi-select [options]="fruits" [(values)]="selected" />
```

## 10. Theming

- **NIEMALS** hardcoded Farben. Alle Farben über M3-Tokens (`--mat-sys-*`) oder Custom-Tokens aus `_tokens.scss`.
- Pro Komponente: Sass-Partial `_theming.scss`.

## 11. SSR (Server-Side Rendering)

- Browser-APIs NUR via Guard aus `libs/mat-extended/src/lib/common/platform.ts`.
- Overlay/DOM-Manipulation erst nach SSR-Check.

## 12. Tests (STRICT – zentrale Library!)

> Kein Feature-Code ohne begleitende Tests.

- **Test-Runner**: Vitest (`vitest-angular` executor via `@angular/build:unit-test`).
- JEDE öffentliche Methode/Komponente/Directive/Pipe/Service MUSS einen `.spec.ts`-Test haben.
- **Coverage-Pflicht**: ≥ 80% (Statements + Branches + Functions).
- A11y-Tests (Keyboard, ARIA, Focus) sind **verpflichtend** für interaktive Komponenten.
- VOR jedem Commit: `pnpm nx run-many -t test` MUSS grün sein.
- Sub-Agents MUSSEN immer auch Tests erstellen. Ohne Tests wird kein Code akzeptiert.
- **Bug-Fix-Regel**: Für JEDEN Bug MUSS ein reproduzierender Test geschrieben werden.

## 13. Accessibility (A11y)

- Tastatur-bedienbar, ARIA-Rollen/Labels wo sinnvoll, Focus-Management bei Overlays, mindestens WCAG AA.
- Bei Dialogen/Toasts: `aria-live` für dynamische Content-Updates.

## 14. Commits & Branches

- **Conventional Commits**: `feat(scope):`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`, `perf:`, `BREAKING CHANGE:` im Footer.
- Branch-Naming: `feat/<topic>`, `fix/<topic>`, `chore/<topic>`, `docs/<topic>`.
- **KEINE** Merge-Commits ohne Begründung – Rebease bevorzugt.

## 15. Selector & Naming

- **Selector-Prefix**: `rui-`. Dateinamen: `kebab-case.ts`. Klassen: `PascalCase` mit `Rui`-Prefix.
- Public APIs in `index.ts` pro Secondary Entry Point. Interfaces/Types: `Rui*`-Prefix.

## 16. Publikation & Library-Struktur

- Jede Komponente = eigener Secondary Entry Point (`ng-package.json` + `package.json`).
- `peerDependencies`: `@angular/core`, `@angular/common`, `@angular/forms`, `@angular/material` – NIEMALS als runtime-dep.
- Vor `pnpm publish`: `pnpm nx build mat-extended` MUSS grün sein.
- Versioning: SemVer. Bei `v0.x.x` sind Breaking Changes in Minor-Versionen erlaubt.

## 17. Demo-App

- JEDE Komponente MUSS eine Demo-Seite in `apps/demo/src/app/pages/` haben.
- Demo-Seiten-Struktur: `# heading` → `<ui example>` → `<rui-showcase-code [html]="..." [ts]="...">`.
- Form-Integration: Jede form-fähige Komponente MUSS alle 3 Paradigmen zeigen (Template-driven, Reactive, Signal).
- **Form-Components in Demo**: Immer in `<mat-form-field>` wrappen (composable Pattern, siehe 9.1).

## 18. CI/CD

- `ci.yml`: PRs + `main` → lint, test, build.
- `release.yml`: semver-Tag → npm publish.
- `deploy-demo.yml`: `main` → build demo → push nach `gh-pages`.

## 19. Agent-Verhalten

- **KEINE** Commits/Pushes ohne explizite Anweisung.
- **KEINE** `pnpm add` ohne Rückfrage. Bei Unsicherheit: nachfragen.
- VOR jedem Commit: `pnpm nx lint --fix` + `pnpm nx test` + `pnpm nx build demo` + `pnpm nx e2e demo-e2e`. Erst committen wenn alle grün.
- Lint IMMER mit `--fix`. Bei Fehlern: vollen Output lesen, nicht retry.
- **Build-Warnings (NG8109, Angular Compiler) NIE ignorieren** — vor jedem Commit `pnpm nx run-many -t build test --skip-nx-cache` auf Warnungen prüfen und beheben.
- Tasks in `AGENTS.todo.md` sofort aktualisieren. Tab-Größe: 2 Spaces.
- **AI-Tool-Ordner** (`.opencode/`, `.agents/`, etc.) werden NIEMALS committed.

### 19.1 Build-Agent-Delegation

- **Build-Agent steuert und delegiert**: Er schreibt ausschließlich `AGENTS.md` und `AGENTS.todo.md`. Alles andere wird via `task`-Tool an Sub-Agents delegiert.
- **Delegation MUSS verifiziert werden**: Sub-Agent-Ergebnisse werden nie blind übernommen.
- **Sub-Agents sind eigenständig**: Vollständige Spezifikation inkl. Dateipfade, Code-Convention, Test-Anforderung.
- **Keine Nx-Befehle durch Sub-Agents**: Nur Dateibasiert (Write/Edit/Read). Nx-Befehle laufen im Build-Agent.

## 20. Parallelisierung & Sub-Agents

- **Sequentielles Scaffolding** läuft seriell im Haupt-Agent.
- **Parallelisierbar**: CI/CD-YAMLs, Konfigs, READMEs, Skeleton-Tests.
- **Implementierung + Validierung** im selben Sub-Agent (keine getrennten Sub-Agents für Code + Test).
- Sub-Agents arbeiten dateibasiert, Ergebnisse werden vom Haupt-Agent geprüft.

<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

## General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->
