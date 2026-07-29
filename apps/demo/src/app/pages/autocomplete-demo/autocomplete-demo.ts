import { Component, ChangeDetectionStrategy, signal, type WritableSignal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ShowcaseCode } from '../../shared/showcase-code';
import { RuiAutocomplete } from '@all-the.rest/mat-extended/autocomplete';

@Component({
  selector: 'rui-autocomplete-demo',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ShowcaseCode,
    RuiAutocomplete,
  ],
  template: `
<div class="rui-max-w-4xl rui-mx-auto rui-p-4 rui-md:p-6 rui-space-y-8">
  <h1 class="rui-font-bold rui-text-on-surface">Autocomplete</h1>
  <p class="rui-text-sm rui-text-on-surface-variant">
    Standalone autocomplete with built-in filtering, signal API, and form integration.
  </p>

  <section>
    <h2 id="signal-forms" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Signal Forms</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">Using <code>[(selectedOption)]</code> with a <code>signal</code>.</p>
    <mat-card>
      <mat-card-content class="rui-pt-4">
        <mat-form-field appearance="outline">
          <mat-label>Select a fruit</mat-label>
          <input matInput [matAutocomplete]="auto.inner">
          <rui-autocomplete #auto [options]="fruits" [(selectedOption)]="selectedFruit" />
        </mat-form-field>
        <p class="rui-text-sm rui-text-on-surface-variant">
          Selected: {{ selectedFruit() | json }}
        </p>
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="signalHtmlCode" [ts]="signalTsCode" />
  </section>

  <section>
    <h2 id="reactive-forms" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Reactive Forms</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">Using <code>[formControl]</code> with a <code>FormControl</code>.</p>
    <mat-card>
      <mat-card-content class="rui-pt-4">
        <mat-form-field appearance="outline">
          <mat-label>Select a state</mat-label>
          <input matInput [formControl]="reactiveControl" [matAutocomplete]="auto.inner">
          <rui-autocomplete #auto [options]="states" (optionSelected)="onStateSelected($event)" />
        </mat-form-field>
        <p class="rui-text-sm rui-text-on-surface-variant">
          Selected: {{ reactiveControl.value | json }}
        </p>
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="reactiveHtmlCode" [ts]="reactiveTsCode" />
  </section>

  <section>
    <h2 id="template-driven-forms" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Template-driven Forms</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">Using <code>[(ngModel)]</code> with the autocomplete.</p>
    <mat-card>
      <mat-card-content class="rui-pt-4">
        <mat-form-field appearance="outline">
          <mat-label>Select a country</mat-label>
          <input matInput [(ngModel)]="ngModelCountry" name="country" [matAutocomplete]="auto.inner">
          <rui-autocomplete #auto [options]="countries" [(selectedOption)]="ngModelCountry" />
        </mat-form-field>
        <p class="rui-text-sm rui-text-on-surface-variant">
          Selected: {{ ngModelCountry | json }}
        </p>
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="templateHtmlCode" [ts]="templateTsCode" />
  </section>
</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteDemo {
  readonly fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];
  readonly states = ['California', 'Colorado', 'Florida', 'New York', 'Texas', 'Washington'];
  readonly countries = ['Austria', 'Brazil', 'Canada', 'Denmark', 'Germany', 'Japan', 'Switzerland'];

  readonly selectedFruit: WritableSignal<string | null> = signal<string | null>(null);
  readonly reactiveControl = new FormControl<string | null>(null);
  ngModelCountry: string | null = null;

  onStateSelected(value: string | null) {
    this.reactiveControl.setValue(value);
  }

  protected signalHtmlCode = [
    `<mat-form-field appearance="outline">`,
    `  <mat-label>Select a fruit</mat-label>`,
    `  <input matInput [matAutocomplete]="auto.inner">`,
    `  <rui-autocomplete #auto [options]="fruits" [(selectedOption)]="selectedFruit" />`,
    `</mat-form-field>`,
  ].join('\n');

  protected signalTsCode = [
    `import { signal } from '@angular/core';`,
    `import { RuiAutocomplete } from '@all-the.rest/mat-extended/autocomplete';`,
    `import { MatFormFieldModule } from '@angular/material/form-field';`,
    `import { MatInputModule } from '@angular/material/input';`,
    `import { MatAutocompleteModule } from '@angular/material/autocomplete';`,
    ``,
    `readonly fruits = ['Apple', 'Banana', 'Cherry'];`,
    `readonly selectedFruit = signal<string | null>(null);`,
  ].join('\n');

  protected reactiveHtmlCode = [
    `<mat-form-field appearance="outline">`,
    `  <mat-label>Select a state</mat-label>`,
    `  <input matInput [formControl]="reactiveControl" [matAutocomplete]="auto.inner">`,
    `  <rui-autocomplete #auto [options]="states" (optionSelected)="onStateSelected($event)" />`,
    `</mat-form-field>`,
  ].join('\n');

  protected reactiveTsCode = [
    `import { FormControl } from '@angular/forms';`,
    `import { RuiAutocomplete } from '@all-the.rest/mat-extended/autocomplete';`,
    `import { MatFormFieldModule } from '@angular/material/form-field';`,
    `import { MatInputModule } from '@angular/material/input';`,
    `import { MatAutocompleteModule } from '@angular/material/autocomplete';`,
    ``,
    `readonly states = ['California', 'Colorado', 'Florida'];`,
    `readonly reactiveControl = new FormControl<string | null>(null);`,
    ``,
    `onStateSelected(value: string | null) {`,
    `  this.reactiveControl.setValue(value);`,
    `}`,
  ].join('\n');

  protected templateHtmlCode = [
    `<mat-form-field appearance="outline">`,
    `  <mat-label>Select a country</mat-label>`,
    `  <input matInput [(ngModel)]="ngModelCountry" name="country" [matAutocomplete]="auto.inner">`,
    `  <rui-autocomplete #auto [options]="countries" [(selectedOption)]="ngModelCountry" />`,
    `</mat-form-field>`,
  ].join('\n');

  protected templateTsCode = [
    `import { FormsModule } from '@angular/forms';`,
    `import { RuiAutocomplete } from '@all-the.rest/mat-extended/autocomplete';`,
    `import { MatFormFieldModule } from '@angular/material/form-field';`,
    `import { MatInputModule } from '@angular/material/input';`,
    `import { MatAutocompleteModule } from '@angular/material/autocomplete';`,
    ``,
    `ngModelCountry: string | null = null;`,
  ].join('\n');
}
