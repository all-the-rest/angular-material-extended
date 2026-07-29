import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SnackbarBasic } from './snackbar/material-snackbar-basic';
import { SnackbarAction } from './snackbar/material-snackbar-action';

@Component({
  selector: 'rui-material-snackbar',
  standalone: true,
  imports: [SnackbarBasic, SnackbarAction],
  template: `
    <div class="rui-p-4 rui-md:p-6 rui-space-y-2">
      <div class="rui-mb-6">
        <h1 class="rui-font-bold rui-text-on-surface">Snackbar</h1>
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-1">MatSnackBar displays brief messages at the bottom of the screen with optional action buttons.</p>
      </div>

      <rui-material-snackbar-basic />
      <rui-material-snackbar-action />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialSnackbar {}
