import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MaterialBottomSheetBasic } from './bottom-sheet/material-bottom-sheet-basic';

@Component({
  selector: 'rui-material-bottom-sheet',
  standalone: true,
  imports: [MaterialBottomSheetBasic],
  template: `
    <div class="rui-p-4 rui-md:p-6 rui-space-y-2">
      <div class="rui-mb-6">
        <h1 class="rui-font-bold rui-text-on-surface">Bottom Sheet</h1>
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-1">MatBottomSheet displays contextual information as a panel anchored to the bottom of the screen.</p>
      </div>

      <rui-material-bottom-sheet-basic />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialBottomSheet {}
