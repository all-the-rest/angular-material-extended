import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-select-single',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatIconModule, ShowcaseCode],
  template: `
    <section id="select-single" class="rui-mb-8">
      <h2 id="select-single" class="rui-font-bold rui-text-on-surface rui-mb-1">Single Selection</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">mat-select with outline appearance and single option selection.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface demo-controls rui-p-5">
        <mat-form-field appearance="outline" class="rui-w-full rui-max-w-xs">
          <mat-label>Country</mat-label>
          <mat-select [(value)]="selectedCountry">
            <mat-option value="us">United States</mat-option>
            <mat-option value="de">Germany</mat-option>
            <mat-option value="fr">France</mat-option>
            <mat-option value="jp">Japan</mat-option>
          </mat-select>
        </mat-form-field>
        <p class="rui-text-xs rui-text-on-surface-variant rui-mt-2">Selected: {{ selectedCountry }}</p>
      </div>

      <rui-showcase-code
        html="<mat-form-field appearance=&quot;outline&quot; class=&quot;w-full max-w-xs&quot;>
  <mat-label>Country</mat-label>
  <mat-select [(value)]=&quot;selectedCountry&quot;>
    <mat-option value=&quot;us&quot;>United States</mat-option>
    <mat-option value=&quot;de&quot;>Germany</mat-option>
    <mat-option value=&quot;fr&quot;>France</mat-option>
    <mat-option value=&quot;jp&quot;>Japan</mat-option>
  </mat-select>
</mat-form-field>"
        ts="import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

// In component imports:
imports: [FormsModule, MatFormFieldModule, MatSelectModule],

export class MyComponent {
  selectedCountry = 'us';
}"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialSelectSingle {
  selectedCountry = 'us';
}
