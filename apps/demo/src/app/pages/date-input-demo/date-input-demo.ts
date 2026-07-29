import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { provideRuiDateAdapter, createDateFormats, RuiDateInputMask } from '@all-the.rest/mat-extended';
import { ShowcaseCode } from '../../shared/showcase-code';

@Component({
  selector: 'rui-date-input-demo',
  standalone: true,
  imports: [
    JsonPipe, MatCardModule, MatFormFieldModule, MatInputModule,
    MatDatepickerModule, MatButtonModule, MatSlideToggleModule,
    FormsModule, ReactiveFormsModule, RuiDateInputMask, ShowcaseCode,
  ],
  providers: [
    provideRuiDateAdapter(createDateFormats('dd.MM.YYYY')),
  ],
  template: `
<div class="rui-max-w-4xl rui-mx-auto rui-p-4 rui-md:p-6 rui-space-y-8">
  <h1 class="rui-font-bold">Date Input Demo (MatDatepicker)</h1>

  <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">
    Typ "20260722" → <code>ruiDateInputMask</code> fügt automatisch Trennzeichen ein.
    "2026-07-22" direkt funktioniert genauso. Der MatDatepicker dient als Fallback zur Kalenderauswahl.
  </p>

  <section>
    <h2 id="basic" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Basic Usage</h2>
  <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">
    <code>ruiDateInputMask</code> direkt auf dem <code>matInput</code> — keine eigene Komponente nötig.
  </p>
  <mat-card>
    <mat-card-content class="rui-pt-4">
      <mat-form-field>
        <mat-label>Date (YYYY-MM-dd)</mat-label>
        <input
          matInput
          ruiDateInputMask="YYYY-MM-dd"
          [matDatepicker]="dp"
          [(ngModel)]="basicDate"
          #basicModel="ngModel"
        />
        <mat-datepicker-toggle matSuffix [for]="dp" />
        <mat-datepicker #dp />
      </mat-form-field>
      @if (basicModel.value) {
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-2">Value: {{ basicModel.value }}</p>
      }
    </mat-card-content>
  </mat-card>
  <rui-showcase-code [html]="basicHtml" [ts]="basicTs" />
  </section>

  <section>
    <h2 id="format-override" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Format Override (per-field)</h2>
  <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">
    Jedes Feld hat sein eigenes <code>ruiDateInputMask</code>-Format — Maskierung <em>und</em> Parsing passen sich automatisch an.
  </p>
  <mat-card>
    <mat-card-content class="rui-pt-4">
      <div style="display:flex;flex-direction:column;gap:0.25rem;">
        <mat-form-field>
          <mat-label>dd.MM.YYYY</mat-label>
          <input matInput ruiDateInputMask="dd.MM.YYYY" [matDatepicker]="dp1" [(ngModel)]="date1" #m1="ngModel" />
          <mat-datepicker-toggle matSuffix [for]="dp1" />
          <mat-datepicker #dp1 />
        </mat-form-field>
        <mat-form-field>
          <mat-label>MM/dd/YYYY</mat-label>
          <input matInput ruiDateInputMask="MM/dd/YYYY" [matDatepicker]="dp2" [(ngModel)]="date2" #m2="ngModel" />
          <mat-datepicker-toggle matSuffix [for]="dp2" />
          <mat-datepicker #dp2 />
        </mat-form-field>
        <mat-form-field>
          <mat-label>YYYY/MM/dd</mat-label>
          <input matInput ruiDateInputMask="YYYY/MM/dd" [matDatepicker]="dp3" [(ngModel)]="date3" #m3="ngModel" />
          <mat-datepicker-toggle matSuffix [for]="dp3" />
          <mat-datepicker #dp3 />
        </mat-form-field>
      </div>
    </mat-card-content>
  </mat-card>
  <rui-showcase-code [html]="formatOverrideHtml" [ts]="formatOverrideTs" />
  </section>

  <section>
    <h2 id="global-config" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Global Configuration</h2>
  <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">
    Diese Seite nutzt <code>provideRuiDateAdapter(createDateFormats('dd.MM.YYYY'))</code>.
    Das erste Feld hat kein <code>ruiDateInputMask</code> &rarr; globales Format.
    Das zweite Feld &uuml;berschreibt pro Feld.
  </p>
  <mat-card>
    <mat-card-content class="rui-pt-4">
      <div style="display:flex;flex-direction:column;gap:0.25rem;">
        <mat-form-field>
          <mat-label>Global: dd.MM.YYYY (ohne Mask)</mat-label>
          <input matInput [matDatepicker]="dp6" [(ngModel)]="globalDate" #g6="ngModel" />
          <mat-datepicker-toggle matSuffix [for]="dp6" />
          <mat-datepicker #dp6 />
        </mat-form-field>
        <mat-form-field>
          <mat-label>Override mit Mask: MM/dd/YYYY</mat-label>
          <input matInput ruiDateInputMask="MM/dd/YYYY" [matDatepicker]="dp7" [(ngModel)]="overriddenDate" #g7="ngModel" />
          <mat-datepicker-toggle matSuffix [for]="dp7" />
          <mat-datepicker #dp7 />
        </mat-form-field>
      </div>
    </mat-card-content>
  </mat-card>
  <rui-showcase-code [html]="globalConfigHtml" [ts]="globalConfigTs" />
  </section>

  <section>
    <h2 id="reactive-forms" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Reactive Forms</h2>
  <mat-card>
    <mat-card-content class="rui-pt-4">
      <mat-form-field>
        <mat-label>Date</mat-label>
        <input matInput ruiDateInputMask="YYYY-MM-dd" [matDatepicker]="dp4" [formControl]="dateControl" />
        <mat-datepicker-toggle matSuffix [for]="dp4" />
        <mat-datepicker #dp4 />
      </mat-form-field>
      <p class="rui-text-sm rui-text-on-surface-variant" style="margin-top:0.5rem;">Control value: {{ dateControl.value | json }}</p>
      <div class="rui-flex rui-gap-2" style="margin-top:0.5rem;">
        <button mat-flat-button (click)="toggleDisabled()">
          {{ dateControl.disabled ? 'Enable' : 'Disable' }}
        </button>
        <button mat-stroked-button (click)="setDate()">
          Set to 2026-12-24
        </button>
      </div>
    </mat-card-content>
  </mat-card>
  <rui-showcase-code [html]="reactiveHtml" [ts]="reactiveTs" />
  </section>

  <section>
    <h2 id="signal-form" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Signal Form</h2>
  <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">Mit model()-Signal via ngModel.</p>
  <mat-card>
    <mat-card-content class="rui-pt-4">
      <mat-form-field>
        <mat-label>Date</mat-label>
        <input matInput ruiDateInputMask="YYYY-MM-dd" [matDatepicker]="dp5" [ngModel]="signalDate()" (ngModelChange)="signalDate.set($event)" />
        <mat-datepicker-toggle matSuffix [for]="dp5" />
        <mat-datepicker #dp5 />
      </mat-form-field>
      @if (signalDate()) {
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-2">Value: {{ signalDate() }}</p>
      }
    </mat-card-content>
  </mat-card>
  <rui-showcase-code [html]="signalHtml" [ts]="signalTs" />
  </section>
</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateInputDemo {
  basicDate = signal<Date | null>(null);
  date1 = signal<Date | null>(null);
  date2 = signal<Date | null>(null);
  date3 = signal<Date | null>(null);
  signalDate = signal<Date | null>(null);
  globalDate = signal<Date | null>(null);
  overriddenDate = signal<Date | null>(null);

  dateControl = new FormControl<Date | null>(null);

  protected basicHtml = `<mat-form-field>
  <mat-label>Date (YYYY-MM-dd)</mat-label>
  <input
    matInput
    ruiDateInputMask="YYYY-MM-dd"
    [matDatepicker]="dp"
    [(ngModel)]="myDate"
  />
  <mat-datepicker-toggle matSuffix [for]="dp" />
  <mat-datepicker #dp />
</mat-form-field>`;

  protected basicTs = `import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideRuiDateAdapter, createDateFormats, RuiDateInputMask } from '@all-the.rest/mat-extended';

@Component({
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, RuiDateInputMask],
  providers: [provideRuiDateAdapter(createDateFormats('dd.MM.YYYY'))],
})
export class MyComponent {
  myDate = signal<Date | null>(null);
}`;

  protected formatOverrideHtml = `<mat-form-field>
  <mat-label>dd.MM.YYYY</mat-label>
  <input matInput ruiDateInputMask="dd.MM.YYYY" [matDatepicker]="dp1" [(ngModel)]="date1" />
  <mat-datepicker-toggle matSuffix [for]="dp1" />
  <mat-datepicker #dp1 />
