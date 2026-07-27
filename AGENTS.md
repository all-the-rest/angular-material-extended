# AGENTS.md – Regeln für "Angular Material Extended"

> Verbindliches Regelwerk für ALLE Agents (KI & Humans), die an diesem Repository arbeiten. MUSS vor jeder Arbeit gelesen werden.

## 0. TL;DR

- Plan in [`AGENTS.todo.md`](./AGENTS.todo.md) FÜHREN – nichts ohne Task-Eintrag bauen.
- Angular v22, **Standalone + Signals + Zoneless**.
- **pnpm** ist der einzige Package Manager.
- **KEIN Inline-CSS** – immer externe `.scss` via `styleUrl`.
- Selector-Prefix: **`rui-`** (für immer).
- Keine Commits/Pushes ohne explizite Anweisung.

---

## 1. Plan-Pflicht

- BEVOR eine neue Phase, Komponente oder Teilaufgabe begonnen wird, MUSS der entsprechende Task in [`AGENTS.todo.md`](./AGENTS.todo.md) als Checkbox (`- [ ]`) existieren.
- Vor Beginn: auf `- [~]` (in progress) setzen.
- Nach Fertigstellung: auf `- [x]` (done) setzen.
- Blockiert: `- [!]` mit Begründung.
- Neue Erkenntnisse/Follow-ups werden als Sub-Tasks ergänzt, nicht "im Kopf" behalten.

## 2. Projekt-Identität

|                 |                                                        |
| --------------- | ------------------------------------------------------ |
| Display-Name    | Angular Material Extended                              |
| npm-Package     | `@all-the.rest/mat-extended` (+ Secondary Entrypoints) |
| Selector-Prefix | `rui-` (z.B. `<rui-cropper>`)                          |
| GitHub Repo     | `reisi007/angular-material-extended`                   |
| Lizenz          | MIT                                                    |
| Package Manager | **pnpm** (ausschließlich)                              |

> **Unofficial-Disclaimer**: Dieses Projekt ist eine Community-Erweiterung und NICHT offiziell mit Google oder dem Angular-Team affiliiert. Die Disclaim-Formulierung MUSS in jeder README (Top-Level + Secondary Entrypoints) erhalten bleiben. "Angular" und "Material" sind Marken von Google LLC.

## 3. Tooling & Versions

|                        |                                                    |
| ---------------------- | -------------------------------------------------- |
| Node                   | `>=22` (lokal v26)                                 |
| Package Manager        | **pnpm** (`engines.pnpm` in `package.json` setzen) |
| Angular                | v22 (oder neuestes stable)                         |
| Angular Material + CDK | v22 (M3 Theming)                                   |
| Monorepo               | Nx                                                 |
| Test-Runner            | Vitest (`vitest-angular` executor)                 |

- **KEINE** `npm install` / `yarn`-Befehle – IMMER `pnpm install` / `pnpm add`.
- Lockfile `pnpm-lock.yaml` MUSS committed werden.
- Beim Initialisieren des Nx-Workspaces: `--pnpm` Flag setzen.

## 4. Code-Style (Angular v22)

- **STANDALONE COMPONENTS ONLY** – keine NgModules für Komponenten/Directives/Pipes.
- **Signals first**: `input()`, `output()`, `model()`, `computed()`, `signal()`, `effect()`.
- **KEINE** Decorator-Inputs (`@Input()` / `@Output()`).
- **KEINE** `EventEmitter` für neue APIs – `output()` nutzen.
- **Control Flow**: `@if`, `@for`, `@switch` im Template – KEINE structural directives.
- **Zoneless**: KEINE `setTimeout`/`zone.run`-Hacks für Change Detection. Signales handles everything.
- **strict TS**: `strict: true`, `noUncheckedIndexedAccess` bevorzugt, keine `any` ohne Kommentar-Begründung.
- **Change Detection**: Default-Strategie (v22 optimiert per-Component via Signals).

## 5. Styling-Regeln (Library vs. Demo)

Es gelten **unterschiedliche** Regeln für Library-Komponenten und die Demo-App:

### Library-Komponenten (eigenständig, pure CSS)

Komponenten-Styling ist **Teil der publizierten Library** – jeder Consumer erhält fertiges CSS ohne Tailwind-Zwang.

