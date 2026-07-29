import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-divider-vertical',
  standalone: true,
  imports: [MatDividerModule, MatButtonModule, MatIconModule, ShowcaseCode],
  template: `
    <section id="divider-vertical" class="rui-mb-8">
      <h2 id="divider-vertical" class="rui-font-bold rui-text-on-surface rui-mb-1">Vertical Divider</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">mat-divider with [vertical]="true" separates items in a flex row.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface rui-p-5">
        <div class="rui-flex rui-items-center rui-gap-3">
          <button mat-icon-button aria-label="Favorite"><mat-icon>favorite</mat-icon></button>
          <mat-divider [vertical]="true" class="rui-h-6"></mat-divider>
          <button mat-icon-button aria-label="Share"><mat-icon>share</mat-icon></button>
          <mat-divider [vertical]="true" class="rui-h-6"></mat-divider>
          <button mat-icon-button aria-label="Delete"><mat-icon>delete</mat-icon></button>
        </div>
      </div>

      <rui-showcase-code
        html='<div style="display:flex;align-items:center;gap:0.75rem;">
  <button mat-icon-button><mat-icon>favorite</mat-icon></button>
  <mat-divider [vertical]="true" class="rui-h-6"></mat-divider>
  <button mat-icon-button><mat-icon>share</mat-icon></button>
  <mat-divider [vertical]="true" class="rui-h-6"></mat-divider>
  <button mat-icon-button><mat-icon>delete</mat-icon></button>
</div>'
        ts="import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// In component imports:
imports: [MatDividerModule, MatButtonModule, MatIconModule],"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialDividerVertical {}
