import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MaterialSelectionControlsCheckbox } from './selection-controls/material-selection-controls-checkbox';
import { MaterialSelectionControlsRadio } from './selection-controls/material-selection-controls-radio';
import { MaterialSelectionControlsToggle } from './selection-controls/material-selection-controls-toggle';

@Component({
  selector: 'rui-material-selection-controls',
  standalone: true,
  imports: [MaterialSelectionControlsCheckbox, MaterialSelectionControlsRadio, MaterialSelectionControlsToggle],
  template: `
    <div class="rui-p-4 rui-md:p-6 rui-space-y-2">
      <div class="rui-mb-6">
        <h1 class="rui-font-bold rui-text-on-surface">Selection Controls</h1>
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-1">Checkbox, Radio Buttons, and Slide Toggles with various states.</p>
      </div>

      <rui-material-selection-controls-checkbox />
      <rui-material-selection-controls-radio />
      <rui-material-selection-controls-toggle />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialSelectionControls {}
