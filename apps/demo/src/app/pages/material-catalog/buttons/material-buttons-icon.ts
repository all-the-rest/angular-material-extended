import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-buttons-icon',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, ShowcaseCode],
  template: `
    <section id="button-icon" class="rui-mb-8">
      <h2 id="button-icon" class="rui-font-bold rui-text-on-surface rui-mb-1">Icon Buttons</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">mat-icon-button with different colors and states.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface demo-controls rui-p-5 rui-flex rui-gap-2 rui-flex-wrap rui-items-center">
        <button mat-icon-button aria-label="Favorite">
          <mat-icon>favorite</mat-icon>
        </button>
        <button mat-icon-button color="primary" aria-label="Home">
          <mat-icon>home</mat-icon>
        </button>
        <button mat-icon-button color="accent" aria-label="Settings">
          <mat-icon>settings</mat-icon>
        </button>
        <button mat-icon-button color="warn" aria-label="Delete">
          <mat-icon>delete</mat-icon>
        </button>
        <button mat-icon-button disabled aria-label="Disabled">
          <mat-icon>block</mat-icon>
        </button>
      </div>

      <rui-showcase-code
        html="<button mat-icon-button aria-label=&quot;Favorite&quot;>
  <mat-icon>favorite</mat-icon>
</button>
<button mat-icon-button color=&quot;primary&quot; aria-label=&quot;Home&quot;>
  <mat-icon>home</mat-icon>
</button>
<button mat-icon-button color=&quot;accent&quot; aria-label=&quot;Settings&quot;>
  <mat-icon>settings</mat-icon>
</button>
<button mat-icon-button color=&quot;warn&quot; aria-label=&quot;Delete&quot;>
  <mat-icon>delete</mat-icon>
</button>
<button mat-icon-button disabled aria-label=&quot;Disabled&quot;>
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
export class MaterialButtonsIcon {}
