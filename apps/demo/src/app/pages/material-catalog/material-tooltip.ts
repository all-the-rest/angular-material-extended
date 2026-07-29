import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MaterialTooltipBasic } from './tooltip/material-tooltip-basic';
import { MaterialTooltipShowDelay } from './tooltip/material-tooltip-show-delay';

@Component({
  selector: 'rui-material-tooltip',
  standalone: true,
  imports: [MaterialTooltipBasic, MaterialTooltipShowDelay],
  template: `
    <div class="rui-p-4 rui-md:p-6 rui-space-y-2">
      <div class="rui-mb-6">
        <h1 class="rui-font-bold rui-text-on-surface">Tooltip</h1>
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-1">matTooltip for context-aware hints on hover or focus.</p>
      </div>

      <rui-material-tooltip-basic />
      <rui-material-tooltip-show-delay />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialTooltip {}
