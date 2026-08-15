import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-selection-controls-checkbox',
  standalone: true,
  imports: [MatCheckboxModule, MatIconModule, ShowcaseCode],
  template: `
    <section id="selection-controls-checkbox" class="rui-mb-8">
      <h2 id="selection-controls-checkbox" class="rui-font-bold rui-text-on-surface rui-mb-1">Checkbox</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">mat-checkbox with unchecked, checked, indeterminate, and disabled states.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface demo-controls rui-p-5 rui-flex rui-gap-4 rui-flex-wrap rui-items-center">
        <fieldset>
          <legend class="rui-sr-only">Checkboxes</legend>
          <mat-checkbox>Unchecked</mat-checkbox>
          <mat-checkbox checked>Checked</mat-checkbox>
          <mat-checkbox indeterminate>Indeterminate</mat-checkbox>
          <mat-checkbox disabled>Disabled</mat-checkbox>
        </fieldset>
      </div>

      <rui-showcase-code
        html="<mat-checkbox>Unchecked</mat-checkbox>
<mat-checkbox checked>Checked</mat-checkbox>
<mat-checkbox indeterminate>Indeterminate</mat-checkbox>
<mat-checkbox disabled>Disabled</mat-checkbox>"
        ts="import { MatCheckboxModule } from '@angular/material/checkbox';

// In component imports:
imports: [MatCheckboxModule],"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialSelectionControlsCheckbox {}
