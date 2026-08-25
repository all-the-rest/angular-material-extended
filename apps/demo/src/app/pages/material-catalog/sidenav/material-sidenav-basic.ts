import { Component, ChangeDetectionStrategy, inject, PLATFORM_ID, signal, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-sidenav-basic',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, ShowcaseCode],
  template: `
    <section id="sidenav-basic" class="rui-mb-8">
      <h2 id="sidenav-basic" class="rui-font-bold rui-text-on-surface rui-mb-1">Basic Sidenav</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">mat-drawer-container with a side drawer and content area.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface rui-p-5">
        <mat-drawer-container hasBackdrop class="rui-h-64 rui-rounded rui-border rui-border-outline-variant">
          <mat-drawer
            [mode]="isDesktop() ? 'side' : 'over'"
            [opened]="isDesktop() || drawerOpen()"
            (openedChange)="drawerOpen.set($event)"
            class="rui-w-48 rui-bg-surface-container-low rui-p-3"
          >
            <nav class="rui-flex rui-flex-col rui-gap-1">
              <a style="display:block;padding:0.5rem 0.75rem;border-radius:0.25rem;font-size:0.875rem;color:var(--mat-sys-on-surface);cursor:pointer;">Dashboard</a>
              <a style="display:block;padding:0.5rem 0.75rem;border-radius:0.25rem;font-size:0.875rem;color:var(--mat-sys-on-surface);cursor:pointer;">Settings</a>
              <a style="display:block;padding:0.5rem 0.75rem;border-radius:0.25rem;font-size:0.875rem;color:var(--mat-sys-on-surface);cursor:pointer;">Profile</a>
              <a style="display:block;padding:0.5rem 0.75rem;border-radius:0.25rem;font-size:0.875rem;color:var(--mat-sys-on-surface);cursor:pointer;">Help</a>
              <a style="display:block;padding:0.5rem 0.75rem;border-radius:0.25rem;font-size:0.875rem;color:var(--mat-sys-on-surface);cursor:pointer;">Activity</a>
              <a style="display:block;padding:0.5rem 0.75rem;border-radius:0.25rem;font-size:0.875rem;color:var(--mat-sys-on-surface);cursor:pointer;">Reports</a>
            </nav>
          </mat-drawer>
          <mat-drawer-content class="rui-flex rui-flex-col rui-items-center rui-justify-center rui-gap-3 rui-p-6">
            @if (!isDesktop()) {
              <button mat-raised-button color="primary" (click)="drawerOpen.set(!drawerOpen())">
                {{ drawerOpen() ? 'Close drawer' : 'Open drawer' }}
              </button>
            }
            <p class="rui-text-sm rui-text-on-surface-variant">Main content area. On mobile the drawer overlays the content.</p>
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
export class MaterialSidenavBasic implements OnDestroy {
  protected readonly isDesktop = signal(true);
  protected readonly drawerOpen = signal(false);

  private readonly platformId = inject(PLATFORM_ID);
  private mql?: MediaQueryList;
  private readonly onMediaChange = (event: MediaQueryListEvent): void => this.isDesktop.set(event.matches);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.mql = window.matchMedia('(min-width: 768px)');
      this.isDesktop.set(this.mql.matches);
      this.mql.addEventListener('change', this.onMediaChange);
    }
  }

  ngOnDestroy(): void {
    this.mql?.removeEventListener('change', this.onMediaChange);
  }
}
