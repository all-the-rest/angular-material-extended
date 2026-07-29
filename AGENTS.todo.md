# AGENTS.todo.md – Ausgearbeiteter Task-Plan

> Status-Symbole:
> `- [ ]` pending · `- [~]` in progress · `- [x]` done · `- [!]` blocked

---

## Task: Autocomplete + Multi-Select — `<mat-form-field>` entfernen (Breaking Change)

**Kontext**: `<rui-autocomplete>` und `<rui-multi-select>` enthalten `<mat-form-field>` in ihrem Template. Sie sind damit KEINE Drop-in-Replacements für die originalen Material-Komponenten. Ziel: User schreibt `<mat-form-field>` selbst, die RUI-Komponente rendert nur das innere Element.

### Phase 1: Autocomplete — Drop-in Replacement

- [x] `packages/mat-extended/autocomplete/src/autocomplete.html` — `<mat-form-field>`, `<mat-label>`, `<input matInput>` entfernt; nur `<mat-autocomplete>` bleibt
- [x] `packages/mat-extended/autocomplete/src/autocomplete.ts` — Inputs `label`, `placeholder`, `appearance`, `disabled` entfernt; `MatFormFieldModule`/`MatInputModule` entfernt; `RuiValueAccessor`-Vererbung entfernt
- [x] `packages/mat-extended/autocomplete/src/autocomplete.component.scss` — Auf `:host { display: block }` gekürzt
- [x] `packages/mat-extended/autocomplete/src/autocomplete.spec.ts` — Tests für neue Struktur angepasst
- [x] `packages/mat-extended/autocomplete/README.md` — Neue Usage, API-Tabelle aktualisiert

### Phase 2: Multi-Select — Drop-in Replacement

- [x] `packages/mat-extended/multi-select/src/multi-select.html` — `<mat-form-field>` und `<mat-label>` entfernt; nur `<mat-select>` bleibt
- [x] `packages/mat-extended/multi-select/src/multi-select.ts` — Inputs `label`, `appearance` entfernt; `MatFormFieldModule` entfernt
- [x] `packages/mat-extended/multi-select/src/multi-select.component.scss` — Auf `:host { display: block }` gekürzt
- [x] `packages/mat-extended/multi-select/src/multi-select.spec.ts` — Tests angepasst
- [x] `packages/mat-extended/multi-select/README.md` — Neue Usage, API-Tabelle aktualisiert

### Phase 3: Demo-Seiten aktualisieren

- [x] `apps/demo/src/app/pages/autocomplete-demo/autocomplete-demo.ts` — Alle 3 Examples mit neuem Pattern
- [x] `apps/demo/src/app/pages/multi-select-demo/multi-select-demo.ts` — Alle 3 Examples mit neuem Pattern

### Phase 4: READMEs korrigieren

- [x] `packages/mat-extended/breadcrumb/README.md` — Installations-Befehl korrigiert
- [x] `packages/mat-extended/README.md` — Spalte "Package" → "Entry Point"

### Phase 5: Validierung

- [x] ESLint auf allen geänderten Dateien geprüft — keine Fehler
- [ ] `pnpm nx lint --fix` — blockiert durch pre-existing `postcss-safe-parser`-Problem
- [ ] `pnpm nx run-many -t test` — blockiert durch dasselbe Problem
- [ ] `pnpm nx build mat-extended` — blockiert durch dasselbe Problem

---

**Breaking Changes**:
- `RuiAutocomplete`: Inputs `label`, `placeholder`, `appearance`, `disabled` entfernt; kein CVA mehr (User verwaltet Form-Control auf eigenem `<input>`)
- `RuiMultiSelect`: Inputs `label`, `appearance` entfernt
