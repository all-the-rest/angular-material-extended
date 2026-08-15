import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  template: `
    <h2 mat-dialog-title class="rui-text-lg rui-font-semibold rui-text-on-surface">Confirm Action</h2>
    <mat-dialog-content class="rui-text-sm rui-text-on-surface-variant">
      Are you sure you want to proceed with this action? This cannot be undone.
    </mat-dialog-content>
    <mat-dialog-actions align="end" class="rui-gap-2">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="primary" [mat-dialog-close]="true">Confirm</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ConfirmDialog {}

@Component({
  selector: 'rui-material-dialog-basic',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, ShowcaseCode],
  template: `
    <section id="dialog-basic" class="rui-mb-8">
      <h2 id="dialog-basic" class="rui-font-bold rui-text-on-surface rui-mb-1">Basic Dialog</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">Open a dialog with a custom component using MatDialog service.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface demo-controls rui-p-5 rui-flex rui-gap-2 rui-flex-wrap rui-items-center">
        <button mat-raised-button color="primary" (click)="openDialog()">Open Dialog</button>
        @if (result()) {
          <span class="rui-ml-2 rui-text-sm rui-text-primary">Confirmed: {{ result() }}</span>
        }
      </div>

      <rui-showcase-code
        html="<button mat-raised-button color=&quot;primary&quot; (click)=&quot;openDialog()&quot;>Open Dialog</button>"
        ts="import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

readonly #dialog = inject(MatDialog);
readonly result = signal&lt;string | undefined&gt;(undefined);

openDialog(): void {
  const ref = this.#dialog.open(ConfirmDialog);
  ref.afterClosed().subscribe(r => this.result.set(r ? 'Dialog confirmed' : undefined));
}

// Dialog content component (inline, not exported):
@Component({
  template: \`
    &lt;h2 mat-dialog-title&gt;Confirm Action&lt;/h2&gt;
    &lt;mat-dialog-content&gt;Are you sure...&lt;/mat-dialog-content&gt;
    &lt;mat-dialog-actions&gt;
      &lt;button mat-button mat-dialog-close&gt;Cancel&lt;/button&gt;
      &lt;button mat-raised-button [mat-dialog-close]=&quot;true&quot;&gt;Confirm&lt;/button&gt;
    &lt;/mat-dialog-actions&gt;
  \`,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
class ConfirmDialog {}"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogBasic {
  readonly #dialog = inject(MatDialog);
  readonly result = signal<string | undefined>(undefined);

  openDialog(): void {
    const ref = this.#dialog.open(ConfirmDialog);
    ref.afterClosed().subscribe(r => {
      if (r) {
        this.result.set('Dialog confirmed');
      }
    });
  }
}
