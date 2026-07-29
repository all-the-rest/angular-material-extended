import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MaterialFormFieldsBasic } from './form-fields/material-form-fields-basic';
import { MaterialFormFieldsTypes } from './form-fields/material-form-fields-types';

@Component({
  selector: 'rui-material-form-fields',
  standalone: true,
  imports: [MaterialFormFieldsBasic, MaterialFormFieldsTypes],
  template: `
    <div class="rui-p-4 rui-md:p-6 rui-space-y-2">
      <div class="rui-mb-6">
        <h1 class="rui-font-bold rui-text-on-surface">Form Fields & Inputs</h1>
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-1">mat-form-field with outline and fill appearances, matInput, prefix/suffix icons.</p>
      </div>

      <rui-material-form-fields-basic />
      <rui-material-form-fields-types />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialFormFields {}
