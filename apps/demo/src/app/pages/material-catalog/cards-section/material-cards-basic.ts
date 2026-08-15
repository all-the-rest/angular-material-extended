import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-cards-basic',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, ShowcaseCode],
  template: `
    <section id="cards-basic" class="rui-mb-8">
      <h2 id="cards-basic" class="rui-font-bold rui-text-on-surface rui-mb-1">Basic Card</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">mat-card with header, image, content, actions, and footer sections.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface demo-controls rui-p-5">
        <mat-card style="border:1px solid var(--mat-sys-outline-variant);box-shadow:none;max-width:24rem;">
          <mat-card-header>
            <mat-icon mat-card-avatar>article</mat-icon>
            <mat-card-title>Card Title</mat-card-title>
            <mat-card-subtitle>Card Subtitle</mat-card-subtitle>
          </mat-card-header>
          <img mat-card-image src="https://picsum.photos/seed/card/300/150" alt="Card image" />
          <mat-card-content>
            <p class="rui-text-sm rui-text-on-surface">This is the card content area with descriptive text and other elements.</p>
          </mat-card-content>
          <mat-card-actions class="rui-flex rui-gap-2">
            <button mat-button color="primary">Action</button>
            <button mat-button>Cancel</button>
          </mat-card-actions>
          <mat-card-footer class="px-4 pb-3">
            <p class="rui-text-xs rui-text-on-surface-variant">Card footer</p>
          </mat-card-footer>
        </mat-card>
      </div>

      <rui-showcase-code
        html='<mat-card style="border:1px solid var(--mat-sys-outline-variant);box-shadow:none;max-width:24rem;">
  <mat-card-header>
    <mat-icon mat-card-avatar>article</mat-icon>
    <mat-card-title>Card Title</mat-card-title>
    <mat-card-subtitle>Card Subtitle</mat-card-subtitle>
  </mat-card-header>
  <img mat-card-image src="https://picsum.photos/seed/card/300/150" alt="Card image" />
  <mat-card-content>
    <p>Card content area.</p>
  </mat-card-content>
  <mat-card-actions class="rui-flex rui-gap-2">
    <button mat-button color="primary">Action</button>
    <button mat-button>Cancel</button>
  </mat-card-actions>
  <mat-card-footer>
    <p>Card footer</p>
  </mat-card-footer>
</mat-card>'
        ts="import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// In component imports:
imports: [MatCardModule, MatButtonModule, MatIconModule],"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialCardsBasic {}
