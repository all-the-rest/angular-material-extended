import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MenuBasic } from './menu/material-menu-basic';
import { MenuIcons } from './menu/material-menu-icons';

@Component({
  selector: 'rui-material-menu',
  standalone: true,
  imports: [MenuBasic, MenuIcons],
  template: `
    <div class="rui-p-4 rui-md:p-6 rui-space-y-2">
      <div class="rui-mb-6">
        <h1 class="rui-font-bold rui-text-on-surface">Menu</h1>
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-1">MatMenu provides a floating panel of selectable options triggered by a button or other element.</p>
      </div>

      <rui-material-menu-basic />
      <rui-material-menu-icons />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialMenu {}