- **Komponenteneigene SCSS via `styleUrl`**: Jede Komponente bekommt eine co-located `.component.scss` Datei, referenziert über `styleUrl`. Kein Inline-`styles: [...]` Array. Kein Inline-`<style>` in Templates.
- **Semantische Klassennamen**: Verwendung von aussagekräftigen CSS-Klassen (z.B. `.rui-toast`, `.rui-toast__message`, `.rui-toast__action`). Die `rui-`-Prefixierung reduziert Kollisionsrisiko.
- **Keine Tailwind-Utilities in Library-Templates**: Library-Komponenten verwenden **keine** Tailwind-Klassen (`flex`, `gap-*`, `p-*`, etc.) mehr. Das gesamte Styling erfolgt über die component.scss.
- **M3-Tokens konsequent**: Alle Farben, Abstände, Schriften über CSS-Variablen (`var(--mat-sys-*)`). Keine hardcoded Hex-Farben oder absolute Pixel-Werte.
- **ViewEncapsulation**: Standard `Emulated` (Angular v22 default). Kein `::ng-deep` oder ViewEncapsulation.None in Komponenten.
- **CSS-Architektur**: Für einfache Layout-Aufgaben CSS-Features wie Flexbox/Grid/CSS-Custom-Properties direkt nutzen – kein Sass-Framework nötig. Animationen (`@keyframes`) lokal in der component.scss definieren.
- **Library-Build**: Enthält keine Tailwind-Abhängigkeit. Die Styles werden via `@angular/build` (ng-packagr) automatisch in die FESM-Bundles eingebettet und sind bei Import der Komponente verfügbar.

### Demo-App (Tailwind erlaubt)

- **Tailwind CSS v4** ist der Styling-Ansatz für die Demo-App (PostCSS via `@tailwindcss/postcss`).
- Tailwind-Utilities im Template der Demo-Seiten erlaubt (in `.ts` inline templates).
- M3-Tokens via Tailwind-Arbitrary-Values (`bg-[var(--mat-sys-surface)]`, `text-[var(--mat-sys-on-surface)]`).
- Demo-Tailwind-`content` scannt **ausschließlich** `apps/demo/src/` – die Library wird nicht mehr gescannt (Library hat eigenes CSS).
- Keine Abhängigkeit der Demo-App zum Library-Styling – die Library-Styles kommen aus dem Library-Build.

## 6. Verbot von eslint-disable-Kommentaren

- **KEINE** `eslint-disable`-, `eslint-disable-next-line`- oder `eslint-disable-line`-Kommentare im Code.
- **KEINE** `// @ts-ignore` oder `// @ts-expect-error` Kommentare.
- Pre-existing Lint-Fehler MÜSSEN vor dem Commit behoben werden, nicht unterdrückt.
- Ausnahme: `eslint-disable` in Konfigurationsdateien (`.eslintrc.json`, `eslint.config.js`) ist erlaubt.

## 7. Definition of Done (DoD)

Ein Feature gilt NUR als abgeschlossen, wenn ALLE folgenden Kriterien erfüllt sind:

| Kriterium            | Beschreibung                                                                   |
| -------------------- | ------------------------------------------------------------------------------ |
| Implementierung      | Code vollständig inkl. aller Inputs/Outputs/Signals                            |
| Unit-Tests           | ≥80% Coverage (Statements + Branches + Functions)                              |
| E2E-Tests            | Playwright-Tests mit mobile Chrome + Desktop Chrome                            |
| CI-Pipeline          | `pnpm nx test` + `pnpm nx lint` + Playwright E2E laufen grün in GitHub Actions |
| Barrierefreiheit     | Keyboard-Navigation, ARIA-Labels, Focus-Management                             |
| Demo-Seite           | Feature wird in der Demo-App demonstriert                                      |
| Keine eslint-disable | Alle Lint-Regeln werden eingehalten, keine Unterdrückung                       |

> **Pipeline-Regel**: Ein Feature ist erst dann `[x]`, wenn die GitHub Action grün durchläuft.

## 9. Changelog.md (Release Notes)

