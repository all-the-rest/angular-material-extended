import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-tooltip-show-delay',
  standalone: true,
  imports: [MatButtonModule, MatTooltipModule, ShowcaseCode],
  template: `
    <section id="tooltip-show-delay" class="rui-mb-8">
      <h2 id="tooltip-show-delay" class="rui-font-bold rui-text-on-surface rui-mb-1">Tooltip Show & Hide Delay</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">matTooltipShowDelay and matTooltipHideDelay control when tooltips appear and disappear.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface rui-p-5 rui-flex rui-gap-4 rui-items-center rui-flex-wrap">
        <button mat-raised-button
          matTooltip="1s show / 500ms hide"
          [matTooltipShowDelay]="1000"
          [matTooltipHideDelay]="500">
          Show 1s / Hide 0.5s
        </button>
        <button mat-raised-button
          matTooltip="2s show / 1s hide"
          [matTooltipShowDelay]="2000"
          [matTooltipHideDelay]="1000">
          Show 2s / Hide 1s
        </button>
        <button mat-raised-button
          matTooltip="No delay"
          [matTooltipShowDelay]="0"
          [matTooltipHideDelay]="0">
          No delay
        </button>
      </div>

      <rui-showcase-code
        html="<button mat-raised-button
  matTooltip=&quot;1s show / 500ms hide&quot;
  [matTooltipShowDelay]=&quot;1000&quot;
  [matTooltipHideDelay]=&quot;500&quot;>
  Show 1s / Hide 0.5s
</button>

<button mat-raised-button
  matTooltip=&quot;2s show / 1s hide&quot;
  [matTooltipShowDelay]=&quot;2000&quot;
  [matTooltipHideDelay]=&quot;1000&quot;>
  Show 2s / Hide 1s
</button>

<button mat-raised-button
  matTooltip=&quot;No delay&quot;
  [matTooltipShowDelay]=&quot;0&quot;
  [matTooltipHideDelay]=&quot;0&quot;>
  No delay
</button>"
        ts="import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

// In component imports:
imports: [MatTooltipModule, MatButtonModule],"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialTooltipShowDelay {}
