import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MaterialExpansionAccordion } from './expansion/material-expansion-accordion';
import { MaterialExpansionMulti } from './expansion/material-expansion-multi';

@Component({
  selector: 'rui-material-expansion',
  standalone: true,
  imports: [MaterialExpansionAccordion, MaterialExpansionMulti],
  template: `
    <div class="rui-p-4 rui-md:p-6 rui-space-y-2">
      <div class="rui-mb-6">
        <h1 class="rui-font-bold rui-text-on-surface">Expansion Panel</h1>
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-1">mat-expansion-panel for accordion and multi-panel layouts.</p>
      </div>

      <rui-material-expansion-accordion />
      <rui-material-expansion-multi />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialExpansion {}