- **Pflicht**: Jede neue Feature-Änderung, jeder Bugfix und jeder Breaking Change MUSS vor dem Release in `CHANGELOG.md` eingetragen werden.
- **Format**: Keep a Changelog (`https://keepachangelog.com/en/1.0.0/`) mit SemVer (Section `## [x.y.z] – YYYY-MM-DD`).
- **Kategorien**: Einträge werden unter den Sektionen `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed` oder `Security` einsortiert.
- **Unreleased**: Neue, noch nicht veröffentlichte Änderungen gehören unter die `## [Unreleased]`-Sektion, **nicht** direkt in eine versionierte Sektion.
- **Beim Release**: Der `release.yml`-Workflow extrahiert den `[Unreleased]`-Inhalt automatisch für die GitHub Release-Notes. Nach dem Tagging wird der `[Unreleased]`-Block in die entsprechende Version verschoben.
- **Einträge**: Jede Änderung als eigenen Bullet-Punkt mit konsequenter Beschreibung. Keine leeren Changelog-Einträge ("nichts geändert") – wenn sich nichts relevantes geändert hat, keine Version bumpen.
- **Commit-Referenz**: Wo sinnvoll, PR- oder Commit-Hash in Klammern anhängen (z.B. `- Fix cropper rotation (#42)`).

## 10. Forms-Integration

Jede form-fähige Komponente MUSS beides unterstützen:

1. **Reactive Forms** via `ControlValueAccessor` (Basis-Helper in `libs/mat-extended/src/lib/common/control-value-accessor.ts`).
2. **Signal-API** via `model()` parallel.

Beispiel-Pattern:

```ts
export class RuiCropper extends RuiValueAccessor<string> implements ControlValueAccessor {
  readonly croppedImage = model<string>(); // parallele Signal-API
}
```

## 7. Theming

- **NIEMALS** hardcoded Farben im TS oder Template.
- Alle Farben über M3-Tokens (`--mat-sys-*`) oder eigene Custom-Tokens aus `libs/mat-extended/src/lib/theme/_tokens.scss`.
- Custom-Farb-Erweiterungen erfolgen über den Token-Layer, NICHT durch Override von Material-Internals.
- Pro Komponente: Sass-Partial `_theming.scss` für komponentenspezifische Mixins.

## 8. SSR (Server-Side Rendering)

- Voll supported – Demo-App und Library müssen SSR-kompatibel sein.
- Browser-APIs (`canvas`, `window`, `document`, `localStorage`, `ResizeObserver`, `IntersectionObserver` etc.) NUR via Guard aus `libs/mat-extended/src/lib/common/platform.ts` (`ensureBrowser()` / `isPlatformBrowser`).
- Overlay/DOM-Manipulation erst nach SSR-Check.

## 11. Tests (STRICT – zentrale Library!)

> **Grundregel**: Kein Feature-Code ohne begleitende Tests. Eine Library zentraler Komponenten wird ohne Testabdeckung nicht committed.

- **Test-Runner**: Vitest (`vitest-angular` executor via `@angular/build:unit-test`).
- JEDE öffentliche Methode, Komponente, Directive, Pipe oder Service MUSS mindestens einen Unit-Test haben (`.spec.ts` neben der Source-Datei).
- **Coverage-Pflicht**: Neue Dateien müssen >= 80% Code-Coverage erreichen (Statements + Branches + Functions).
- A11y-Tests (Keyboard-Navigation, ARIA, Focus-Management) sind **verpflichtend** für alle interaktiven Komponenten.
- **Keine Ausnahmen**: Auch scheinbar "triviale" Funktionen (Getters, Helper) bekommen Tests.
- VOR jedem Commit: `pnpm nx run-many -t test` MUSS grün sein.
- Sub-Agents, die Code erstellen, MUSSEN immer auch die dazugehörigen Tests erstellen. Ohne Tests wird kein Code akzeptiert.
- **Bug-Fix-Regel**: Für JEDEN gefixten Bug MUSS ein spezifischer, reproduzierender Test geschrieben werden, der den Bug vor dem Fix nachweist und nach dem Fix grün wird. Kein Bug-Fix ohne Regression-Test.

## 12. Accessibility (A11y)

- Alle interaktiven Elemente müssen per Tastatur bedienbar sein.
- ARIA-Rollen und -Labels wo semantisch sinnvoll (nicht blind drauflos).
- Focus-Management bei Overlays/Dialogs (CDK `FocusTrap` / `LiveAnnouncer`).
- Kontrast: mindestens WCAG AA.
- Bei Dialogen/Toasts: `aria-live` für dynamische Content-Updates.

## 13. Commits & Branches

