import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MaterialProgressBarShowcase } from './progress/material-progress-bar';
import { MaterialProgressSpinnerShowcase } from './progress/material-progress-spinner';

@Component({
  selector: 'rui-material-progress',
  standalone: true,
  imports: [MaterialProgressBarShowcase, MaterialProgressSpinnerShowcase],
  template: `
    <div class="rui-p-4 rui-md:p-6 rui-space-y-2">
      <div class="rui-mb-6">
        <h1 class="rui-font-bold rui-text-on-surface">Progress</h1>
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-1">mat-progress-bar (determinate + indeterminate), mat-spinner (various sizes)</p>
      </div>

      <rui-material-progress-bar-showcase />
      <rui-material-progress-spinner-showcase />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialProgress {}
