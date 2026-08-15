import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-select-multi',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatIconModule, ShowcaseCode],
  template: `
    <section id="select-multi" class="rui-mb-8">
      <h2 id="select-multi" class="rui-font-bold rui-text-on-surface rui-mb-1">Multi Selection</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">mat-select with multiple attribute allowing several options.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface demo-controls rui-p-5">
        <mat-form-field appearance="outline" class="rui-w-full rui-max-w-xs">
          <mat-label>Skills</mat-label>
          <mat-select [(value)]="selectedSkills" multiple>
            <mat-option value="angular">Angular</mat-option>
            <mat-option value="react">React</mat-option>
            <mat-option value="vue">Vue</mat-option>
          </mat-select>
        </mat-form-field>
        <p class="rui-text-xs rui-text-on-surface-variant rui-mt-2">Selected: {{ selectedSkills }}</p>
      </div>

      <rui-showcase-code
        html="<mat-form-field appearance=&quot;outline&quot; class=&quot;w-full max-w-xs&quot;>
  <mat-label>Skills</mat-label>
  <mat-select [(value)]=&quot;selectedSkills&quot; multiple>
    <mat-option value=&quot;angular&quot;>Angular</mat-option>
    <mat-option value=&quot;react&quot;>React</mat-option>
    <mat-option value=&quot;vue&quot;>Vue</mat-option>
  </mat-select>
</mat-form-field>"
        ts="import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

// In component imports:
imports: [FormsModule, MatFormFieldModule, MatSelectModule],

export class MyComponent {
  selectedSkills: string[] = ['angular'];
}"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialSelectMulti {
  selectedSkills = ['angular'];
}
