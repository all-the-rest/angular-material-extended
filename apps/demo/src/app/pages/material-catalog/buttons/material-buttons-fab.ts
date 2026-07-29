import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-buttons-fab',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, ShowcaseCode],
  template: `
    <section id="button-fab" class="rui-mb-8">
      <h2 id="button-fab" class="rui-font-bold rui-text-on-surface rui-mb-1">Floating Action Buttons</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">mat-fab, mat-mini-fab, and extended FAB with icons.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface rui-p-5 rui-flex rui-gap-3 rui-flex-wrap rui-items-center">
        <button mat-fab color="primary" aria-label="Add">
          <mat-icon>add</mat-icon>
        </button>
        <button mat-mini-fab color="accent" aria-label="Edit">
          <mat-icon>edit</mat-icon>
        </button>
        <button mat-fab extended color="primary">
          <mat-icon>thumb_up</mat-icon>
          Extended FAB
        </button>
        <button mat-fab disabled aria-label="Disabled">
          <mat-icon>block</mat-icon>
        </button>
      </div>

      <rui-showcase-code
        html="<button mat-fab color=&quot;primary&quot; aria-label=&quot;Add&quot;>
  <mat-icon>add</mat-icon>
</button>
<button mat-mini-fab color=&quot;accent&quot; aria-label=&quot;Edit&quot;>
  <mat-icon>edit</mat-icon>
</button>
<button mat-fab extended color=&quot;primary&quot;>
  <mat-icon>thumb_up</mat-icon>
  Extended FAB
</button>
<button mat-fab disabled aria-label=&quot;Disabled&quot;>
  <mat-icon>block</mat-icon>
</button>"
        ts="import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// In component imports:
imports: [MatButtonModule, MatIconModule],"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialButtonsFab {}
