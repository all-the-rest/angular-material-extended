import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MaterialSidenavBasic } from './sidenav/material-sidenav-basic';

@Component({
  selector: 'rui-material-sidenav',
  standalone: true,
  imports: [MaterialSidenavBasic],
  template: `
    <div class="rui-p-4 rui-md:p-6 rui-space-y-2">
      <div class="rui-mb-6">
        <h1 class="rui-font-bold rui-text-on-surface">Sidenav</h1>
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-1">mat-drawer-container for side navigation layouts.</p>
      </div>

      <rui-material-sidenav-basic />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialSidenav {}
