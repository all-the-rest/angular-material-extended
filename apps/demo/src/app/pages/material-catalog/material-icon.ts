import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MaterialIconBasic } from './icon/material-icon-basic';
import { MaterialIconSvg } from './icon/material-icon-svg';

@Component({
  selector: 'rui-material-icon',
  standalone: true,
  imports: [MaterialIconBasic, MaterialIconSvg],
  template: `
    <div class="rui-p-4 rui-md:p-6 rui-space-y-2">
      <div class="rui-mb-6">
        <h1 class="rui-font-bold rui-text-on-surface">Icons</h1>
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-1">mat-icon with color variants, sizes, and SVG support.</p>
      </div>

      <rui-material-icon-basic />
      <rui-material-icon-svg />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialIcon {}
