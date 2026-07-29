import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-stepper-non-linear',
  standalone: true,
  imports: [MatStepperModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, ShowcaseCode],
  template: `
    <section id="stepper-non-linear" class="rui-mb-8">
      <h2 id="stepper-non-linear" class="rui-font-bold rui-text-on-surface rui-mb-1">Non-Linear Stepper</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">Vertical non-linear stepper allows free navigation between steps.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface rui-p-5">
        <mat-vertical-stepper [linear]="false" #verticalStepper>
          <mat-step label="Basic Info" [editable]="true">
            <ng-template matStepContent>
              <div class="rui-flex rui-flex-col rui-gap-4 rui-py-3">
                <mat-form-field>
                  <mat-label>First Name</mat-label>
                  <input matInput [(ngModel)]="firstName" name="firstName">
                </mat-form-field>
                <mat-form-field>
                  <mat-label>Last Name</mat-label>
                  <input matInput [(ngModel)]="lastName" name="lastName">
                </mat-form-field>
                <div class="rui-flex rui-gap-2">
                  <button mat-raised-button color="primary" matStepperNext>Next</button>
                </div>
              </div>
            </ng-template>
          </mat-step>

          <mat-step label="Additional Info" [editable]="true">
            <ng-template matStepContent>
              <div class="rui-flex rui-flex-col rui-gap-4 rui-py-3">
                <mat-form-field>
                  <mat-label>Company</mat-label>
                  <input matInput [(ngModel)]="company" name="company">
                </mat-form-field>
                <mat-form-field>
                  <mat-label>Notes</mat-label>
                  <textarea matInput [(ngModel)]="notes" name="notes" rows="2"></textarea>
                </mat-form-field>
                <div class="rui-flex rui-gap-2">
                  <button mat-button matStepperPrevious>Back</button>
                  <button mat-raised-button color="primary" (click)="verticalStepper.reset()">Done</button>
                </div>
              </div>
            </ng-template>
          </mat-step>
        </mat-vertical-stepper>
      </div>

      <rui-showcase-code [html]="codeHtml" [ts]="codeTs" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialStepperNonLinear {
  firstName = '';
  lastName = '';
  company = '';
  notes = '';

  protected codeHtml = `<mat-vertical-stepper [linear]="false">
  <mat-step label="Basic Info" [editable]="true">
    <ng-template matStepContent>
      <mat-form-field>
        <mat-label>First Name</mat-label>
        <input matInput [(ngModel)]="firstName" name="firstName">
      </mat-form-field>
      <button mat-raised-button color="primary" matStepperNext>Next</button>
    </ng-template>
  </mat-step>
  <mat-step label="Additional Info" [editable]="true">
    <ng-template matStepContent>
      <mat-form-field>
        <mat-label>Company</mat-label>
        <input matInput [(ngModel)]="company" name="company">
      </mat-form-field>
      <button mat-button matStepperPrevious>Back</button>
      <button mat-raised-button color="primary" (click)="stepper.reset()">Done</button>
    </ng-template>
  </mat-step>
</mat-vertical-stepper>`;

  protected codeTs = `import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

export class MyComponent {
  firstName = '';
  lastName = '';
  company = '';
  notes = '';
}`;
}
