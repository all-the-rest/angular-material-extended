import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MaterialToolbarBasic } from './toolbar/material-toolbar-basic';
import { MaterialToolbarMultiRow } from './toolbar/material-toolbar-multirow';

@Component({
  selector: 'rui-material-toolbar',
  standalone: true,
  imports: [MaterialToolbarBasic, MaterialToolbarMultiRow],
  template: `
    <div class="rui-p-4 rui-md:p-6 rui-space-y-2">
      <div class="rui-mb-6">
        <h1 class="rui-font-bold rui-text-on-surface">Toolbar</h1>
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-1">mat-toolbar for app headers and multi-row layouts.</p>
      </div>

      <rui-material-toolbar-basic />
      <rui-material-toolbar-multi-row />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialToolbar {}
