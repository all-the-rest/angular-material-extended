import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MaterialDatepickerBasic } from './datepicker/material-datepicker-basic';
import { MaterialDatepickerRange } from './datepicker/material-datepicker-range';

@Component({
  selector: 'rui-material-datepicker',
  standalone: true,
  imports: [MaterialDatepickerBasic, MaterialDatepickerRange],
  template: `
    <div class="rui-p-4 rui-md:p-6 rui-space-y-2">
      <div class="rui-mb-6">
        <h1 class="rui-font-bold rui-text-on-surface">Datepicker</h1>
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-1">mat-datepicker for single date and range selection.</p>
      </div>

      <rui-material-datepicker-basic />
      <rui-material-datepicker-range />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialDatepicker {}
