import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-chips-icon',
  standalone: true,
  imports: [MatChipsModule, MatIconModule, ShowcaseCode],
  template: `
    <section id="chips-icon" class="rui-mb-8">
      <h2 id="chips-icon" class="rui-font-bold rui-text-on-surface rui-mb-1">Chips with Icons</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">mat-chip with mat-icon avatar via matChipAvatar.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface rui-p-5">
        <fieldset>
          <legend class="rui-sr-only">Technologies with icons</legend>
          <mat-chip-set>
            <mat-chip>
              <mat-icon matChipAvatar>home</mat-icon>
              Home
            </mat-chip>
            <mat-chip>
              <mat-icon matChipAvatar>settings</mat-icon>
              Settings
            </mat-chip>
            <mat-chip>
              <mat-icon matChipAvatar>info</mat-icon>
              About
            </mat-chip>
          </mat-chip-set>
        </fieldset>
      </div>

      <rui-showcase-code
        html="<mat-chip-set>
  <mat-chip>
    <mat-icon matChipAvatar>home</mat-icon>
    Home
  </mat-chip>
  <mat-chip>
    <mat-icon matChipAvatar>settings</mat-icon>
    Settings
  </mat-chip>
  <mat-chip>
    <mat-icon matChipAvatar>info</mat-icon>
    About
  </mat-chip>
</mat-chip-set>"
        ts="import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

// In component imports:
imports: [MatChipsModule, MatIconModule],"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialChipsIcon {}
