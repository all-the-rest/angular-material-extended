import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MaterialTreeBasic } from './tree/material-tree-basic';
import { MaterialTreeCheckboxes } from './tree/material-tree-checkboxes';

@Component({
  selector: 'rui-material-tree',
  standalone: true,
  imports: [MaterialTreeBasic, MaterialTreeCheckboxes],
  template: `
    <div class="rui-p-4 rui-md:p-6 rui-space-y-2">
      <div class="rui-mb-6">
        <h1 class="rui-font-bold rui-text-on-surface">Tree</h1>
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-1">mat-tree for hierarchical data display with expand/collapse and checkboxes.</p>
      </div>

      <rui-material-tree-basic />
      <rui-material-tree-checkboxes />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialTree {}
