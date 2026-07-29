import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-button-toggle-single',
  standalone: true,
  imports: [MatButtonToggleModule, MatIconModule, ShowcaseCode],
  template: `
    <section id="button-toggle-single" class="rui-mb-8">
      <h2 id="button-toggle-single" class="rui-font-bold rui-text-on-surface rui-mb-1">Single Selection</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">Button toggle group with exclusive selection (single choice).</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface rui-p-5">
        <fieldset>
          <legend class="rui-sr-only">Selection mode</legend>
          <mat-button-toggle-group>
            <mat-button-toggle value="bold" aria-label="Bold">
              <mat-icon>format_bold</mat-icon>
            </mat-button-toggle>
            <mat-button-toggle value="italic" aria-label="Italic">
              <mat-icon>format_italic</mat-icon>
            </mat-button-toggle>
            <mat-button-toggle value="underline" aria-label="Underline">
              <mat-icon>format_underline</mat-icon>
            </mat-button-toggle>
          </mat-button-toggle-group>
        </fieldset>
      </div>

      <rui-showcase-code
        html="<mat-button-toggle-group>
  <mat-button-toggle value=&quot;bold&quot; aria-label=&quot;Bold&quot;>
    <mat-icon>format_bold</mat-icon>
  </mat-button-toggle>
  <mat-button-toggle value=&quot;italic&quot; aria-label=&quot;Italic&quot;>
    <mat-icon>format_italic</mat-icon>
  </mat-button-toggle>
  <mat-button-toggle value=&quot;underline&quot; aria-label=&quot;Underline&quot;>
    <mat-icon>format_underline</mat-icon>
  </mat-button-toggle>
</mat-button-toggle-group>"
        ts="import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

// In component imports:
imports: [MatButtonToggleModule, MatIconModule],"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialButtonToggleSingle {}
