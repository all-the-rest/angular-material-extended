# AGENTS.todo.md – Ausgearbeiteter Task-Plan

> Status-Symbole:
> `- [ ]` pending · `- [~]` in progress · `- [x]` done · `- [!]` blocked

---

## Task: RuiAutocomplete entfernt

- [x] `packages/mat-extended/autocomplete/` — gesamtes Verzeichnis gelöscht
- [x] `apps/demo/src/app/pages/autocomplete-demo/` — Demo-Seite gelöscht
- [x] `apps/demo-e2e/src/specs/autocomplete.spec.ts` — E2E-Tests gelöscht
- [x] `tsconfig.base.json` — Path-Mapping `@all-the.rest/mat-extended/autocomplete` entfernt
- [x] `packages/mat-extended/package.json` — Keyword + Description bereinigt
- [x] `apps/demo/src/app/app.routes.ts` — `/autocomplete` Route entfernt
- [x] `apps/demo/src/app/overview.ts` — Autocomplete-Eintrag entfernt
- [x] `apps/demo-e2e/src/fixtures/test-data.ts` — autocomplete URL entfernt

**Begründung**: Kein Anwendungsfall, der nicht bereits durch原生 Angular Material Autocomplete abgedeckt wird.

---

## Task: Multi-Select — `<mat-form-field>` entfernen (Breaking Change)

**Kontext**: `<rui-multi-select>` enthält `<mat-form-field>` in seinem Template. Ziel: User schreibt `<mat-form-field>` selbst, die RUI-Komponente rendert nur das innere Element.

### Phase 1: Multi-Select — Drop-in Replacement

- [x] `packages/mat-extended/multi-select/src/multi-select.html` — `<mat-form-field>` und `<mat-label>` entfernt; nur `<mat-select>` bleibt
- [x] `packages/mat-extended/multi-select/src/multi-select.ts` — Inputs `label`, `appearance` entfernt; `MatFormFieldModule` entfernt
- [x] `packages/mat-extended/multi-select/src/multi-select.component.scss` — Auf `:host { display: block }` gekürzt
- [x] `packages/mat-extended/multi-select/src/multi-select.spec.ts` — Tests angepasst
- [x] `packages/mat-extended/multi-select/README.md` — Neue Usage, API-Tabelle aktualisiert

### Phase 2: Demo-Seite aktualisieren

- [x] `apps/demo/src/app/pages/multi-select-demo/multi-select-demo.ts` — Alle 3 Examples mit neuem Pattern

### Phase 3: READMEs korrigieren

- [x] `packages/mat-extended/breadcrumb/README.md` — Installations-Befehl korrigiert
- [x] `packages/mat-extended/README.md` — Spalte "Package" → "Entry Point"

### Phase 4: Validierung

- [x] ESLint auf allen geänderten Dateien geprüft — keine Fehler
- [x] `pnpm nx lint --fix` — alle 13 Projekte grün
- [x] `pnpm nx run-many -t test` — 120 Tests, 7 Test-Files passed
- [x] `pnpm nx build mat-extended` — alle 10 Entry Points gebaut
- [x] `pnpm nx build demo` — Demo gebaut, 45 static routes prerendered

### Phase 5: Bugfixes (nach ersten Lint/Tests)

- [x] `file-upload-dropzone.component.ts` — `disabled` → `disabled()` (Signal-Call) in Template und onClick
- [x] `file-upload-demo.ts` — `toggleControl()` Methode hinzugefügt, Button korrigiert
- [x] `file-upload.spec.ts` (E2E) — File Chooser Wait verbessert

### Phase 6: AGENTS.md-Regel ergänzt

- [x] Regel: Signal Inputs IMMER mit `()` aufrufen (NG8109)
- [x] Regel: Build-Warnings (NG8109, Angular Compiler) nie ignorieren

---

**Breaking Changes**:
- `RuiAutocomplete` komplett entfernt
- `RuiMultiSelect`: Inputs `label`, `appearance` entfernt

