import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { RuiToastService, RuiToastPosition } from '@all-the.rest/mat-extended/toast';
import { ShowcaseCode } from '../../shared/showcase-code';

@Component({
  selector: 'rui-toast-demo',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
    ShowcaseCode,
  ],
  template: `
<div class="rui-max-w-4xl rui-mx-auto rui-p-4 rui-md:p-6 rui-space-y-8">
  <h1 class="rui-font-bold">Toast / Notification</h1>

  <section>
    <h2 id="toast-types" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Toast Types</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">Four built-in severity levels with distinct styling and icons.</p>
    <mat-card>
      <mat-card-content class="rui-pt-4">
        <div class="rui-flex rui-gap-4 rui-flex-wrap">
          <button mat-raised-button color="primary" (click)="showSuccess()">Success</button>
          <button mat-raised-button color="warn" (click)="showError()">Error</button>
          <button mat-raised-button (click)="showInfo()">Info</button>
          <button mat-raised-button (click)="showWarning()">Warning</button>
          <button mat-raised-button (click)="dismissAll()">Dismiss All</button>
        </div>
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="toastTypesHtml" [ts]="toastTypesTs" />
  </section>

  <section>
    <h2 id="toast-custom-duration" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Custom Duration</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">Override the default auto-dismiss duration per toast.</p>
    <mat-card>
      <mat-card-content class="rui-pt-4">
        <div style="display:flex;gap:1rem;align-items:flex-end;flex-wrap:wrap;">
          <mat-form-field appearance="outline" style="flex:1;min-width:200px;">
            <mat-label>Message</mat-label>
            <input matInput [(ngModel)]="customMessage" />
          </mat-form-field>
          <mat-form-field appearance="outline" style="width:140px;">
            <mat-label>Duration (ms)</mat-label>
            <input matInput type="number" [(ngModel)]="customDuration" />
          </mat-form-field>
<button mat-raised-button color="primary" (click)="showCustom()">Show Custom</button>
        </div>
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="customDurationHtml" [ts]="customDurationTs" />
  </section>

  <section>
    <h2 id="toast-default-config" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Default Configuration</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">
      Override global toast defaults via the <code>RUI_TOAST_DEFAULT_OPTIONS</code> injection token in your app config.
    </p>
    <mat-card>
      <mat-card-content class="rui-pt-4" />
    </mat-card>
    <rui-showcase-code [html]="defaultConfigHtml" [ts]="defaultConfigTs" />
  </section>

  <section>
    <h2 id="toast-position" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Position</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">Place toasts at any corner or edge of the viewport.</p>
    <mat-card>
      <mat-card-content class="rui-pt-4">
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
          @for (pos of positions; track pos) {
            <button mat-icon-button [matTooltip]="pos" [aria-label]="pos" (click)="showAtPosition(pos)">
              <mat-icon>{{ positionIcons[pos] }}</mat-icon>
            </button>
          }
        </div>
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="positionsHtml" [ts]="positionsTs" />
  </section>
</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastDemo {
  private toastService = inject(RuiToastService);

  customMessage = 'Custom toast message';
  customDuration = 3000;
  positions: RuiToastPosition[] = [
    'top-start',
    'top-center',
    'top-end',
    'bottom-start',
    'bottom-center',
    'bottom-end',
  ];

  positionIcons: Record<RuiToastPosition, string> = {
    'top-start': 'north_west',
    'top-center': 'north',
    'top-end': 'north_east',
    'bottom-start': 'south_west',
    'bottom-center': 'south',
    'bottom-end': 'south_east',
  };

  protected toastTypesHtml = `<button mat-raised-button color="primary" (click)="showSuccess()">Success</button>
<button mat-raised-button color="warn" (click)="showError()">Error</button>
<button mat-raised-button (click)="showInfo()">Info</button>
<button mat-raised-button (click)="showWarning()">Warning</button>
<button mat-raised-button (click)="dismissAll()">Dismiss All</button>`;

  protected toastTypesTs = [
    `import { RuiToastService } from '@all-the.rest/mat-extended/toast';`,
    ``,
    `const toast = inject(RuiToastService);`,
    ``,
    `toast.success('Operation completed!', {`,
    `  action: { label: 'Undo', onClick: () => ... }`,
    `});`,
    `toast.error('Something went wrong!');`,
    `toast.info('You have new messages.');`,
    `toast.warning('Session expiring soon.');`,
  ].join('\n');

  protected customDurationHtml = `<div style="display:flex;gap:1rem;align-items:flex-end;flex-wrap:wrap;">
  <mat-form-field appearance="outline" style="flex:1;min-width:200px;">
    <mat-label>Message</mat-label>
    <input matInput [(ngModel)]="customMessage" />
  </mat-form-field>
  <mat-form-field appearance="outline" style="width:140px;">
    <mat-label>Duration (ms)</mat-label>
    <input matInput type="number" [(ngModel)]="customDuration" />
  </mat-form-field>
  <button mat-raised-button color="primary" (click)="showCustom()">Show Custom</button>
</div>`;

  protected customDurationTs = [
    `toast.show({`,
    `  message: 'Custom message',`,
    `  duration: 5000,`,
    `  kind: 'info',`,
    `});`,
  ].join('\n');

  protected positionsHtml = `@for (pos of positions; track pos) {
  <button mat-icon-button [matTooltip]="pos" [aria-label]="pos" (click)="showAtPosition(pos)">
    <mat-icon>{{ positionIcons[pos] }}</mat-icon>
  </button>
}`;

  protected positionsTs = [
    `toast.show({`,
    `  message: 'Toast message',`,
    `  position: 'top-end',`,
    `  duration: 3000,`,
    `});`,
  ].join('\n');

  protected defaultConfigHtml = `<!-- Default config is set via provider -->`;

  protected defaultConfigTs = [
    `import { ApplicationConfig } from '@angular/core';`,
    `import { RUI_TOAST_DEFAULT_OPTIONS }`,
    `  from '@all-the.rest/mat-extended/toast';`,
    ``,
    `export const appConfig: ApplicationConfig = {`,
    `  providers: [`,
    `    {`,
    `      provide: RUI_TOAST_DEFAULT_OPTIONS,`,
    `      useValue: {`,
    `        duration: 3000,`,
    `        position: 'bottom-start',`,
    `        kind: 'info',`,
    `      },`,
    `    },`,
    `  ],`,
    `};`,
  ].join('\n');

  showSuccess(): void {
    this.toastService.success('Operation completed successfully!', {
      action: { label: 'Undo', onClick: () => console.log('undo') },
    });
  }

  showError(): void {
    this.toastService.error('Something went wrong. Please try again.');
  }

  showInfo(): void {
    this.toastService.info('You have 3 new messages.');
  }

  showWarning(): void {
    this.toastService.warning('Your session will expire in 5 minutes.');
  }

  showCustom(): void {
    this.toastService.show({
      message: this.customMessage,
      duration: this.customDuration,
      kind: 'info',
    });
  }

  showAtPosition(pos: RuiToastPosition): void {
    this.toastService.show({
      message: `Toast at ${pos}`,
      position: pos,
      duration: 3000,
    });
  }

  dismissAll(): void {
    this.toastService.dismissAll();
  }
}
