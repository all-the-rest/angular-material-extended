import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-button-toggle-multi',
  standalone: true,
  imports: [MatButtonToggleModule, MatIconModule, ShowcaseCode],
  template: `
    <section id="button-toggle-multi" class="rui-mb-8">
      <h2 id="button-toggle-multi" class="rui-font-bold rui-text-on-surface rui-mb-1">Multi Selection</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">Button toggle group with multiple selection enabled.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface rui-p-5">
        <fieldset>
          <legend class="rui-sr-only">Selection modes</legend>
          <mat-button-toggle-group [multiple]="true">
            <mat-button-toggle value="fluent" aria-label="Fluent">Fluent</mat-button-toggle>
            <mat-button-toggle value="angular" aria-label="Angular">Angular</mat-button-toggle>
            <mat-button-toggle value="vue" aria-label="Vue">Vue</mat-button-toggle>
            <mat-button-toggle value="react" aria-label="React">React</mat-button-toggle>
          </mat-button-toggle-group>
        </fieldset>
      </div>

      <rui-showcase-code
        html="<mat-button-toggle-group [multiple]=&quot;true&quot;>
  <mat-button-toggle value=&quot;fluent&quot;>Fluent</mat-button-toggle>
  <mat-button-toggle value=&quot;angular&quot;>Angular</mat-button-toggle>
  <mat-button-toggle value=&quot;vue&quot;>Vue</mat-button-toggle>
  <mat-button-toggle value=&quot;react&quot;>React</mat-button-toggle>
</mat-button-toggle-group>"
        ts="import { MatButtonToggleModule } from '@angular/material/button-toggle';

// In component imports:
imports: [MatButtonToggleModule],"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialButtonToggleMulti {}
