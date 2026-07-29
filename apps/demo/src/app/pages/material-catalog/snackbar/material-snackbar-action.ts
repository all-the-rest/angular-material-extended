import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-snackbar-action',
  standalone: true,
  imports: [MatSnackBarModule, MatButtonModule, ShowcaseCode],
  template: `
    <section id="snackbar-action" class="rui-mb-8">
      <h2 id="snackbar-action" class="rui-font-bold rui-text-on-surface rui-mb-1">Snackbar with Action</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">A snackbar with an action button (Undo) that lets users reverse the last operation.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface rui-p-5 rui-flex rui-gap-2 rui-flex-wrap rui-items-center">
        <button mat-raised-button color="primary" (click)="openSnackbar()">Delete Item</button>
      </div>

      <rui-showcase-code
        html="<button mat-raised-button color=&quot;primary&quot; (click)=&quot;openSnackbar()&quot;>Delete Item</button>"
        ts="import { Component, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

readonly #snackbar = inject(MatSnackBar);

openSnackbar(): void {
  const ref = this.#snackbar.open('Item deleted', 'Undo', { duration: 3000 });
  ref.onAction().subscribe(() => {
    // Handle undo logic here
  });
}

// In component imports: [MatSnackBarModule, MatButtonModule]"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarAction {
  readonly #snackbar = inject(MatSnackBar);

  openSnackbar(): void {
    const ref = this.#snackbar.open('Item deleted', 'Undo', { duration: 3000 });
    ref.onAction().subscribe(() => {
      this.#snackbar.open('Undo successful', undefined, { duration: 2000 });
    });
  }
}
