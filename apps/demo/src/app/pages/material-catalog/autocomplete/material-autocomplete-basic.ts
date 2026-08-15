import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-autocomplete-basic',
  standalone: true,
  imports: [FormsModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule, ShowcaseCode],
  template: `
    <section id="autocomplete-basic" class="rui-mb-8">
      <h2 id="autocomplete-basic" class="rui-font-bold rui-text-on-surface rui-mb-1">Basic Autocomplete</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">Simple autocomplete with static options.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface demo-controls rui-p-5">
        <mat-form-field appearance="outline" class="rui-w-full rui-max-w-xs">
          <mat-label>Fruit</mat-label>
          <input matInput [(ngModel)]="fruit" [matAutocomplete]="fruitAuto" />
          <mat-autocomplete #fruitAuto="matAutocomplete">
            <mat-option value="Apple">Apple</mat-option>
            <mat-option value="Banana">Banana</mat-option>
            <mat-option value="Orange">Orange</mat-option>
          </mat-autocomplete>
        </mat-form-field>
      </div>

      <rui-showcase-code
        html="<mat-form-field appearance=&quot;outline&quot; class=&quot;w-full max-w-xs&quot;>
  <mat-label>Fruit</mat-label>
  <input matInput [(ngModel)]=&quot;fruit&quot; [matAutocomplete]=&quot;fruitAuto&quot; />
  <mat-autocomplete #fruitAuto=&quot;matAutocomplete&quot;>
    <mat-option value=&quot;Apple&quot;>Apple</mat-option>
    <mat-option value=&quot;Banana&quot;>Banana</mat-option>
    <mat-option value=&quot;Orange&quot;>Orange</mat-option>
  </mat-autocomplete>
</mat-form-field>"
        ts="import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// In component imports:
imports: [FormsModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule],"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialAutocompleteBasic {
  protected fruit = '';
}
