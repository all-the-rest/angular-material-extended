import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-stepper-linear',
  standalone: true,
  imports: [MatStepperModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, ShowcaseCode],
  template: `
    <section id="stepper-linear" class="rui-mb-8">
      <h2 id="stepper-linear" class="rui-font-bold rui-text-on-surface rui-mb-1">Linear Stepper</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">Horizontal linear stepper with validation on each step.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface rui-p-5">
        <mat-horizontal-stepper [linear]="true" #stepper>
          <mat-step label="Personal Info">
            <ng-template matStepContent>
              <div class="rui-flex rui-flex-col rui-gap-4 rui-py-3">
                <mat-form-field>
                  <mat-label>Name</mat-label>
                  <input matInput [(ngModel)]="name" name="name" required>
                </mat-form-field>
                <div class="rui-flex rui-gap-2">
                  <button mat-raised-button color="primary" matStepperNext>Next</button>
                </div>
              </div>
            </ng-template>
          </mat-step>

          <mat-step label="Contact">
            <ng-template matStepContent>
              <div class="rui-flex rui-flex-col rui-gap-4 rui-py-3">
                <mat-form-field>
                  <mat-label>Email</mat-label>
                  <input matInput [(ngModel)]="email" name="email" type="email" required>
                </mat-form-field>
                <mat-form-field>
                  <mat-label>Phone</mat-label>
                  <input matInput [(ngModel)]="phone" name="phone" type="tel">
                </mat-form-field>
                <div class="rui-flex rui-gap-2">
                  <button mat-button matStepperPrevious>Back</button>
                  <button mat-raised-button color="primary" matStepperNext>Next</button>
                </div>
              </div>
            </ng-template>
          </mat-step>

          <mat-step label="Done">
            <ng-template matStepContent>
              <div class="rui-flex rui-flex-col rui-gap-3 rui-py-3">
                <p class="rui-text-sm rui-text-on-surface-variant">Review your information:</p>
                <div class="rui-text-sm rui-text-on-surface">
                  <p><strong>Name:</strong> {{ name || '—' }}</p>
                  <p><strong>Email:</strong> {{ email || '—' }}</p>
                  <p><strong>Phone:</strong> {{ phone || '—' }}</p>
                </div>
                <div class="rui-flex rui-gap-2">
                  <button mat-button matStepperPrevious>Back</button>
                  <button mat-raised-button color="primary" (click)="stepper.reset()">Reset</button>
                </div>
              </div>
            </ng-template>
          </mat-step>
        </mat-horizontal-stepper>
      </div>

      <rui-showcase-code [html]="codeHtml" [ts]="codeTs" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialStepperLinear {
  name = '';
  email = '';
  phone = '';

  protected codeHtml = `<mat-horizontal-stepper [linear]="true">
  <mat-step label="Personal Info">
    <ng-template matStepContent>
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput [(ngModel)]="name" name="name" required>
      </mat-form-field>
      <button mat-raised-button color="primary" matStepperNext>Next</button>
    </ng-template>
  </mat-step>
  <mat-step label="Contact">
    <ng-template matStepContent>
      <mat-form-field>
        <mat-label>Email</mat-label>
        <input matInput [(ngModel)]="email" name="email" type="email" required>
      </mat-form-field>
      <button mat-button matStepperPrevious>Back</button>
      <button mat-raised-button color="primary" matStepperNext>Next</button>
    </ng-template>
  </mat-step>
  <mat-step label="Done">
    <ng-template matStepContent>
      <p>Review your information</p>
      <button mat-button matStepperPrevious>Back</button>
      <button mat-raised-button color="primary" (click)="stepper.reset()">Reset</button>
    </ng-template>
  </mat-step>
</mat-horizontal-stepper>`;

  protected codeTs = `import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

export class MyComponent {
  name = '';
  email = '';
  phone = '';
}`;
}
