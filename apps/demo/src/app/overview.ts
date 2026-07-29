import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'rui-overview',
  standalone: true,
  imports: [RouterModule, MatIconModule],
  template: `
<div class="rui-max-w-6xl rui-mx-auto rui-p-6 rui-md:p-8">
  <!-- Hero -->
  <div class="rui-text-center rui-mb-10">
    <div class="rui-inline-flex rui-items-center rui-justify-center rui-w-14 rui-h-14 rui-rounded-2xl rui-bg-primary-container rui-mb-4">
      <span class="rui-text-xl rui-font-bold rui-text-primary">AE</span>
    </div>
    <h1 class="rui-text-3xl rui-md:text-4xl rui-font-bold rui-mb-3 rui-text-on-surface">Angular Material Extended</h1>
    <p class="rui-text-base rui-md:text-lg rui-text-on-surface-variant rui-max-w-xl rui-mx-auto rui-leading-relaxed">
      Community-Erweiterung f&uuml;r Angular Material v22 &mdash; entwickelt f&uuml;r moderne Angular-Apps.
    </p>
    <div class="rui-flex rui-flex-wrap rui-justify-center rui-gap-2 rui-mt-5">
      <span class="rui-inline-flex rui-items-center rui-gap-1.5 rui-px-3 rui-py-1 rui-rounded-full rui-text-xs rui-font-medium rui-bg-primary-container rui-text-on-primary-container">Standalone</span>
      <span class="rui-inline-flex rui-items-center rui-gap-1.5 rui-px-3 rui-py-1 rui-rounded-full rui-text-xs rui-font-medium" style="background:var(--mat-sys-secondary-container);color:var(--mat-sys-on-secondary-container);">Signals API</span>
      <span class="rui-inline-flex rui-items-center rui-gap-1.5 rui-px-3 rui-py-1 rui-rounded-full rui-text-xs rui-font-medium" style="background:var(--mat-sys-tertiary-container);color:var(--mat-sys-on-tertiary-container);">Zoneless</span>
      <span class="rui-inline-flex rui-items-center rui-gap-1.5 rui-px-3 rui-py-1 rui-rounded-full rui-text-xs rui-font-medium rui-bg-surface-container-high" style="color:var(--mat-sys-on-surface);">M3 Theming</span>
    </div>
  </div>

  <!-- Custom Components -->
  <div class="rui-mb-8">
    <h2 class="rui-text-xs rui-font-semibold rui-text-on-surface-variant rui-uppercase rui-tracking-wide rui-mb-4 rui-px-1">Custom Components</h2>
    <div class="rui-grid rui-grid-cols-1 rui-sm:grid-cols-2 rui-lg:grid-cols-3 rui-gap-4">
      @for (card of componentCards; track card.route) {
        <a [routerLink]="card.route" class="rui-block rui-p-5 rui-rounded-xl rui-border rui-border-outline-variant rui-bg-surface rui-no-underline" style="transition:all 0.15s;">
          <div class="rui-flex rui-items-center rui-gap-3 rui-mb-2">
            <span class="rui-flex rui-items-center rui-justify-center" style="width:2.25rem;height:2.25rem;border-radius:0.5rem;background:var(--mat-sys-primary-container);flex-shrink:0;">
              <mat-icon class="rui-text-lg" style="color:var(--mat-sys-on-primary-container);">{{ card.icon }}</mat-icon>
            </span>
            <h3 class="rui-text-base rui-font-semibold rui-text-on-surface" style="transition:color 0.15s;">{{ card.label }}</h3>
          </div>
          <p class="rui-text-sm rui-text-on-surface-variant rui-leading-relaxed">{{ card.description }}</p>
        </a>
      }
    </div>
  </div>

  <!-- Date & Time -->
  <div class="rui-mb-10">
    <h2 class="rui-text-xs rui-font-semibold rui-text-on-surface-variant rui-uppercase rui-tracking-wide rui-mb-4 rui-px-1">Date &amp; Time</h2>
    <div class="rui-grid rui-grid-cols-1 rui-sm:grid-cols-2 rui-lg:grid-cols-3 rui-gap-4">
      @for (card of dateTimeCards; track card.route) {
        <a [routerLink]="card.route" class="rui-block rui-p-5 rui-rounded-xl rui-border rui-border-outline-variant rui-bg-surface rui-no-underline" style="transition:all 0.15s;">
          <div class="rui-flex rui-items-center rui-gap-3 rui-mb-2">
            <span class="rui-flex rui-items-center rui-justify-center" style="width:2.25rem;height:2.25rem;border-radius:0.5rem;background:var(--mat-sys-primary-container);flex-shrink:0;">
              <mat-icon class="rui-text-lg" style="color:var(--mat-sys-on-primary-container);">{{ card.icon }}</mat-icon>
            </span>
            <h3 class="rui-text-base rui-font-semibold rui-text-on-surface" style="transition:color 0.15s;">{{ card.label }}</h3>
          </div>
          <p class="rui-text-sm rui-text-on-surface-variant rui-leading-relaxed">{{ card.description }}</p>
        </a>
      }
    </div>
  </div>

  <!-- Material Catalog CTA -->
  <a routerLink="/material/overview" class="rui-block rui-p-5 rui-rounded-xl rui-border rui-border-outline-variant rui-bg-surface rui-no-underline" style="transition:all 0.15s;">
    <div class="rui-flex rui-items-center rui-gap-4">
      <span class="rui-flex rui-items-center rui-justify-center" style="width:3rem;height:3rem;border-radius:0.75rem;background:var(--mat-sys-primary-container);flex-shrink:0;">
        <span class="rui-text-xl rui-font-bold rui-text-primary">M</span>
      </span>
      <div class="rui-flex-1 rui-min-w-0">
        <div class="rui-text-base rui-font-semibold rui-text-on-surface" style="transition:color 0.15s;">Angular Material Catalog</div>
        <div class="rui-text-sm rui-text-on-surface-variant">Alle 31 Material-Komponenten mit Live-Demos &amp; Code</div>
      </div>
      <mat-icon class="rui-text-on-surface-variant" style="transition:color 0.15s;">arrow_forward</mat-icon>
    </div>
  </a>

  <!-- Status -->
  <div class="rui-mt-8 rui-flex rui-justify-center">
    <div class="rui-inline-flex rui-items-center rui-gap-2 rui-px-4 rui-py-2 rui-rounded-full rui-bg-surface-container-high rui-text-xs rui-text-on-surface-variant">
      <span class="rui-w-2 rui-h-2 rui-rounded-full" style="background:var(--mat-sys-tertiary);"></span>
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
