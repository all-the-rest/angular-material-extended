import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-icon-svg',
  standalone: true,
  imports: [MatIconModule, ShowcaseCode],
  template: `
    <section id="icon-svg" class="rui-mb-8">
      <h2 id="icon-svg" class="rui-font-bold rui-text-on-surface rui-mb-1">Icon Sizes</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">mat-icon sized via font-size CSS.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface demo-controls rui-p-5 rui-flex rui-gap-3 rui-items-center rui-flex-wrap rui-text-on-surface-variant">
        <mat-icon style="font-size: 18px">home</mat-icon>
        <mat-icon style="font-size: 24px">favorite</mat-icon>
        <mat-icon style="font-size: 32px" color="primary">star</mat-icon>
        <mat-icon style="font-size: 40px" color="accent">warning</mat-icon>
        <mat-icon style="font-size: 48px" color="warn">settings</mat-icon>
      </div>

      <rui-showcase-code
        html="<mat-icon style=&quot;font-size: 18px&quot;>home</mat-icon>
<mat-icon style=&quot;font-size: 24px&quot;>favorite</mat-icon>
<mat-icon style=&quot;font-size: 32px&quot; color=&quot;primary&quot;>star</mat-icon>
<mat-icon style=&quot;font-size: 40px&quot; color=&quot;accent&quot;>warning</mat-icon>
<mat-icon style=&quot;font-size: 48px&quot; color=&quot;warn&quot;>settings</mat-icon>"
        ts="import { MatIconModule } from '@angular/material/icon';

// In component imports:
imports: [MatIconModule],"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialIconSvg {}
