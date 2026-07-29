import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MaterialStepperLinear } from './stepper/material-stepper-linear';
import { MaterialStepperNonLinear } from './stepper/material-stepper-nonlinear';

@Component({
  selector: 'rui-material-stepper',
  standalone: true,
  imports: [MaterialStepperLinear, MaterialStepperNonLinear],
  template: `
    <div class="rui-p-4 rui-md:p-6 rui-space-y-2">
      <div class="rui-mb-6">
        <h1 class="rui-font-bold rui-text-on-surface">Stepper</h1>
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-1">mat-stepper provides a wizard-like workflow for multi-step forms.</p>
      </div>

      <rui-material-stepper-linear />
      <rui-material-stepper-non-linear />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialStepper {}
