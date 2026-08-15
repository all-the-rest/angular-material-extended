import { Component, ChangeDetectionStrategy, inject, signal, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RuiDialogService, RuiDialogSize } from '@all-the.rest/mat-extended/dialog';
import { ShowcaseCode } from '../../shared/showcase-code';

@Component({
  selector: 'rui-dialog-demo',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    ShowcaseCode,
  ],
  template: `
<div class="rui-max-w-4xl rui-mx-auto rui-p-4 rui-md:p-6 rui-space-y-8">
  <h1 class="rui-font-bold rui-mb-6">Dialog / Modal</h1>
  <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">
    Modal dialogs with overlay, FocusTrap, configurable sizes, and custom content templates.
  </p>

  <section>
    <h2 id="dialog-sizes" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Dialog Sizes</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">Choose from sm, md, lg, xl, or fullscreen sizes.</p>
    <mat-card>
      <mat-card-content class="rui-pt-4">
        <ng-template #sizeDialog let-dialogRef="dialogRef">
          <p class="rui-text-on-surface-variant">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div class="rui-flex rui-justify-end rui-gap-2 rui-mt-4">
            <button mat-button (click)="dialogRef.close('closed')">Close</button>
          </div>
        </ng-template>
        <div class="rui-flex rui-gap-4 rui-flex-wrap rui-items-center">
          <mat-button-toggle-group [(ngModel)]="selectedSize" aria-label="Dialog size" name="dialog-size">
            @for (size of sizes; track size) {
              <mat-button-toggle [value]="size">{{ size }}</mat-button-toggle>
            }
          </mat-button-toggle-group>
          <button mat-raised-button color="primary" (click)="openWithTemplate(sizeDialog, selectedSize)">
            Open {{ selectedSize }} Dialog
          </button>
        </div>
        <p class="rui-text-xs rui-text-on-surface-variant rui-mt-2">Selected size: <strong class="rui-text-on-surface">{{ selectedSize }}</strong></p>
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="sizesHtml" [ts]="sizesTs" />
  </section>

  <section>
    <h2 id="dialog-custom" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Custom Content</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">Pass custom content and footer templates for full control over layout.</p>
    <mat-card>
      <mat-card-content class="rui-pt-4">
        <ng-template #customContent let-dialogRef="dialogRef">
          <p class="rui-text-on-surface-variant">{{ dialogMessage }}</p>
        </ng-template>
        <ng-template #customFooter let-dialogRef="dialogRef">
          <div class="rui-flex rui-justify-end rui-items-center rui-gap-2 rui-px-6 rui-py-4 rui-border-t rui-border-outline-variant">
            <button mat-button (click)="dialogRef.close('custom closed')">Ok</button>
          </div>
        </ng-template>
        <div class="rui-flex rui-flex-col rui-sm:flex-row rui-gap-4 rui-items-stretch rui-sm:items-end">
          <mat-form-field class="rui-flex-1 rui-min-w-0">
            <mat-label>Title</mat-label>
            <input matInput [(ngModel)]="dialogTitle" />
          </mat-form-field>
          <mat-form-field class="rui-flex-1 rui-min-w-0">
            <mat-label>Message</mat-label>
            <input matInput [(ngModel)]="dialogMessage" />
          </mat-form-field>
          <button class="rui-shrink-0 rui-sm:mb-5" mat-raised-button color="primary" (click)="openWithSlots(customContent, customFooter, dialogTitle)">
            Open Custom
          </button>
        </div>
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="customHtml" [ts]="customTs" />
  </section>

  <section>
    <h2 id="dialog-options" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Options</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">Disable close, go fullscreen, or add confirmation flows.</p>
    <mat-card>
      <mat-card-content class="rui-pt-4">
        <div class="rui-flex rui-gap-4 rui-flex-wrap">
          <ng-template #blockingDialog let-dialogRef="dialogRef">
            <p class="rui-text-on-surface-variant">
              This dialog cannot be closed by pressing Escape or clicking the backdrop.
              Use the button below to close it.
            </p>
            <div class="rui-flex rui-justify-end rui-gap-2 rui-mt-4">
              <button mat-raised-button color="primary" (click)="dialogRef.close('confirmed')">
                Confirm & Close
              </button>
            </div>
          </ng-template>
          <button mat-stroked-button (click)="openBlocking(blockingDialog)">
            Non-dismissible
          </button>

          <ng-template #confirmContent let-dialogRef="dialogRef">
            <p class="rui-text-on-surface">Are you sure you want to delete this item? This action cannot be undone.</p>
          </ng-template>
          <ng-template #confirmFooter let-dialogRef="dialogRef">
            <div class="rui-flex rui-justify-end rui-items-center rui-gap-2 rui-px-6 rui-py-4 rui-border-t rui-border-outline-variant">
              <button mat-stroked-button (click)="dialogRef.dismiss()">Abort</button>
              <button mat-raised-button color="warn" (click)="dialogRef.close('confirmed')">Delete</button>
            </div>
          </ng-template>

          <ng-template #fullscreenDialog let-dialogRef="dialogRef">
            <p class="rui-text-on-surface-variant">
              Fullscreen dialog content. Scroll freely.
            </p>
            <p class="rui-text-on-surface-variant rui-mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <div class="rui-flex rui-justify-end rui-gap-2 rui-mt-4">
              <button mat-button (click)="dialogRef.close('fullscreen closed')">Close</button>
            </div>
          </ng-template>
          <button mat-stroked-button (click)="openWithTemplate(fullscreenDialog, 'fullscreen', 'Fullscreen')">
            Fullscreen
          </button>
          <button mat-raised-button color="warn" (click)="openDeleteConfirm(confirmContent, confirmFooter)">
            Delete Confirmation
          </button>
        </div>
      </mat-card-content>
    </mat-card>
    <rui-showcase-code label="Non-dismissible" [html]="blockingHtml" [ts]="blockingTs" />
    <rui-showcase-code label="Fullscreen" [html]="fullscreenHtml" [ts]="fullscreenTs" />
    <rui-showcase-code label="Confirm Dialog" [html]="confirmHtml" [ts]="confirmTs" />
  </section>

  @if (lastResult(); as result) {
    <mat-card aria-live="polite" role="status">
      <mat-card-content>Dialog closed with: {{ result | json }}</mat-card-content>
    </mat-card>
  }
</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogDemo {
  private dialogService = inject(RuiDialogService);

  sizes: RuiDialogSize[] = ['sm', 'md', 'lg', 'xl'];
  selectedSize: RuiDialogSize = 'md';
  dialogTitle = 'Custom Dialog';
  dialogMessage = 'This is a custom dialog message.';
  lastResult = signal<unknown>(undefined);

  protected sizesHtml = `<ng-template #myDialog let-dialogRef="dialogRef">
  <p>Content here</p>
  <button mat-button (click)="dialogRef.close()">Close</button>
</ng-template>

<button mat-raised-button (click)="open(myDialog)">Open Dialog</button>`;

  protected sizesTs = [
    `const ref = dialogService.open({`,
    `  header: 'My Dialog',`,
    `  template: myDialog,`,
    `  size: 'md', // sm | md | lg | xl`,
    `});`,
  ].join('\n');

  protected customHtml = `<ng-template #dialogContent let-dialogRef="dialogRef">
  <p>{{ dialogMessage }}</p>
</ng-template>
<ng-template #dialogFooter let-dialogRef="dialogRef">
  <div style="display:flex;justify-content:flex-end;align-items:center;gap:0.5rem;padding:1rem 1.5rem;border-top:1px solid var(--mat-sys-outline-variant);">
    <button mat-button (click)="dialogRef.close()">Ok</button>
  </div>
</ng-template>
<button mat-raised-button (click)="open(dialogContent, dialogFooter, dialogTitle)">
  Open Custom
</button>`;

  protected customTs = [
    `const ref = dialogService.open({`,
    `  header: 'Custom Title',`,
    `  contentTemplate: dialogContent,`,
    `  footerTemplate: dialogFooter,`,
    `  size: 'md',`,
    `});`,
    `ref.afterClosed.then(result => {`,
    `  console.log(result);`,
    `});`,
  ].join('\n');

  protected blockingHtml = `<ng-template #blockingDialog let-dialogRef="dialogRef">
  <p>Important content</p>
  <button mat-raised-button (click)="dialogRef.close()">Confirm</button>
</ng-template>

<button mat-stroked-button (click)="openBlocking(blockingDialog)">
  Non-dismissible
</button>`;

  protected blockingTs = [
    `const ref = dialogService.open({`,
    `  header: 'Important',`,
    `  template: blockingDialog,`,
    `  disableClose: true,`,
    `  size: 'sm',`,
    `});`,
  ].join('\n');

  protected fullscreenHtml = `<!-- Same template pattern as above -->
<button mat-stroked-button (click)="openWithTemplate(fullscreenDialog, 'fullscreen', 'Fullscreen')">
  Fullscreen
</button>`;

  protected fullscreenTs = [
    `const ref = dialogService.open({`,
    `  header: 'Fullscreen',`,
    `  template: fullscreenDialog,`,
    `  size: 'fullscreen',`,
    `});`,
  ].join('\n');

  protected confirmHtml = `<ng-template #confirmContent let-dialogRef="dialogRef">
  <p>Are you sure?</p>
</ng-template>
<ng-template #confirmFooter let-dialogRef="dialogRef">
  <div style="display:flex;justify-content:flex-end;align-items:center;gap:0.5rem;padding:1rem 1.5rem;border-top:1px solid var(--mat-sys-outline-variant);">
    <button mat-stroked-button (click)="dialogRef.dismiss()">Abort</button>
    <button mat-raised-button color="warn" (click)="dialogRef.close('confirmed')">Delete</button>
  </div>
</ng-template>

<button mat-raised-button color="warn" (click)="openDeleteConfirm(confirmContent, confirmFooter)">
  Delete Confirmation
</button>`;

  protected confirmTs = [
    `const ref = dialogService.open({`,
    `  header: 'Confirm Delete',`,
    `  contentTemplate: confirmContent,`,
    `  footerTemplate: confirmFooter,`,
    `  size: 'sm',`,
    `});`,
    `ref.afterClosed.then(result => {`,
    `  if (result === 'confirmed') {`,
    `    // proceed with deletion`,
    `  }`,
    `});`,
  ].join('\n');

  openWithTemplate(tpl: TemplateRef<unknown>, size: RuiDialogSize | 'fullscreen' = 'md', header?: string): void {
    const ref = this.dialogService.open({
      header: header ?? `${size.toUpperCase()} Dialog`,
      template: tpl,
      size: size as RuiDialogSize,
    });

    ref.afterClosed.then((result) => {
      this.lastResult.set(result);
    });
  }

  openWithSlots(
    contentTpl: TemplateRef<unknown>,
    footerTpl: TemplateRef<unknown>,
    header?: string,
  ): void {
    const ref = this.dialogService.open({
      header: header ?? 'Custom Dialog',
      contentTemplate: contentTpl,
      footerTemplate: footerTpl,
      size: 'md',
    });

    ref.afterClosed.then((result) => {
      this.lastResult.set(result);
    });
  }

  openBlocking(tpl: TemplateRef<unknown>): void {
    const ref = this.dialogService.open({
      header: 'Important',
      template: tpl,
      disableClose: true,
      size: 'sm',
    });

    ref.afterClosed.then((result) => {
      this.lastResult.set(result);
    });
  }

  openDeleteConfirm(contentTpl: TemplateRef<unknown>, footerTpl: TemplateRef<unknown>): void {
    const ref = this.dialogService.open({
      header: 'Confirm Delete',
      contentTemplate: contentTpl,
      footerTemplate: footerTpl,
      size: 'sm',
    });

    ref.afterClosed.then((result) => {
      this.lastResult.set(result);
    });
  }
}
