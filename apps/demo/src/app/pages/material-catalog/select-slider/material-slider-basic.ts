import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-slider-basic',
  standalone: true,
  imports: [FormsModule, MatSliderModule, MatIconModule, ShowcaseCode],
  template: `
    <section id="slider-basic" class="rui-mb-8">
      <h2 id="slider-basic" class="rui-font-bold rui-text-on-surface rui-mb-1">Basic Slider</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">mat-slider with min/max/step and thumb value display.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface rui-p-5">
        <div class="rui-max-w-xs">
          <mat-slider min="0" max="100" step="1" [style.width]="'100%'">
            <input matSliderThumb [(value)]="sliderValue" />
          </mat-slider>
          <p class="rui-text-xs rui-text-on-surface-variant rui-mt-2">Value: {{ sliderValue }}</p>
        </div>
      </div>

      <rui-showcase-code
        html="<mat-slider min=&quot;0&quot; max=&quot;100&quot; step=&quot;1&quot;&gt;
  &lt;input matSliderThumb [(value)]=&quot;sliderValue&quot; /&gt;
&lt;/mat-slider&gt;"
        ts="import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

// In component imports:
imports: [FormsModule, MatSliderModule],

export class MyComponent {
  sliderValue = 42;
}"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialSliderBasic {
  sliderValue = 42;
}
