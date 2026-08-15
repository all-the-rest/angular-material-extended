import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-badge-overlap',
  standalone: true,
  imports: [MatBadgeModule, MatButtonModule, MatIconModule, ShowcaseCode],
  template: `
    <section id="badge-overlap" class="rui-mb-8">
      <h2 id="badge-overlap" class="rui-font-bold rui-text-on-surface rui-mb-1">Badge Overlap & Size</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">matBadge with overlap and size variants.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface demo-controls rui-p-5 rui-flex rui-gap-6 rui-items-center rui-flex-wrap">
        <button mat-icon-button [matBadge]="8" matBadgeColor="primary" aria-label="Overlap badge">
          <mat-icon>shopping_cart</mat-icon>
        </button>
        <button mat-icon-button [matBadge]="99" matBadgeSize="small" matBadgeColor="accent" aria-label="Small badge">
          <mat-icon>mail</mat-icon>
        </button>
        <button mat-icon-button [matBadge]="12" matBadgeSize="large" matBadgeColor="warn" aria-label="Large badge">
          <mat-icon>notifications_active</mat-icon>
        </button>
      </div>

      <rui-showcase-code
        html="<button mat-icon-button
  [matBadge]=&quot;8&quot;
  matBadgeColor=&quot;primary&quot;>
  <mat-icon>shopping_cart</mat-icon>
</button>

<button mat-icon-button
  [matBadge]=&quot;99&quot;
  matBadgeSize=&quot;small&quot;
  matBadgeColor=&quot;accent&quot;>
  <mat-icon>mail</mat-icon>
</button>

<button mat-icon-button
  [matBadge]=&quot;12&quot;
  matBadgeSize=&quot;large&quot;
  matBadgeColor=&quot;warn&quot;>
  <mat-icon>notifications_active</mat-icon>
</button>"
        ts="import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// In component imports:
imports: [MatBadgeModule, MatButtonModule, MatIconModule],"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialBadgeOverlap {}
