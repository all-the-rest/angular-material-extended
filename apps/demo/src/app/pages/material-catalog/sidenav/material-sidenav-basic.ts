import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-sidenav-basic',
  standalone: true,
  imports: [MatSidenavModule, ShowcaseCode],
  template: `
    <section id="sidenav-basic" class="rui-mb-8">
      <h2 id="sidenav-basic" class="rui-font-bold rui-text-on-surface rui-mb-1">Basic Sidenav</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">mat-drawer-container with a side drawer and content area.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface rui-p-5">
        <mat-drawer-container class="rui-h-64 rui-rounded rui-border rui-border-outline-variant">
          <mat-drawer mode="side" opened class="rui-w-48 rui-bg-surface-container-low rui-p-3">
            <nav class="rui-flex rui-flex-col rui-gap-1">
              <a style="display:block;padding:0.5rem 0.75rem;border-radius:0.25rem;font-size:0.875rem;color:var(--mat-sys-on-surface);cursor:pointer;">Dashboard</a>
              <a style="display:block;padding:0.5rem 0.75rem;border-radius:0.25rem;font-size:0.875rem;color:var(--mat-sys-on-surface);cursor:pointer;">Settings</a>
              <a style="display:block;padding:0.5rem 0.75rem;border-radius:0.25rem;font-size:0.875rem;color:var(--mat-sys-on-surface);cursor:pointer;">Profile</a>
              <a style="display:block;padding:0.5rem 0.75rem;border-radius:0.25rem;font-size:0.875rem;color:var(--mat-sys-on-surface);cursor:pointer;">Help</a>
            </nav>
          </mat-drawer>
          <mat-drawer-content class="rui-flex rui-items-center rui-justify-center rui-p-6">
            <p class="rui-text-sm rui-text-on-surface-variant">Main content area. The drawer stays open on the left.</p>
          </mat-drawer-content>
        </mat-drawer-container>
      </div>

      <rui-showcase-code
        html='<mat-drawer-container>
  <mat-drawer mode="side" opened>
    <nav>
      <a>Dashboard</a>
      <a>Settings</a>
      <a>Profile</a>
      <a>Help</a>
    </nav>
  </mat-drawer>
  <mat-drawer-content>
    <p>Main content area. The drawer stays open on the left.</p>
  </mat-drawer-content>
</mat-drawer-container>'
        ts="import { MatSidenavModule } from '@angular/material/sidenav';

// In component imports:
imports: [MatSidenavModule],"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialSidenavBasic {}
