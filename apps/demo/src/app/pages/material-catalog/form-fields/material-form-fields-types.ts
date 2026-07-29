import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-form-fields-types',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ShowcaseCode],
  template: `
    <section id="form-fields-types" class="rui-mb-8">
      <h2 id="form-fields-types" class="rui-font-bold rui-text-on-surface rui-mb-1">Input Types</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">mat-form-field with different input types (number, email).</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface rui-p-5 rui-flex rui-gap-3">
        <mat-form-field appearance="outline" class="rui-flex-1">
          <mat-label>Number</mat-label>
          <input matInput type="number" value="42" />
        </mat-form-field>
        <mat-form-field appearance="outline" class="rui-flex-1">
          <mat-label>Email</mat-label>
          <input matInput type="email" placeholder="user@example.com" />
        </mat-form-field>
      </div>

      <rui-showcase-code
        html="<mat-form-field appearance=&quot;outline&quot;>
  <mat-label>Number</mat-label>
  <input matInput type=&quot;number&quot; value=&quot;42&quot; />
</mat-form-field>
<mat-form-field appearance=&quot;outline&quot;>
  <mat-label>Email</mat-label>
  <input matInput type=&quot;email&quot; placeholder=&quot;user@example.com&quot; />
</mat-form-field>"
        ts="import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// In component imports:
imports: [MatFormFieldModule, MatInputModule],"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialFormFieldsTypes {}
