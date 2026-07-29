import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MaterialTimepickerBasic } from './timepicker/material-timepicker-basic';

@Component({
  selector: 'rui-material-timepicker',
  standalone: true,
  imports: [MaterialTimepickerBasic],
  template: `
    <div class="rui-p-4 rui-md:p-6 rui-space-y-2">
      <div class="rui-mb-6">
        <h1 class="rui-font-bold rui-text-on-surface">Timepicker</h1>
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-1">Native time input styled with mat-form-field.</p>
      </div>

      <rui-material-timepicker-basic />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialTimepicker {}
