import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-toolbar-multi-row',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatTabsModule, ShowcaseCode],
  template: `
    <section id="toolbar-multi-row" class="rui-mb-8">
      <h2 id="toolbar-multi-row" class="rui-font-bold rui-text-on-surface rui-mb-1">Multi-Row Toolbar</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">Two stacked mat-toolbar rows: one for branding and actions, one for navigation tabs.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface rui-p-5">
        <mat-toolbar color="primary" class="rui-rounded-t">
          <button mat-icon-button aria-label="Menu">
            <mat-icon>menu</mat-icon>
          </button>
          <span class="rui-ml-2">My App</span>
          <span class="rui-flex-1"></span>
          <button mat-icon-button aria-label="Notifications">
            <mat-icon>notifications</mat-icon>
          </button>
          <button mat-icon-button aria-label="Account">
            <mat-icon>account_circle</mat-icon>
          </button>
        </mat-toolbar>
        <mat-toolbar style="border-top:1px solid var(--mat-sys-outline-variant);background:var(--mat-sys-surface-container);">
          <mat-tab-group class="rui-w-full">
            <mat-tab label="Overview"></mat-tab>
            <mat-tab label="Details"></mat-tab>
            <mat-tab label="Settings"></mat-tab>
          </mat-tab-group>
        </mat-toolbar>
      </div>

      <rui-showcase-code
        html='<mat-toolbar color="primary">
  <button mat-icon-button aria-label="Menu">
    <mat-icon>menu</mat-icon>
  </button>
  <span>My App</span>
  <span class="rui-flex-1"></span>
  <button mat-icon-button>
    <mat-icon>notifications</mat-icon>
  </button>
  <button mat-icon-button>
    <mat-icon>account_circle</mat-icon>
  </button>
</mat-toolbar>
<mat-toolbar>
  <mat-tab-group class="rui-w-full">
    <mat-tab label="Overview"></mat-tab>
    <mat-tab label="Details"></mat-tab>
    <mat-tab label="Settings"></mat-tab>
  </mat-tab-group>
</mat-toolbar>'
        ts="import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

// In component imports:
imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatTabsModule],"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialToolbarMultiRow {}
