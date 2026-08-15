import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-snackbar-basic',
  standalone: true,
  imports: [MatSnackBarModule, MatButtonModule, ShowcaseCode],
  template: `
    <section id="snackbar-basic" class="rui-mb-8">
      <h2 id="snackbar-basic" class="rui-font-bold rui-text-on-surface rui-mb-1">Basic Snackbar</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">A simple snackbar with a text message that auto-dismisses after a few seconds.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface demo-controls rui-p-5 rui-flex rui-gap-2 rui-flex-wrap rui-items-center">
        <button mat-raised-button color="primary" (click)="openSnackbar()">Show Snackbar</button>
        <p class="rui-text-xs rui-text-on-surface-variant rui-mt-1 rui-w-full">Tap the button to show a snackbar.</p>
      </div>

      <rui-showcase-code
        html="<button mat-raised-button color=&quot;primary&quot; (click)=&quot;openSnackbar()&quot;>Show Snackbar</button>"
        ts="import { Component, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

readonly #snackbar = inject(MatSnackBar);

openSnackbar(): void {
  this.#snackbar.open('Item saved successfully', 'Close', { duration: 3000 });
}

// In component imports: [MatSnackBarModule, MatButtonModule]"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarBasic {
  readonly #snackbar = inject(MatSnackBar);

  openSnackbar(message = 'This is a snackbar message'): void {
    this.#snackbar.open(message, undefined, { duration: 3000 });
  }
}