---

## Task: Impressum & Datenschutz in Demo-App

- [x] `apps/demo/src/app/pages/impressum/impressum.ts` — Impressum-Seite mit Kontaktdaten
- [x] `apps/demo/src/app/app.routes.ts` — `/impressum` Route ergänzt
- [x] `apps/demo/src/app/app.html` — Footer-Links (Impressum, Datenschutz)

---

## Task: Date Input — Keine eigene Subcategory, Reihenfolge angleichen

- [x] `apps/demo/src/app/overview.ts` — "Date & Time" Section entfernen, Date Input in `componentCards` einfügen
- [x] Reihenfolge in `overview.ts` und `app.ts` (Sidebar) abgleichen

**Begründung**: Date Input ist ein Component wie alle anderen und sollte nicht als eigene Kategorie分离 werden.

---

## Task: Dependency-Upgrade 2026-08-23 (chore/deps-2026-08-23)

- [x] pnpm `packageManager` `11.10.0` → `11.23.0`; `engines.pnpm` `>=9` → `>=11`
- [x] Angular `22.0` → `22.1` (alle `@angular/*`, `@angular-devkit/build-angular`, `@angular/material`, `@angular/cdk`)
- [x] Nx `23.1.0` → `23.1.1` (alle `@nx/*`)
- [x] ESLint `9` → `10` (+ `@eslint/js` `9` → `10`)
- [x] Major: `@types/node` `24` → `26`, `@types/supertest` `6` → `7`, `jsonc-eslint-parser` `2` → `3`, `vite-tsconfig-paths` `5` → `6`, `eslint-plugin-playwright` `1` → `2`, `jsdom` `22` → `30`
- [x] Major: `express` `4` → `5` (+ `@types/express` `4` → `5`); Demo SSR `server.ts` Express-5-kompatibel gemacht (Catch-All `app.use('/**', …)` → `app.use((req, res, next) => …)`)
- [x] `@oxc-project/runtime` `0.115` → `0.146` (0.x-Minor als Major behandelt, vorsichtig geprüft — Tests grün)
- [x] Vitest `4.1.10` → `4.1.11`, Vite `8.0` → `8.2`, `@analogjs/*` `2.6` → `2.7`, `ng-packagr` `22.0` → `22.1`, `@swc/*`, `typescript-eslint` `8.65` → `8.67`, `material-symbols`, etc.
- [x] GH Actions `ci.yml`/`release.yml` bereits auf v7 (`actions/checkout@v7`, `actions/setup-node@v7`, `pnpm/action-setup@v6`, `actions/upload-artifact@v7`, `actions/download-artifact@v8`) — keine Änderung nötig

### Deprecated Packages

- [~] `@angular/animations`: **behalten** — wird weiterhin via `provideAnimationsAsync()` (`apps/demo/src/app/app.config.ts`) genutzt und als transitive Dependency von `@angular/platform-browser@22.1.3` gezogen. Auf `^22.1.3` angehoben. Entfernen erst sinnvoll, wenn `provideAnimationsAsync` nicht mehr verwendet wird.
- [~] `@angular-devkit/build-angular`: **behalten** — ist zwingender Peer-Dependency von `@nx/angular@23.1.1` (`>= 20.0.0 < 23.0.0`). Nicht direkt als Builder importiert (Demo nutzt `@angular/build:application`), aber Peer-Pflicht. Auf `22.1.5` angehoben.

### Blockiert

- [!] **typescript 6 → 7**: blockiert durch Angular 22 / Nx 23 (erzwingen `typescript >=6.0 <6.1`). Upgrade erst nach Angular 23 / Nx-Version mit TS7-Support durchführen.
- [~] **`RuiDateAdapter`**: DI-Deprecation-Warnung ("add @Injectable()") — wird erst in künftiger Angular-Version ein Error; nicht durch dieses Upgrade verursacht, daher hier nicht behoben.
