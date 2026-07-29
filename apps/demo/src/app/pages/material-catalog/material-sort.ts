import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MaterialSortBasic } from './sort/material-sort-basic';

@Component({
  selector: 'rui-material-sort',
  standalone: true,
  imports: [MaterialSortBasic],
  template: `
    <div class="rui-p-4 rui-md:p-6 rui-space-y-2">
      <div class="rui-mb-6">
        <h1 class="rui-font-bold rui-text-on-surface">Sort Header</h1>
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-1">mat-sort-header enables column-based sorting on tables and lists.</p>
      </div>

      <rui-material-sort-basic />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialSort {}
