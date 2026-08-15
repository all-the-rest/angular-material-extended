import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-expansion-multi',
  standalone: true,
  imports: [MatExpansionModule, ShowcaseCode],
  template: `
    <section id="expansion-multi" class="rui-mb-8">
      <h2 id="expansion-multi" class="rui-font-bold rui-text-on-surface rui-mb-1">Multi Panel</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">mat-accordion with [multi]="true" allows multiple panels open simultaneously.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface demo-controls rui-p-5">
        <mat-accordion [multi]="true">
          <mat-expansion-panel>
            <mat-expansion-panel-header>
              <mat-panel-title>Panel One</mat-panel-title>
            </mat-expansion-panel-header>
            <p class="rui-text-sm rui-text-on-surface-variant">This panel stays open when you open another panel.</p>
          </mat-expansion-panel>

          <mat-expansion-panel>
            <mat-expansion-panel-header>
              <mat-panel-title>Panel Two</mat-panel-title>
            </mat-expansion-panel-header>
            <p class="rui-text-sm rui-text-on-surface-variant">Both panels can remain expanded at the same time.</p>
          </mat-expansion-panel>
        </mat-accordion>
      </div>

      <rui-showcase-code
        html='<mat-accordion [multi]="true">
  <mat-expansion-panel>
    <mat-expansion-panel-header>
      <mat-panel-title>Panel One</mat-panel-title>
    </mat-expansion-panel-header>
    <p>This panel stays open when you open another panel.</p>
  </mat-expansion-panel>

  <mat-expansion-panel>
    <mat-expansion-panel-header>
      <mat-panel-title>Panel Two</mat-panel-title>
    </mat-expansion-panel-header>
    <p>Both panels can remain expanded at the same time.</p>
  </mat-expansion-panel>
</mat-accordion>'
        ts="import { MatExpansionModule } from '@angular/material/expansion';

// In component imports:
imports: [MatExpansionModule],"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialExpansionMulti {}
