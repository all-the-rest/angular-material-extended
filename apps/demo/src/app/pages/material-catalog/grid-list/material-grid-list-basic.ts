import { Component, ChangeDetectionStrategy, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-grid-list-basic',
  standalone: true,
  imports: [MatGridListModule, ShowcaseCode],
  template: `
    <section id="grid-list-basic" class="rui-mb-8">
      <h2 id="grid-list-basic" class="rui-font-bold rui-text-on-surface rui-mb-1">Basic Grid List</h2>
      <div class="rui-mb-4" style="padding:0.75rem;border-radius:0.5rem;border:1px solid rgba(217,119,6,0.3);background:rgba(217,119,6,0.1);font-size:0.875rem;">
        <strong>Note:</strong> mat-grid-list is deprecated. CSS Grid is recommended instead.
      </div>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">mat-grid-list with 3 columns (2 on mobile) and 100px row height.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface rui-p-5">
        <mat-grid-list [cols]="cols()" rowHeight="100px">
          <mat-grid-tile class="rui-bg-primary-container rui-text-on-primary-container rui-font-medium">Tile 1</mat-grid-tile>
          <mat-grid-tile class="rui-bg-secondary-container rui-text-on-secondary-container rui-font-medium">Tile 2</mat-grid-tile>
          <mat-grid-tile class="rui-bg-tertiary-container rui-text-on-tertiary-container rui-font-medium">Tile 3</mat-grid-tile>
          <mat-grid-tile class="rui-bg-primary-container rui-text-on-primary-container rui-font-medium">Tile 4</mat-grid-tile>
          <mat-grid-tile class="rui-bg-secondary-container rui-text-on-secondary-container rui-font-medium">Tile 5</mat-grid-tile>
          <mat-grid-tile class="rui-bg-tertiary-container rui-text-on-tertiary-container rui-font-medium">Tile 6</mat-grid-tile>
        </mat-grid-list>
      </div>

      <rui-showcase-code
        html='<mat-grid-list [cols]="cols" rowHeight="100px">
  <mat-grid-tile>Tile 1</mat-grid-tile>
  <mat-grid-tile>Tile 2</mat-grid-tile>
  <mat-grid-tile>Tile 3</mat-grid-tile>
  <mat-grid-tile>Tile 4</mat-grid-tile>
  <mat-grid-tile>Tile 5</mat-grid-tile>
  <mat-grid-tile>Tile 6</mat-grid-tile>
</mat-grid-list>'
        ts="import { MatGridListModule } from '@angular/material/grid-list';

// In component imports:
imports: [MatGridListModule],"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialGridListBasic {
  protected readonly cols = signal(3);

  private readonly platformId = inject(PLATFORM_ID);
  private mql?: MediaQueryList;
  private readonly onMediaChange = (event: MediaQueryListEvent): void => this.cols.set(event.matches ? 3 : 2);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.mql = window.matchMedia('(min-width: 640px)');
      this.cols.set(this.mql.matches ? 3 : 2);
      this.mql.addEventListener('change', this.onMediaChange);
    }
  }

  ngOnDestroy(): void {
    this.mql?.removeEventListener('change', this.onMediaChange);
  }
}