</mat-form-field>
<mat-form-field>
  <mat-label>MM/dd/YYYY</mat-label>
  <input matInput ruiDateInputMask="MM/dd/YYYY" [matDatepicker]="dp2" [(ngModel)]="date2" />
  <mat-datepicker-toggle matSuffix [for]="dp2" />
  <mat-datepicker #dp2 />
</mat-form-field>
<mat-form-field>
  <mat-label>YYYY/MM/dd</mat-label>
  <input matInput ruiDateInputMask="YYYY/MM/dd" [matDatepicker]="dp3" [(ngModel)]="date3" />
  <mat-datepicker-toggle matSuffix [for]="dp3" />
  <mat-datepicker #dp3 />
</mat-form-field>`;

  protected formatOverrideTs = `// Jedes Input hat sein eigenes ruiDateInputMask-Format — Maskierung UND Parsing
// passen sich automatisch an. Keine zusätzliche Konfiguration nötig.`;

  protected reactiveHtml = `<mat-form-field>
  <mat-label>Date</mat-label>
  <input matInput ruiDateInputMask="YYYY-MM-dd" [matDatepicker]="dp" [formControl]="dateControl" />
  <mat-datepicker-toggle matSuffix [for]="dp" />
  <mat-datepicker #dp />
</mat-form-field>`;

  protected reactiveTs = `import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RuiDateInputMask } from '@all-the.rest/mat-extended';

@Component({ imports: [ReactiveFormsModule, RuiDateInputMask, /* ... */] })
export class MyComponent {
  dateControl = new FormControl<Date | null>(null);
}`;

  protected signalHtml = `<mat-form-field>
  <mat-label>Date</mat-label>
  <input matInput ruiDateInputMask="YYYY-MM-dd" [matDatepicker]="dp"
    [ngModel]="myDate()" (ngModelChange)="myDate.set($event)" />
  <mat-datepicker-toggle matSuffix [for]="dp" />
  <mat-datepicker #dp />
</mat-form-field>`;

  protected signalTs = `import { signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RuiDateInputMask } from '@all-the.rest/mat-extended';

@Component({ imports: [FormsModule, RuiDateInputMask, /* ... */] })
export class MyComponent {
  myDate = signal<Date | null>(null);
}`;

  protected globalConfigHtml = `<!-- Ohne ruiDateInputMask → globales Format (dd.MM.YYYY) -->
<mat-form-field>
  <mat-label>Global: dd.MM.YYYY</mat-label>
  <input matInput [matDatepicker]="dp6" [(ngModel)]="myDate" />
  <mat-datepicker-toggle matSuffix [for]="dp6" />
  <mat-datepicker #dp6 />
</mat-form-field>

<!-- Mit ruiDateInputMask → per-field override -->
<mat-form-field>
  <mat-label>Override: MM/dd/YYYY</mat-label>
  <input matInput ruiDateInputMask="MM/dd/YYYY" [matDatepicker]="dp7" [(ngModel)]="myDate" />
  <mat-datepicker-toggle matSuffix [for]="dp7" />
  <mat-datepicker #dp7 />
</mat-form-field>`;

  protected globalConfigTs = `import { provideRuiDateAdapter, createDateFormats, RuiDateInputMask } from '@all-the.rest/mat-extended';

@Component({
  providers: [
    // Globales Format setzen
    provideRuiDateAdapter(createDateFormats('dd.MM.YYYY')),
  ],
  imports: [RuiDateInputMask],
})
export class MyComponent {
  myDate = signal<Date | null>(null);
}`;

  toggleDisabled(): void {
    if (this.dateControl.disabled) {
      this.dateControl.enable();
    } else {
      this.dateControl.disable();
    }
  }

  setDate(): void {
    this.dateControl.setValue(new Date(2026, 11, 24));
  }
}
