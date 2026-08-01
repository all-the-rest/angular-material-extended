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
