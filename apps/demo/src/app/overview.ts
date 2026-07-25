import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'rui-overview',
  standalone: true,
  imports: [RouterModule, MatIconModule],
  template: `
<div class="max-w-6xl mx-auto p-6 md:p-8">
  <!-- Hero -->
  <div class="text-center mb-10">
    <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--mat-sys-primary-container)] mb-4">
      <span class="text-xl font-bold text-[var(--mat-sys-primary)]">AE</span>
    </div>
    <h1 class="text-3xl md:text-4xl font-bold mb-3 text-[var(--mat-sys-on-surface)]">Angular Material Extended</h1>
    <p class="text-base md:text-lg text-[var(--mat-sys-on-surface-variant)] max-w-xl mx-auto leading-relaxed">
      Community-Erweiterung f&uuml;r Angular Material v22 &mdash; entwickelt f&uuml;r moderne Angular-Apps.
    </p>
    <div class="flex flex-wrap justify-center gap-2 mt-5">
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[var(--mat-sys-primary-container)] text-[var(--mat-sys-on-primary-container)]">Standalone</span>
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[var(--mat-sys-secondary-container)] text-[var(--mat-sys-on-secondary-container)]">Signals API</span>
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[var(--mat-sys-tertiary-container)] text-[var(--mat-sys-on-tertiary-container)]">Zoneless</span>
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[var(--mat-sys-surface-container-high)] text-[var(--mat-sys-on-surface)]">M3 Theming</span>
    </div>
  </div>

  <!-- Custom Components -->
  <div class="mb-8">
    <h2 class="text-xs font-semibold text-[var(--mat-sys-on-surface-variant)] uppercase tracking-wide mb-4 px-1">Custom Components</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      @for (card of componentCards; track card.route) {
        <a [routerLink]="card.route" class="block p-5 rounded-xl border border-[var(--mat-sys-outline-variant)] bg-[var(--mat-sys-surface)] hover:shadow-md hover:border-[var(--mat-sys-primary)] transition-all no-underline group">
          <div class="flex items-center gap-3 mb-2">
            <span class="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--mat-sys-primary-container)] shrink-0">
              <mat-icon class="text-lg text-[var(--mat-sys-on-primary-container)]">{{ card.icon }}</mat-icon>
            </span>
            <h3 class="text-base font-semibold text-[var(--mat-sys-on-surface)] group-hover:text-[var(--mat-sys-primary)] transition-colors">{{ card.label }}</h3>
          </div>
          <p class="text-sm text-[var(--mat-sys-on-surface-variant)] leading-relaxed">{{ card.description }}</p>
        </a>
      }
    </div>
  </div>

  <!-- Date & Time -->
  <div class="mb-10">
    <h2 class="text-xs font-semibold text-[var(--mat-sys-on-surface-variant)] uppercase tracking-wide mb-4 px-1">Date &amp; Time</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      @for (card of dateTimeCards; track card.route) {
        <a [routerLink]="card.route" class="block p-5 rounded-xl border border-[var(--mat-sys-outline-variant)] bg-[var(--mat-sys-surface)] hover:shadow-md hover:border-[var(--mat-sys-primary)] transition-all no-underline group">
          <div class="flex items-center gap-3 mb-2">
            <span class="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--mat-sys-primary-container)] shrink-0">
              <mat-icon class="text-lg text-[var(--mat-sys-on-primary-container)]">{{ card.icon }}</mat-icon>
            </span>
            <h3 class="text-base font-semibold text-[var(--mat-sys-on-surface)] group-hover:text-[var(--mat-sys-primary)] transition-colors">{{ card.label }}</h3>
          </div>
          <p class="text-sm text-[var(--mat-sys-on-surface-variant)] leading-relaxed">{{ card.description }}</p>
        </a>
      }
    </div>
  </div>

  <!-- Material Catalog CTA -->
  <a routerLink="/material/overview" class="block p-5 rounded-xl border border-[var(--mat-sys-outline-variant)] bg-[var(--mat-sys-surface)] hover:shadow-md hover:border-[var(--mat-sys-primary)] transition-all no-underline group">
    <div class="flex items-center gap-4">
      <span class="flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--mat-sys-primary-container)] shrink-0">
        <span class="text-xl font-bold text-[var(--mat-sys-primary)]">M</span>
      </span>
      <div class="flex-1 min-w-0">
        <div class="text-base font-semibold text-[var(--mat-sys-on-surface)] group-hover:text-[var(--mat-sys-primary)] transition-colors">Angular Material Catalog</div>
        <div class="text-sm text-[var(--mat-sys-on-surface-variant)]">Alle 31 Material-Komponenten mit Live-Demos &amp; Code</div>
      </div>
      <mat-icon class="text-[var(--mat-sys-on-surface-variant)] group-hover:text-[var(--mat-sys-primary)] transition-colors">arrow_forward</mat-icon>
    </div>
  </a>

  <!-- Status -->
  <div class="mt-8 flex justify-center">
    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--mat-sys-surface-container-high)] text-xs text-[var(--mat-sys-on-surface-variant)]">
      <span class="w-2 h-2 rounded-full bg-[var(--mat-sys-tertiary)]"></span>
      Active Development &middot; v0.1.4-SNAPSHOT
    </div>
  </div>
</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Overview {
  readonly componentCards = [
    { label: 'Cropper', route: '/cropper', icon: 'crop', description: 'Bildzuschnitt mit Zoom, Rotation, Aspect-Ratio-Presets und Touch-Unterst\u00fctzung' },
    { label: 'File Upload', route: '/file-upload', icon: 'upload_file', description: 'Drag & Drop mit Validierung, Progress-Bar, Upload-Handler, Sortierung, Inline-Rename' },
    { label: 'File Management', route: '/file-manager', icon: 'file_present', description: 'Datei-Manager mit Tree-Navigation, Vorschau und Aktionen' },
    { label: 'Toast', route: '/toast', icon: 'notifications', description: 'Overlay-Notification mit Success/Error/Info/Warning, Action-Button, konfigurierbaren Positionen' },
    { label: 'Data Table', route: '/data-table', icon: 'table_chart', description: 'Wrap von mat-table mit Sort, Paginator, Filter, Selection und benutzerdefinierten Templates' },
    { label: 'Dialog', route: '/dialog', icon: 'open_in_new', description: 'Modal-Dialog mit Overlay, FocusTrap, Gr\u00f6\u00dfen (sm\u2013fullscreen), benutzerdefiniertem Content' },
    { label: 'Menu', route: '/menu', icon: 'menu', description: 'Kontextmen\u00fc mit Icons, Separator, Disabled-Items, Keyboard-Navigation und Submen\u00fcs' },
    { label: 'Breadcrumb', route: '/breadcrumb', icon: 'arrow_right_alt', description: 'Auto-Breadcrumb aus Route-Data, manueller Modus, benutzerdefinierte Trennzeichen und Icons' },
    { label: 'Multi-Select', route: '/multi-select', icon: 'playlist_add_check', description: 'Dropdown mit Mehrfachauswahl, Filterung, Select-All, Checkboxen und konfigurierbaren Optionen' },
    { label: 'Autocomplete', route: '/autocomplete', icon: 'search', description: 'Autocomplete mit eingebautem Filtering, Signal-API und Form-Integration' },
    { label: 'Navigation', route: '/navigation', icon: 'near_me', description: 'Breadcrumb und On This Page Komponenten für Seitenstruktur und Navigation' },
  ];

  readonly dateTimeCards = [
    { label: 'Date Input', route: '/date-input', icon: 'calendar_today', description: 'Datumseingabe mit Input-Mask, Format-Override, MatDatepicker-Integration und Maskierung' },
  ];
}
