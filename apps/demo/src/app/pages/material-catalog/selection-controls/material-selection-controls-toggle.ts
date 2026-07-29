import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-selection-controls-toggle',
  standalone: true,
  imports: [MatSlideToggleModule, MatIconModule, ShowcaseCode],
  template: `
    <section id="selection-controls-toggle" class="rui-mb-8">
      <h2 id="selection-controls-toggle" class="rui-font-bold rui-text-on-surface rui-mb-1">Slide Toggle</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">mat-slide-toggle with off, on, and disabled states.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface rui-p-5 rui-flex rui-gap-4 rui-flex-wrap rui-items-center">
        <fieldset>
          <legend class="rui-sr-only">Toggles</legend>
          <mat-slide-toggle>Off</mat-slide-toggle>
          <mat-slide-toggle checked>On</mat-slide-toggle>
          <mat-slide-toggle disabled>Disabled</mat-slide-toggle>
        </fieldset>
      </div>

      <rui-showcase-code
        html="<mat-slide-toggle>Off</mat-slide-toggle>
<mat-slide-toggle checked>On</mat-slide-toggle>
<mat-slide-toggle disabled>Disabled</mat-slide-toggle>"
        ts="import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// In component imports:
imports: [MatSlideToggleModule],"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialSelectionControlsToggle {}
