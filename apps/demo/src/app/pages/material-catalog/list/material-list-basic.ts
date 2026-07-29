import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-list-basic',
  standalone: true,
  imports: [MatListModule, MatIconModule, ShowcaseCode],
  template: `
    <section id="list-basic" class="rui-mb-8">
      <h2 id="list-basic" class="rui-font-bold rui-text-on-surface rui-mb-1">Basic List</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">mat-list with mat-list-item, icons, titles and description lines.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface rui-p-5">
        <mat-list>
          <mat-list-item>
            <mat-icon matListItemIcon>inbox</mat-icon>
            <span matListItemTitle>Inbox</span>
            <span matListItemLine>3 new messages</span>
          </mat-list-item>
          <mat-list-item>
            <mat-icon matListItemIcon>star</mat-icon>
            <span matListItemTitle>Starred</span>
            <span matListItemLine>5 items</span>
          </mat-list-item>
          <mat-list-item>
            <mat-icon matListItemIcon>send</mat-icon>
            <span matListItemTitle>Sent</span>
            <span matListItemLine>View sent mail</span>
          </mat-list-item>
        </mat-list>
      </div>

      <rui-showcase-code
        html="<mat-list>
  <mat-list-item>
    <mat-icon matListItemIcon>inbox</mat-icon>
    <span matListItemTitle>Inbox</span>
    <span matListItemLine>3 new messages</span>
  </mat-list-item>
  <mat-list-item>
    <mat-icon matListItemIcon>star</mat-icon>
    <span matListItemTitle>Starred</span>
    <span matListItemLine>5 items</span>
  </mat-list-item>
  <mat-list-item>
    <mat-icon matListItemIcon>send</mat-icon>
    <span matListItemTitle>Sent</span>
    <span matListItemLine>View sent mail</span>
  </mat-list-item>
</mat-list>"
        ts="import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

// In component imports:
imports: [MatListModule, MatIconModule],"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialListBasic {}
