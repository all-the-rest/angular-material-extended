import { Component, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map } from 'rxjs/operators';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-autocomplete-filtered',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule, ShowcaseCode],
  template: `
    <section id="autocomplete-filtered" class="rui-mb-8">
      <h2 id="autocomplete-filtered" class="rui-font-bold rui-text-on-surface rui-mb-1">Filtered Autocomplete</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">Autocomplete that filters options based on user input using FormControl.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface rui-p-5">
        <mat-form-field appearance="outline" class="rui-w-full rui-max-w-xs">
          <mat-label>State</mat-label>
          <input matInput [formControl]="stateCtrl" [matAutocomplete]="stateAuto" />
          <mat-autocomplete #stateAuto="matAutocomplete">
            @for (state of filteredStates(); track state) {
              <mat-option [value]="state">{{ state }}</mat-option>
            }
          </mat-autocomplete>
        </mat-form-field>
      </div>

      <rui-showcase-code [html]="htmlCode" [ts]="tsCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialAutocompleteFiltered {
  protected htmlCode = `<mat-form-field appearance="outline" class="rui-w-full rui-max-w-xs">
  <mat-label>State</mat-label>
  <input matInput [formControl]="stateCtrl" [matAutocomplete]="stateAuto" />
  <mat-autocomplete #stateAuto="matAutocomplete">
    @for (state of filteredStates(); track state) {
      <mat-option [value]="state">{{ state }}</mat-option>
    }
  </mat-autocomplete>
</mat-form-field>`;

  protected tsCode = `import { Component, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map } from 'rxjs/operators';

const states = ['California', 'Colorado', 'Florida', 'New York', 'Texas'];

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule],
})
export class Example {
  stateCtrl = new FormControl('');
  private allStates = signal(states);
  private stateValue = toSignal(this.stateCtrl.valueChanges.pipe(map(v => v ?? '')), { initialValue: '' });
  filteredStates = computed(() => {
    const value = this.stateValue().toLowerCase();
    return this.allStates().filter(s => s.toLowerCase().includes(value));
  });
}`;

  protected readonly stateCtrl = new FormControl('');
  #allStates = signal(['California', 'Colorado', 'Florida', 'New York', 'Texas']);
  #stateValue = toSignal(this.stateCtrl.valueChanges.pipe(map(v => v ?? '')), { initialValue: '' });
  protected readonly filteredStates = computed(() => {
    const value = this.#stateValue().toLowerCase();
    return this.#allStates().filter(s => s.toLowerCase().includes(value));
  });
}
