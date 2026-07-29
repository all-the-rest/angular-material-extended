import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-menu-basic',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, MatIconModule, MatDividerModule, ShowcaseCode],
  template: `
    <section id="menu-basic" class="rui-mb-8">
      <h2 id="menu-basic" class="rui-font-bold rui-text-on-surface rui-mb-1">Basic Menu</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">A simple dropdown menu with text items triggered by a button.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface rui-p-5 rui-flex rui-gap-2 rui-flex-wrap rui-items-center">
        <button mat-raised-button color="primary" [matMenuTriggerFor]="menu">Menu</button>
        <mat-menu #menu="matMenu">
          <button mat-menu-item>Refresh</button>
          <button mat-menu-item>Settings</button>
          <button mat-menu-item>Help</button>
          <mat-divider></mat-divider>
          <button mat-menu-item class="rui-text-error">Sign out</button>
        </mat-menu>
      </div>

      <rui-showcase-code
        html="<button mat-raised-button color=&quot;primary&quot; [matMenuTriggerFor]=&quot;menu&quot;>Menu</button>
<mat-menu #menu=&quot;matMenu&quot;>
  <button mat-menu-item>Refresh</button>
  <button mat-menu-item>Settings</button>
  <button mat-menu-item>Help</button>
  <mat-divider></mat-divider>
  <button mat-menu-item>Sign out</button>
</mat-menu>"
        ts="import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

// In component imports: [MatMenuModule, MatButtonModule]"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuBasic {}
