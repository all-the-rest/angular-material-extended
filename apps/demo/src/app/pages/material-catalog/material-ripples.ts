import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MaterialRipplesBasic } from './ripples/material-ripples-basic';

@Component({
  selector: 'rui-material-ripples',
  standalone: true,
  imports: [MaterialRipplesBasic],
  template: `
    <div class="rui-p-4 rui-md:p-6 rui-space-y-2">
      <div class="rui-mb-6">
        <h1 class="rui-font-bold rui-text-on-surface">Ripples</h1>
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-1">matRipple directive adds Material Design ripple feedback to any element.</p>
      </div>

      <rui-material-ripples-basic />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialRipples {}
