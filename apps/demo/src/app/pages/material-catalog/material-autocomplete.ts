import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MaterialAutocompleteBasic } from './autocomplete/material-autocomplete-basic';
import { MaterialAutocompleteFiltered } from './autocomplete/material-autocomplete-filtered';

@Component({
  selector: 'rui-material-autocomplete',
  standalone: true,
  imports: [MaterialAutocompleteBasic, MaterialAutocompleteFiltered],
  template: `
    <div class="rui-p-4 rui-md:p-6 rui-space-y-2">
      <div class="rui-mb-6">
        <h1 class="rui-font-bold rui-text-on-surface">Autocomplete</h1>
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-1">mat-autocomplete with simple options and reactive filtering.</p>
      </div>

      <rui-material-autocomplete-basic />
      <rui-material-autocomplete-filtered />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialAutocomplete {}