- **Conventional Commits** verpflichtend:
  - `feat:` neue Funktion – Scoped: `feat(cropper): add rotation slider`
  - `fix:` Bugfix
  - `docs:` Doku (inkl. `AGENTS.md` / `AGENTS.todo.md` Updates)
  - `refactor:` Refactoring ohne Verhaltensänderung
  - `test:` Tests
  - `chore:` Build/CI/Tooling
  - `perf:` Performance
  - `BREAKING CHANGE:` im Footer bei Major-Breaking.
- Branch-Naming: `feat/<topic>`, `fix/<topic>`, `chore/<topic>`, `docs/<topic>`.
- **KEINE** Merge-Commits ohne Begründung – Rebase bevorzugt.

## 14. Selector & Naming

- **Selector-Prefix**: `rui-` (z.B. `<rui-cropper>`, `<rui-file-upload>`).
- Dateinamen: `kebab-case.ts` (z.B. `cropper-canvas.ts`).
- Klassennamen: `PascalCase` mit Library-Prefix `Rui` (z.B. `RuiCropper`, `RuiToastService`).
- Public APIs in `index.ts` pro Secondary Entry Point.
- Interfaces/Types: `Rui*` Prefix (z.B. `RuiCropperOptions`).

## 13. Publikation & Library-Struktur

- Jede Komponente = eigener Secondary Entry Point (`ng-package.json` + `package.json`).
- `peerDependencies`: `@angular/core`, `@angular/common`, `@angular/forms`, `@angular/material`, `@angular/cdk` – NIEMALS als runtime-dep gebündelt.
- Vor `pnpm publish`: `pnpm nx build mat-extended` MUSS grün sein.
- Versioning: SemVer. Bei `v0.x.x` sind Breaking Changes in Minor-Versionen erlaubt.

## 14. Demo-App

- JEDE Komponente MUSS eine Demo-Seite in `apps/demo/src/app/pages/` haben.
- JEDE Demo-Seite zeigt die wichtigsten Use-Cases: Forms-Integration, Custom-Theming, A11y, Edge-Cases.
- Demo wird automatisch auf GitHub Pages deployt (auf `main`).

### Demo-Page-Struktur (pro Feature)

Jede Demo-Seite folgt dem Muster `# heading` → `<ui example>` → `<demo code>`:

1. **`<h2 id="...">`** — Heading mit eindeutiger `id`. Wird vom rechten TOC-Sidebar (`app.ts:buildToc`) automatisch erfasst (`document.querySelectorAll('main h2[id]')`) und für Schnell-Navigation per URL-Hash (`#id`) angeboten.
2. **`<ui example>`** — Live-Demo des Features (z.B. `<mat-card>` mit dem tatsächlichen UI).
3. **`<rui-showcase-code [html]="..." [ts]="...">`** — Code-Tabs (HTML | TS) via `ShowcaseCode`-Komponente. Code wird IMMER als Tab dargestellt, nie als raw `<pre ruiCodeHighlight>`.

Jedes Feature bekommt seine eigene Sektion mit Heading + UI + Code — nicht nur ein globales Code-Block am Ende.

### Form-Integration in der Demo-App

Jede Komponente, die in einem Formular verwendet werden kann (d.h. `ControlValueAccessor` implementiert oder eine `model()`-Signal-API bereitstellt), MUSS in der Demo-Seite Beispiele für alle drei Angular-Form-Paradigmen zeigen:

1. **Template-driven Forms** (`ngModel` + `name`)
2. **Reactive Forms** (`FormControl` / `FormGroup` via `formControlName`)
3. **Signal Forms** (`model()` direkt im Template, kein `FormsModule`/`ReactiveFormsModule`)

Jedes der drei Beispiele bekommt eine eigene Sektion mit `<h2 id="...">`, Live-UI und `<rui-showcase-code [html]="..." [ts]="...">` – analog zum Muster in §14.

## 15. CI/CD

- `ci.yml`: Läuft auf PRs und `main` – lint, test, build.
- `release.yml`: Bei semver-Tag → npm publish.
- `deploy-demo.yml`: Auf `main` → build demo → push nach `gh-pages` Branch.

## 16. Agent-Verhalten

