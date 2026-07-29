import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DialogBasic } from './dialog/material-dialog-basic';
import { DialogTemplate } from './dialog/material-dialog-template';

@Component({
  selector: 'rui-material-dialog',
  standalone: true,
  imports: [DialogBasic, DialogTemplate],
  template: `
    <div class="rui-p-4 rui-md:p-6 rui-space-y-2">
      <div class="rui-mb-6">
        <h1 class="rui-font-bold rui-text-on-surface">Dialog</h1>
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-1">MatDialog provides a configurable dialog overlay for displaying content in a modal window.</p>
      </div>

      <rui-material-dialog-basic />
      <rui-material-dialog-template />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialDialog {}
