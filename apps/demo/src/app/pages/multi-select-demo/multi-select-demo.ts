import { Component, ChangeDetectionStrategy, signal, type WritableSignal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ShowcaseCode } from '../../shared/showcase-code';
import { RuiMultiSelect } from '@all-the.rest/mat-extended/multi-select';

@Component({
  selector: 'rui-multi-select-demo',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ShowcaseCode,
    RuiMultiSelect,
  ],
  template: `
<div class="rui-max-w-4xl rui-mx-auto rui-p-4 rui-md:p-6 rui-space-y-8">
  <h1 class="rui-font-bold rui-text-on-surface">Multi-Select</h1>
  <p class="rui-text-sm rui-text-on-surface-variant">
    Dropdown with multi-selection, filtering, select-all, and drag-to-reorder.
  </p>

  <section>
    <h2 id="signal-forms" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Signal Forms</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">Using <code>[(values)]</code> with a <code>signal</code>.</p>
    <mat-card>
      <mat-card-content class="rui-pt-4">
        <mat-form-field appearance="outline" class="rui-w-full">
          <mat-label>Select fruits</mat-label>
          <rui-multi-select
            [options]="fruits"
            [(values)]="selectedFruits"
          />
        </mat-form-field>
        <p class="rui-text-sm rui-text-on-surface-variant">
          Selected: {{ selectedFruits() | json }}
        </p>
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="signalHtmlCode" [ts]="signalTsCode" />
  </section>

  <section>
    <h2 id="reactive-forms" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Reactive Forms (sortable)</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">Using <code>[formControl]</code> with <code>sortable</code> enabled for drag reorder.</p>
    <mat-card>
      <mat-card-content class="rui-pt-4">
        <mat-form-field appearance="outline" class="rui-w-full">
          <mat-label>Select fruits</mat-label>
          <rui-multi-select
            [options]="fruits"
            [formControl]="reactiveControl"
            [sortable]="true"
          />
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
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">Using <code>[(ngModel)]</code> with the multi-select.</p>
    <mat-card>
      <mat-card-content class="rui-pt-4">
        <mat-form-field appearance="outline" class="rui-w-full">
          <mat-label>Select fruits</mat-label>
          <rui-multi-select
            [options]="fruits"
            [(ngModel)]="ngModelFruits"
          />
        </mat-form-field>
        <p class="rui-text-sm rui-text-on-surface-variant">
          Selected: {{ ngModelFruits | json }}
        </p>
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="templateHtmlCode" [ts]="templateTsCode" />
  </section>
</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectDemo {
  readonly fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];

  readonly selectedFruits: WritableSignal<string[]> = signal<string[]>(['Apple', 'Banana']);

  readonly reactiveControl = new FormControl<string[]>(['Apple', 'Cherry']);

  ngModelFruits: string[] = ['Fig', 'Grape'];

  protected signalHtmlCode = [
    `<mat-form-field appearance="outline">`,
    `  <mat-label>Select fruits</mat-label>`,
    `  <rui-multi-select`,
    `    [options]="fruits"`,
    `    [(values)]="selectedFruits"`,
    `  />`,
    `</mat-form-field>`,
  ].join('\n');

  protected signalTsCode = [
    `import { signal } from '@angular/core';`,
    `import { RuiMultiSelect } from '@all-the.rest/mat-extended/multi-select';`,
    ``,
    `readonly fruits = ['Apple', 'Banana', 'Cherry'];`,
    `readonly selectedFruits = signal<string[]>(['Apple', 'Banana']);`,
  ].join('\n');

  protected reactiveHtmlCode = [
    `<mat-form-field appearance="outline">`,
    `  <mat-label>Select fruits</mat-label>`,
    `  <rui-multi-select`,
    `    [options]="fruits"`,
    `    [formControl]="fruitsControl"`,
    `    [sortable]="true"`,
    `  />`,
    `</mat-form-field>`,
  ].join('\n');

  protected reactiveTsCode = [
    `import { FormControl } from '@angular/forms';`,
    `import { RuiMultiSelect } from '@all-the.rest/mat-extended/multi-select';`,
    ``,
    `readonly fruits = ['Apple', 'Banana', 'Cherry'];`,
    `readonly fruitsControl = new FormControl<string[]>([]);`,
  ].join('\n');

  protected templateHtmlCode = [
    `<mat-form-field appearance="outline">`,
    `  <mat-label>Select fruits</mat-label>`,
    `  <rui-multi-select`,
    `    [options]="fruits"`,
    `    [(ngModel)]="selectedFruits"`,
    `  />`,
    `</mat-form-field>`,
  ].join('\n');

  protected templateTsCode = [
    `import { FormsModule } from '@angular/forms';`,
    `import { RuiMultiSelect } from '@all-the.rest/mat-extended/multi-select';`,
    ``,
    `selectedFruits: string[] = ['Fig', 'Grape'];`,
  ].join('\n');
}
