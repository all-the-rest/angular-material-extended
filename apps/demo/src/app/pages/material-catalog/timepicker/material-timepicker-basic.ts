import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-timepicker-basic',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ShowcaseCode],
  template: `
    <section id="timepicker-basic" class="rui-mb-8">
      <h2 id="timepicker-basic" class="rui-font-bold rui-text-on-surface rui-mb-1">Basic Timepicker</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">Native HTML time input styled with Angular Material form-field.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface rui-p-5">
        <mat-form-field appearance="outline" class="rui-w-full rui-max-w-xs">
          <mat-label>Time</mat-label>
          <input matInput type="time" [(ngModel)]="time" />
        </mat-form-field>
      </div>

      <rui-showcase-code
        html="<mat-form-field appearance=&quot;outline&quot; class=&quot;w-full max-w-xs&quot;>
  <mat-label>Time</mat-label>
  <input matInput type=&quot;time&quot; [(ngModel)]=&quot;time&quot; />
</mat-form-field>"
        ts="import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// In component imports:
imports: [FormsModule, MatFormFieldModule, MatInputModule],"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialTimepickerBasic {
  protected time = '';
}
