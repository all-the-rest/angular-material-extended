import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MaterialListBasic } from './list/material-list-basic';
import { MaterialListMultiline } from './list/material-list-multiline';

@Component({
  selector: 'rui-material-list',
  standalone: true,
  imports: [MaterialListBasic, MaterialListMultiline],
  template: `
    <div class="rui-p-4 rui-md:p-6 rui-space-y-2">
      <div class="rui-mb-6">
        <h1 class="rui-font-bold rui-text-on-surface">List</h1>
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-1">mat-list for displaying rows of items with icons, titles, and descriptions.</p>
      </div>

      <rui-material-list-basic />
      <rui-material-list-multiline />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialList {}
