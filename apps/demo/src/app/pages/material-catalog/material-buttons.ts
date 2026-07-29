import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MaterialButtonsBasic } from './buttons/material-buttons-basic';
import { MaterialButtonsFab } from './buttons/material-buttons-fab';
import { MaterialButtonsIcon } from './buttons/material-buttons-icon';

@Component({
  selector: 'rui-material-buttons',
  standalone: true,
  imports: [MaterialButtonsBasic, MaterialButtonsFab, MaterialButtonsIcon],
  template: `
    <div class="rui-p-4 rui-md:p-6 rui-space-y-2">
      <div class="rui-mb-6">
        <h1 class="rui-font-bold rui-text-on-surface">Buttons</h1>
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-1">All mat-button variants: basic, raised, stroked, flat, FAB, mini-FAB, and icon buttons.</p>
      </div>

      <rui-material-buttons-basic />
      <rui-material-buttons-fab />
      <rui-material-buttons-icon />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialButtons {}
