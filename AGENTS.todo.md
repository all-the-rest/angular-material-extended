# AGENTS.todo.md – Ausgearbeiteter Task-Plan

> Status-Symbole:
> `- [ ]` pending · `- [~]` in progress · `- [x]` done · `- [!]` blocked

> **Verifizierungs-Lauf 2026-08-25**: Folgende Tasks wurden gegen den Projekt-Code verifiziert und als abgeschlossen aus dem Plan entfernt:
> RuiAutocomplete entfernt (Verzeichnis, Demo, E2E, Mappings, Routes, Overview, Test-Data) · Multi-Select `<mat-form-field>`-Umbau (Komponente, SCSS, Tests, Demo, READMEs Phase 3, Bugfixes Phase 5, AGENTS.md-Regeln Phase 6) · Impressum & Datenschutz · Date-Input-Overview-Reihenfolge · Dependency-Upgrade 2026-08-23 (alle Versionen in `package.json`, `server.ts` Express-5-Pattern, GH-Actions-Versionen geprüft; Breaking Changes in `CHANGELOG.md` dokumentiert).
>
> **Nachlauf 2026-08-25 (offene Restpunkte erledigt)**:
> - Multi-Select-README aktualisiert (Basic Usage + API-Tabelle zeigen jetzt das composable `<mat-form-field>`-Pattern; entfernte Inputs `label`/`placeholder`/`appearance` raus) ✅
> - `RUI_MULTI_SELECT_DEFAULT_OPTIONS`/`RUI_MULTI_SELECT_DEFAULTS`/`RuiMultiSelectConfig` **entfernt** (siehe Entscheidung unten) ✅
> - `RuiDateAdapter`: `@Injectable()` ergänzt + reproduzierender Test (console.warn-Spy auf DI-Deprecation-Warnung) ✅
> - Tote `autocomplete/src/**`- und `i18n/src/**`-Globs aus `tsconfig.lib.json`, `tsconfig.spec.json` und `vite.config.mts` entfernt; fehlende `breadcrumb`/`multi-select`-Globs in `tsconfig.lib.json` ergänzt ✅
>
> Hinweis: Vor dem nächsten Release `pnpm nx run-many -t lint test build --skip-nx-cache` laufen lassen und auf Build-Warnings prüfen.

---

## Bewusste Entscheidungen (dauerhaft dokumentiert)

- **`@angular/animations`: behalten** — wird via `provideAnimationsAsync()` (`apps/demo/src/app/app.config.ts`) genutzt und als transitive Dependency von `@angular/platform-browser@22.1.3` gezogen. Ist auf `^22.1.3`. Entfernen erst sinnvoll, wenn `provideAnimationsAsync` nicht mehr verwendet wird.
- **`@angular-devkit/build-angular`: behalten** — zwingender Peer-Dependency von `@nx/angular@23.1.1` (`>= 20.0.0 < 23.0.0`). Nicht direkt als Builder importiert (Demo nutzt `@angular/build:application`), aber Peer-Pflicht. Ist auf `22.1.5`.
- **`RUI_MULTI_SELECT_DEFAULT_OPTIONS`: entfernt statt wieder angebunden** (Entscheidung 2026-08-25) — Der Token wurde seit dem composable `<mat-form-field>`-Refactor von der Komponente nicht mehr konsumiert und enthielt noch die obsoleten Optionen `placeholder`/`appearance` (Regel 9.1: Appearance/Label steuert der Consumer über das Form-Field). Die verbleibenden Inputs (`options`, `labelKey`, `sortable`, `compareWith`) sind Instanz-Fragen ohne sinnvollen globalen Default-Bedarf; eine Wiederanbindung würde öffentliche API-Fläche ohne realen Nutzen schaffen. Breaking Change ist in `CHANGELOG.md` ([Unreleased] → Removed) dokumentiert.

## Blockiert

- [!] **typescript 6 → 7**: blockiert durch Angular 22 / Nx 23 — verifiziert: `@angular/compiler-cli@22.1.3` und `ng-packagr@22.1.1` erzwingen `typescript >=6.0 <6.1` (installiert: 6.0.3). Upgrade erst nach Angular 23 / Nx-Version mit TS7-Support durchführen.

## Follow-ups

- [ ] **Demo-SSR-Prerender: NG0203 im Build-Log** — `pnpm nx build demo` loggt wiederholt `uncaughtException Error: NG0203` (inject() außerhalb Injection-Context, Stack: `get ngControl` → `get errorState` aus MatFormFieldControl-Chunks), Build läuft trotzdem grün durch (46 Routen). Verifiziert am 2026-08-25: auch ohne lokale Änderungen vorhanden (pre-existing, nicht durch Multi-Select-/DateAdapter-Änderungen verursacht). Ursache klären und beheben (vermutlich Effect/Signal-Zugriff auf `errorState` während SSR auf einer Demo-Seite).

