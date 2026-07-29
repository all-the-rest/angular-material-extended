import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MaterialBadgeBasic } from './badge/material-badge-basic';
import { MaterialBadgeOverlap } from './badge/material-badge-overlap';

@Component({
  selector: 'rui-material-badge',
  standalone: true,
  imports: [MaterialBadgeBasic, MaterialBadgeOverlap],
  template: `
    <div class="rui-p-4 rui-md:p-6 rui-space-y-2">
      <div class="rui-mb-6">
        <h1 class="rui-font-bold rui-text-on-surface">Badge</h1>
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-1">matBadge for notifications, counts, and status indicators on icons and buttons.</p>
      </div>

      <rui-material-badge-basic />
      <rui-material-badge-overlap />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialBadge {}
