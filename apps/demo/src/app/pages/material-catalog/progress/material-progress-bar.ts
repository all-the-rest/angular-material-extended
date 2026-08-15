import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-progress-bar-showcase',
  standalone: true,
  imports: [MatProgressBarModule, MatIconModule, ShowcaseCode],
  template: `
    <section id="progress-bar" class="rui-mb-8">
      <h2 id="progress-bar" class="rui-font-bold rui-text-on-surface rui-mb-1">Progress Bar</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">mat-progress-bar in determinate and indeterminate modes.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface demo-controls rui-p-5 rui-space-y-4">
        <div>
          <p class="rui-text-sm rui-text-on-surface-variant rui-mb-2">Determinate (65%)</p>
          <mat-progress-bar mode="determinate" [value]="65"></mat-progress-bar>
        </div>
        <div>
          <p class="rui-text-sm rui-text-on-surface-variant rui-mb-2">Indeterminate</p>
          <mat-progress-bar mode="indeterminate"></mat-progress-bar>
        </div>
      </div>

      <rui-showcase-code
        html="<mat-progress-bar mode=&quot;determinate&quot; [value]=&quot;65&quot;></mat-progress-bar>
<mat-progress-bar mode=&quot;indeterminate&quot;></mat-progress-bar>"
        ts="import { MatProgressBarModule } from '@angular/material/progress-bar';

// In component imports:
imports: [MatProgressBarModule],"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialProgressBarShowcase {}
