import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MaterialDividerBasic } from './divider/material-divider-basic';
import { MaterialDividerVertical } from './divider/material-divider-vertical';

@Component({
  selector: 'rui-material-divider',
  standalone: true,
  imports: [MaterialDividerBasic, MaterialDividerVertical],
  template: `
    <div class="rui-p-4 rui-md:p-6 rui-space-y-2">
      <div class="rui-mb-6">
        <h1 class="rui-font-bold rui-text-on-surface">Divider</h1>
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-1">mat-divider for separating sections horizontally or vertically.</p>
      </div>

      <rui-material-divider-basic />
      <rui-material-divider-vertical />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialDivider {}
