import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MaterialButtonToggleSingle } from './button-toggle/material-button-toggle-single';
import { MaterialButtonToggleMulti } from './button-toggle/material-button-toggle-multi';

@Component({
  selector: 'rui-material-button-toggle',
  standalone: true,
  imports: [MaterialButtonToggleSingle, MaterialButtonToggleMulti],
  template: `
    <div class="rui-p-4 rui-md:p-6 rui-space-y-2">
      <div class="rui-mb-6">
        <h1 class="rui-font-bold rui-text-on-surface">Button Toggle</h1>
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-1">mat-button-toggle-group for single and multi selection.</p>
      </div>

      <rui-material-button-toggle-single />
      <rui-material-button-toggle-multi />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialButtonToggle {}