- **KEINE** Commits/Pushes ohne explizite Anweisung.
- **KEINE** `pnpm add` von Packages, die nicht im Plan stehen, ohne Rückfrage.
- Bei Unsicherheit: nachfragen statt raten.
- VOR jedem Commit: `pnpm nx lint --fix` + `pnpm nx test` + `pnpm nx build demo` + `pnpm nx e2e demo-e2e` laufen lassen. E2E-Tests lokal via Playwright ausführen (oder isoliert: `pnpm exec playwright test --config=apps/demo-e2e/playwright.config.ts <spec-file>`); erst committen wenn alle grün. Lokaler Demo-Server muss vorher laufen (`pnpm nx serve demo`).
- Lint immer mit `--fix` ausführen, um auto-fixbare Probleme direkt zu beheben.
- Bei Fehlern: IMMER den vollen Output lesen und analysieren, nicht einfach retry.
- Tasks in `AGENTS.todo.md` sofort aktualisieren, nicht erst am Ende.
- Tab-Größe: 2 Spaces (in TS/SCSS/HTML/MD).
- **AI-Tool-Ordner**: `.opencode/`, `.agents/`, `.codex/`, `.claude/` werden NIEMALS committed. Bereits getrackte Dateien mit `git rm --cached` entfernen.

## 17. Parallelisierung & Sub-Agents

Wo sinnvoll möglich, werden Sub-Agents (via `task`-Tool) parallel eingesetzt, um die Bearbeitungszeit zu verkürzen.

### Grundsätze

- **Sequentielles Scaffolding** (Nx-Workspace-Init, Library-Gen, Angular-Material, Secondary Entry Points, Demo-App) läuft AUSNAHMSLOS seriell im Haupt-Agent. Diese Schritte bauen aufeinander auf und Nx-Generators vertragen keine parallelen Instanzen.
- **Parallelisierbare Aufgaben** werden als Sub-Agent gestartet:
  - CI/CD-YAML-Dateien (ci.yml, release.yml, deploy-demo.yml)
  - Konfigurationsdateien mit klarer Vorgabe (ESLint-Prettier-Config, Tailwind-Config)
  - README-Dokumentation für Secondary Entry Points
  - Skelleton-Tests
- **Implementierung + Validierung laufen im selben Sub-Agent**: Jeder Sub-Agent, der Feature-Code schreibt, MUSS auch die dazugehörigen Tests und Demo-Dokumentation erstellen. Es gibt keine getrennten "Implementation"- und "Test"-Sub-Agents für dieselbe Komponente.
- **Nicht parallelisierbar**: Alles was Nx-Generators oder Direct-Git-Operationen im selben Workspace betrifft.

### Ablauf bei paralleler Arbeit

1. Jeder Sub-Agent bekommt eine **eigenständige, vollständig spezifizierte Task-Beschreibung** inkl. genauer Dateipfade und Inhaltsvorgaben.
2. Sub-Agents arbeiten **ausschließlich Dateibasiert** (Write/Edit/Read-Tools), nie mit Nx-Befehlen.
3. Ergebnisse von Sub-Agents werden vom Haupt-Agent vor dem Commit geprüft.
4. Bei Konflikten zwischen parallelen Tasks gewinnt der Haupt-Agent.
5. Alle Tasks müssen in `AGENTS.todo.md` nachgetragen werden.

### Mapping: Phase → Parallelisierungsgrad

| Phase                   | Sequentiell (Haupt)                                                        | Parallel (Sub-Agent)                                                                                         |
| ----------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Phase 1 (Workspace)     | Nx-Init, Lib-Gen, Demo, Angular Material, Secondary Entry Points, Tailwind | CI-Skeleton (ci.yml)                                                                                         |
| Phase 2 (Theming/Infra) | CVA-Helper, SSR-Guard, A11y-Helper, Theme-Tokens, Mixins                   | -                                                                                                            |
| Phase 3 (Cropper)       | Grundgerüst (Types, Config)                                                | Canvas-Engine + Component + Interaction + A11y + Tests + Demo + README (pro Modul ein Sub-Agent)             |
| Phase 4 (File Upload)   | Grundgerüst (Types, Config)                                                | Component + Drag/Drop + Validation + Upload + Tests + Demo + README (pro Feature-Gruppe ein Sub-Agent)       |
| Phase 5 (Toast)         | Service + Overlay + Tests + README in einem Sub-Agent                      | -                                                                                                            |
| Phase 6 (Data Table)    | Grundgerüst (Types, Config)                                                | Component + Sort + Paginator + Filter + Selection + Tests + Demo + README (pro Feature-Gruppe ein Sub-Agent) |
| Phase 7 (Release)       | Release-YAML, Deploy-YAML                                                  | -                                                                                                            |

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
