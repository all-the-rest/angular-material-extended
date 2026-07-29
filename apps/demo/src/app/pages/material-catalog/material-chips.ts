import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MaterialChipsBasic } from './chips/material-chips-basic';
import { MaterialChipsIcon } from './chips/material-chips-icon';

@Component({
  selector: 'rui-material-chips',
  standalone: true,
  imports: [MaterialChipsBasic, MaterialChipsIcon],
  template: `
    <div class="rui-p-4 rui-md:p-6 rui-space-y-2">
      <div class="rui-mb-6">
        <h1 class="rui-font-bold rui-text-on-surface">Chips</h1>
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-1">mat-chip-set, mat-chip with and without icons, disabled state</p>
      </div>

      <rui-material-chips-basic />
      <rui-material-chips-icon />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialChips {}
