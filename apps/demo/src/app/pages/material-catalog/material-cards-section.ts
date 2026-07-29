import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MaterialCardsBasic } from './cards-section/material-cards-basic';

@Component({
  selector: 'rui-material-cards-section',
  standalone: true,
  imports: [MaterialCardsBasic],
  template: `
    <div class="rui-p-4 rui-md:p-6 rui-space-y-2">
      <div class="rui-mb-6">
        <h1 class="rui-font-bold rui-text-on-surface">Cards</h1>
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-1">mat-card with header, image, content, actions, and footer sections</p>
      </div>

      <rui-material-cards-basic />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialCardsSection {}
