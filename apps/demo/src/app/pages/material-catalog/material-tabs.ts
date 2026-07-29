import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MaterialTabsBasic } from './tabs/material-tabs-basic';

@Component({
  selector: 'rui-material-tabs',
  standalone: true,
  imports: [MaterialTabsBasic],
  template: `
    <div class="rui-p-4 rui-md:p-6 rui-space-y-2">
      <div class="rui-mb-6">
        <h1 class="rui-font-bold rui-text-on-surface">Tabs</h1>
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-1">mat-tab-group with mat-tab including disabled tab state</p>
      </div>

      <rui-material-tabs-basic />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialTabs {}
