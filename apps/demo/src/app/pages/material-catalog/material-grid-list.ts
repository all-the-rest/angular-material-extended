import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MaterialGridListBasic } from './grid-list/material-grid-list-basic';

@Component({
  selector: 'rui-material-grid-list',
  standalone: true,
  imports: [MaterialGridListBasic],
  template: `
    <div class="rui-p-4 rui-md:p-6 rui-space-y-2">
      <div class="rui-mb-6">
        <h1 class="rui-font-bold rui-text-on-surface">Grid List</h1>
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-1">mat-grid-list (deprecated — use CSS Grid instead).</p>
      </div>

      <rui-material-grid-list-basic />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialGridList {}
