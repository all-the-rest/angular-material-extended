import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-icon-basic',
  standalone: true,
  imports: [MatIconModule, ShowcaseCode],
  template: `
    <section id="icon-basic" class="rui-mb-8">
      <h2 id="icon-basic" class="rui-font-bold rui-text-on-surface rui-mb-1">Material Icons</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">mat-icon with color variants.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface demo-controls rui-p-5 rui-grid rui-grid-cols-4 rui-sm:grid-cols-6 rui-gap-x-2 rui-gap-y-4 rui-justify-items-center rui-text-on-surface-variant">
        <mat-icon>home</mat-icon>
        <mat-icon color="primary">favorite</mat-icon>
        <mat-icon color="accent">star</mat-icon>
        <mat-icon color="warn">warning</mat-icon>
        <mat-icon>settings</mat-icon>
        <mat-icon>person</mat-icon>
        <mat-icon>search</mat-icon>
        <mat-icon>menu</mat-icon>
        <mat-icon>close</mat-icon>
        <mat-icon>check_circle</mat-icon>
        <mat-icon>delete</mat-icon>
        <mat-icon>edit</mat-icon>
      </div>

      <rui-showcase-code
        html="<mat-icon>home</mat-icon>
<mat-icon color=&quot;primary&quot;>favorite</mat-icon>
<mat-icon color=&quot;accent&quot;>star</mat-icon>
<mat-icon color=&quot;warn&quot;>warning</mat-icon>
<mat-icon>settings</mat-icon>
<mat-icon>person</mat-icon>
<mat-icon>search</mat-icon>
<mat-icon>menu</mat-icon>
<mat-icon>close</mat-icon>
<mat-icon>check_circle</mat-icon>
<mat-icon>delete</mat-icon>
<mat-icon>edit</mat-icon>"
        ts="import { MatIconModule } from '@angular/material/icon';

// In component imports:
imports: [MatIconModule],"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialIconBasic {}
