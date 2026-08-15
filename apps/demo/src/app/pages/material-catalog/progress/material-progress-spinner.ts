import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-progress-spinner-showcase',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatIconModule, ShowcaseCode],
  template: `
    <section id="progress-spinner" class="rui-mb-8">
      <h2 id="progress-spinner" class="rui-font-bold rui-text-on-surface rui-mb-1">Progress Spinner</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">mat-spinner in different sizes.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface demo-controls rui-p-5 rui-flex rui-gap-6 rui-items-center">
        <div>
          <p class="rui-text-sm rui-text-on-surface-variant rui-mb-2">Default</p>
          <mat-spinner diameter="32"></mat-spinner>
        </div>
        <div>
          <p class="rui-text-sm rui-text-on-surface-variant rui-mb-2">Small</p>
          <mat-spinner diameter="20"></mat-spinner>
        </div>
      </div>

      <rui-showcase-code
        html="<mat-spinner diameter=&quot;32&quot;></mat-spinner>
<mat-spinner diameter=&quot;20&quot;></mat-spinner>"
        ts="import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// In component imports:
imports: [MatProgressSpinnerModule],"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialProgressSpinnerShowcase {}
