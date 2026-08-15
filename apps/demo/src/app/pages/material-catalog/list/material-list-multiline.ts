import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-list-multiline',
  standalone: true,
  imports: [MatListModule, MatIconModule, ShowcaseCode],
  template: `
    <section id="list-multiline" class="rui-mb-8">
      <h2 id="list-multiline" class="rui-font-bold rui-text-on-surface rui-mb-1">Multi-line List</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">mat-list-item with multiple description lines.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface demo-controls rui-p-5">
        <mat-list>
          <mat-list-item>
            <mat-icon matListItemIcon>info</mat-icon>
            <span matListItemTitle>System Update</span>
            <span matListItemLine>Version 3.2.1 is available</span>
            <span matListItemLine>Includes security patches and bug fixes</span>
          </mat-list-item>
          <mat-list-item>
            <mat-icon matListItemIcon>schedule</mat-icon>
            <span matListItemTitle>Meeting Reminder</span>
            <span matListItemLine>Team standup at 10:00 AM</span>
            <span matListItemLine>Conference Room B or Zoom</span>
          </mat-list-item>
        </mat-list>
      </div>

      <rui-showcase-code
        html="<mat-list>
  <mat-list-item>
    <mat-icon matListItemIcon>info</mat-icon>
    <span matListItemTitle>System Update</span>
    <span matListItemLine>Version 3.2.1 is available</span>
    <span matListItemLine>Includes security patches and bug fixes</span>
  </mat-list-item>
  <mat-list-item>
    <mat-icon matListItemIcon>schedule</mat-icon>
    <span matListItemTitle>Meeting Reminder</span>
    <span matListItemLine>Team standup at 10:00 AM</span>
    <span matListItemLine>Conference Room B or Zoom</span>
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
export class MaterialListMultiline {}
