# UI-Review-Befunde — angular-material-extended (Demo-App)

Capture: `pnpm test:screenshots` · 45 Routen × Desktop/Mobile · FullPage + Section-Captures (innerer `<main>`-Scroller).
Analyse: 12 Vision-Batches (14 Hauptseiten + 32 `/material/*`-Seiten, Desktop+Mobile).

## False Positive (nicht fixen)

**„Fester Footer überlappt/beschneidet Inhalt"** — auf nahezu jeder Seite als High gemeldet.
Verifiziert: `footer.top == main.bottom` (887 px bei 1920×950); der Footer ist ein normaler
Flex-Geschwister **unter** `<main class="…overflow-auto">`. Inhalt wird von `main` selbst
an seiner Scroll-Grenze beschnitten (scrollHeight 9764 vs. clientHeight 822) — nie vom Footer
überdeckt. FullPage=Viewport (100vh-Layout) erzeugt den Eindruck von Clipping. **Kein Fix nötig.**

## Echte Befunde

### Shared / systemisch
1. **Code-Panels kappen lange Zeilen rechts** ohne erkennbare Scroll-Affordanz (Mobile akut, Desktop gelegentlich). → Code-Container `overflow-x: auto`, `white-space: pre`; kein `overflow:hidden` am Parent.
2. **Sparse, überbreite Demo-Karten**: Steuerelemente links oben in riesiger leerer Fläche (autocomplete, badge, bottom-sheet, button-toggle, buttons, cards, chips, datepicker, dialog, list, menu, paginator, progress, select-slider, snackbar, timepicker, tooltip u. a.). → Demo-Inhalt auf `max-width` begrenzen oder zentrieren; Code-Panel bleibt volle Breite.
3. **Leerraum unter kurzen Seiten** vor dem Footer (paginator, tabs, timepicker, tree u. a.). → Keine überdimensionierte `min-height` im Scroll-Container.
4. **Disabled-Zustände zu blass** (chips „Deprecated", tabs, selection-controls). → Disabled-Kontrast leicht erhöhen, ohne den Disabled-Eindruck zu verlieren.

### Pro Seite (Desktop/Mobile)
- **mat-sidenav (Mobile, CRITICAL)**: Drawer ist dauerhaft offen, Inhalt schrumpft auf wenige Zeichen/Zeile und ist rechts abgeschnitten → auf Mobile Overlay-Drawer (closed default) + Drawer-Breite begrenzen; `mat-sidenav` (Desktop) Demo unnötig hoch.
- **mat-stepper**: Mobile wird Step-Label „Personal Information" auf „Personal I…" truncatet → kompakte Mobile-Darstellung oder Label-Wrap.
- **mat-table / mat-sort**: Mobile reicht die Tabelle über den Viewport ohne Scroll-Affordanz → `overflow-x-auto`-Wrapper, angemessene Spaltenbreite.
- **mat-grid-list (Mobile)**: 3-Spalten-Grid → schmale Kacheln; auf 2/1 Spalten wechseln.
- **mat-form-fields (Mobile)**: Zwei-Spalten-Inputs werden gequetscht → unter Breakpoint einspaltig.
- **mat-selection-controls (Mobile)**: Checkboxen horizontal eng → Wrap/Stack.
- **mat-icon**: „Color Variants" (primary/accent/warning) optisch nicht unterscheidbar → Theme-Farbklassen prüfen/anwenden; Mobile wickelt letztes Icon allein → responsives Grid.
- **mat-tree**: Expand-Toggles zu klein (Mobile) → min. 44×44 Hit-Area, Icon kompakt.
- **mat-dialog** (Desktop-Batch): Buttons/Dialoggrößen ohne sichtbaren Selected-State; „Open Custom" schwach abgesetzt → Standard-Material-Varianten + aktiven Zustand markieren.
- **mat-dialog** (Mobile): Titel-/Nachrichtenfeld + Button in einer Zeile, Werte truncaten → auf Mobile stacken.
- **mat-file-manager**: Toggle-Reihe (Sortable/Editable/File Management) gequetscht → `gap` + Wrap.
- **mat-file-upload**: Einstellungs-Zeile (Multiple files/Max-Size/Auto-Upload) gequetscht → Grid/Flex-Gap.
- **mat-menu**: Demo zeigt nur Hamburger (Default-State), wirkt leer → „Tap to open"-Hinweis oder ein offenes Beispiel.
- **mat-bottom-sheet / mat-snackbar**: zeigen nur Trigger ohne Zustand → Hinweistext/offener Zustand.
- **mat-expansion (Mobile)**: Header-Titel bricht ungleichmäßig → Titel/Description mobile stacken.
- **mat-ripples (Mobile)**: breite Anordnung nah am Breakpoint → unterhalb stacken.

### Reihenfolge (Priorität)
1. Shared Code-Overflow (eine Stelle, betrifft fast alle Seiten)
2. Shared Demo-Karten-Layout (max-width/zentrieren)
3. Mobile-spezifische Clips (stepper, table/sort, toolbar)
4. Kleine Polishes (disabled-Kontrast, icon-Farben, sidenav/tree, menu-Hinweise)
