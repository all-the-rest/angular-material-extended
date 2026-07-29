import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-ripples-basic',
  standalone: true,
  imports: [MatRippleModule, MatButtonModule, ShowcaseCode],
  template: `
    <section id="ripples-basic" class="rui-mb-8">
      <h2 id="ripples-basic" class="rui-font-bold rui-text-on-surface rui-mb-1">Basic Ripples</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">matRipple directive on a div container and on a button.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface rui-p-5 rui-flex rui-flex-wrap rui-gap-4 rui-items-center">
        <div
          matRipple
          class="rui-w-48 rui-h-24 rui-flex rui-items-center rui-justify-center rui-rounded rui-cursor-pointer rui-select-none rui-text-sm" style="border:1px solid var(--mat-sys-outline);color:var(--mat-sys-on-surface);background:var(--mat-sys-surface-container-low);"
        >
          Click me for ripple effect
        </div>

        <button mat-raised-button color="primary" matRipple>
          Button with Ripple
        </button>
      </div>

      <rui-showcase-code
        html='<div matRipple style="width:12rem;height:6rem;display:flex;align-items:center;justify-content:center;border:1px solid;border-radius:0.25rem;cursor:pointer;user-select:none;">
  Click me for ripple effect
</div>

<button mat-raised-button color="primary" matRipple>
  Button with Ripple
</button>'
        ts="import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

// In component imports:
imports: [MatRippleModule, MatButtonModule],"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialRipplesBasic {}
