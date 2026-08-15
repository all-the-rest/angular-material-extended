import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-buttons-basic',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, ShowcaseCode],
  template: `
    <section id="button-variants" class="rui-mb-8">
      <h2 id="button-variants" class="rui-font-bold rui-text-on-surface rui-mb-1">Basic Variants</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">mat-button, mat-raised-button, mat-stroked-button, mat-flat-button with color variants.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface demo-controls rui-p-5 rui-flex rui-gap-2 rui-flex-wrap rui-items-center">
        <button mat-button>Basic</button>
        <button mat-raised-button color="primary">Primary</button>
        <button mat-stroked-button color="accent">Accent</button>
        <button mat-flat-button color="warn">Warn</button>
        <button mat-raised-button color="primary" disabled>Disabled</button>
      </div>

      <rui-showcase-code
        html="<button mat-button>Basic</button>
<button mat-raised-button color=&quot;primary&quot;>Primary</button>
<button mat-stroked-button color=&quot;accent&quot;>Accent</button>
<button mat-flat-button color=&quot;warn&quot;>Warn</button>
<button mat-raised-button color=&quot;primary&quot; disabled>Disabled</button>"
        ts="import { MatButtonModule } from '@angular/material/button';

// In component imports:
imports: [MatButtonModule],"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialButtonsBasic {}
