import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RuiMenuButton } from '@all-the.rest/mat-extended/menu';
import type { RuiMenuItem } from '@all-the.rest/mat-extended/menu';
import { ShowcaseCode } from '../../shared/showcase-code';

@Component({
  selector: 'rui-menu-demo',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    RuiMenuButton,
    ShowcaseCode,
  ],
  template: `
<div class="rui-max-w-4xl rui-mx-auto rui-p-4 rui-md:p-6 rui-space-y-8">
  <h1 class="rui-font-bold">Menu / Hamburger</h1>
  <p class="rui-text-sm rui-text-on-surface-variant">
    Context menu with icons, separators, disabled items, keyboard navigation, and submenus.
  </p>

  <section>
    <h2 id="menu-basic" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Basic Hamburger Menu</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">Simple menu with text-only items and click handlers.</p>
    <mat-card>
      <mat-card-content class="rui-pt-4">
        <rui-menu-button [items]="menuItems" />
        <p class="rui-text-xs rui-text-on-surface-variant rui-mt-2">Tap the hamburger button to open the menu.</p>
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="basicHtml" [ts]="basicTs" />
  </section>

  <section>
    <h2 id="menu-icons" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Menu with Icons</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">Add leading Material icons to menu items.</p>
    <mat-card>
      <mat-card-content class="rui-pt-4">
        <rui-menu-button [items]="iconMenuItems" />
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="iconHtml" [ts]="iconTs" />
  </section>

  <section>
    <h2 id="menu-disabled" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Menu with Disabled Items</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">Mark items as disabled to prevent interaction.</p>
    <mat-card>
      <mat-card-content class="rui-pt-4">
        <rui-menu-button [items]="disabledMenuItems" />
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="disabledHtml" [ts]="disabledTs" />
  </section>

  <section>
    <h2 id="menu-divider" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Menu with Divider / Separator</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">Group related items with separators and nested submenus.</p>
    <mat-card>
      <mat-card-content class="rui-pt-4">
        <rui-menu-button [items]="advancedMenuItems" />
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="advancedHtml" [ts]="advancedTs" />
  </section>

  <section>
    <h2 id="menu-router-links" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Menu with Router Links</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">Use <code>routerLink</code> for navigation items instead of click handlers.</p>
    <mat-card>
      <mat-card-content class="rui-pt-4">
        <rui-menu-button [items]="routerMenuItems" />
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="routerHtml" [ts]="routerTs" />
  </section>
</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuDemo {
  menuItems: RuiMenuItem[] = [
    { label: 'Profile', handler: () => alert('Profile') },
    { label: 'Settings', handler: () => alert('Settings') },
    { separator: true },
    { label: 'Help', handler: () => alert('Help') },
    { label: 'Logout', handler: () => alert('Logout') },
  ];

  iconMenuItems: RuiMenuItem[] = [
    { label: 'Edit', icon: 'edit', handler: () => alert('Edit') },
    { label: 'Copy', icon: 'content_copy', handler: () => alert('Copy') },
    { label: 'Delete', icon: 'delete', handler: () => alert('Delete') },
  ];

  disabledMenuItems: RuiMenuItem[] = [
    { label: 'New File', icon: 'description', handler: () => alert('New File') },
    { label: 'Open', icon: 'folder_open', handler: () => alert('Open') },
    { separator: true },
    { label: 'Save', icon: 'save', handler: () => alert('Save') },
    { label: 'Save As...', icon: 'save_as', handler: () => alert('Save As...'), disabled: true },
  ];

   advancedMenuItems: RuiMenuItem[] = [
    { label: 'New File', icon: 'description', handler: () => alert('New File') },
    { label: 'Open', icon: 'folder_open', handler: () => alert('Open') },
    { separator: true },
    { label: 'Save', icon: 'save', handler: () => alert('Save') },
    { label: 'Save As...', icon: 'save_as', handler: () => alert('Save As...'), disabled: true },
    { separator: true },
    { label: 'Export', icon: 'file_upload', children: [
      { label: 'PDF', handler: () => alert('Export PDF') },
      { label: 'CSV', handler: () => alert('Export CSV') },
    ]},
    { label: 'Print', icon: 'print', handler: () => alert('Print') },
  ];

  routerMenuItems: RuiMenuItem[] = [
    { label: 'Dashboard', icon: 'dashboard', routerLink: '/dashboard' },
    { label: 'Settings', icon: 'settings', routerLink: '/settings' },
    { separator: true },
    { label: 'User Profile', icon: 'person', routerLink: ['/users', '123'] },
    { label: 'Logout', icon: 'logout', handler: () => alert('Logout') },
  ];

  protected basicHtml = `<rui-menu-button [items]="menuItems" />`;

  protected basicTs = [
    `import { RuiMenuButton } from '@all-the.rest/mat-extended/menu';`,
    `import type { RuiMenuItem } from '@all-the.rest/mat-extended/menu';`,
    ``,
    `@Component({`,
    `  imports: [RuiMenuButton],`,
    `})`,
    `export class MyComponent {`,
    `  menuItems: RuiMenuItem[] = [`,
    `    { label: 'Profile', handler: () => ... },`,
    `    { label: 'Settings', handler: () => ... },`,
    `    { separator: true },`,
    `    { label: 'Logout', handler: () => ... },`,
    `  ];`,
    `}`,
  ].join('\n');

  protected iconHtml = `<rui-menu-button [items]="iconMenuItems" />`;

  protected iconTs = [
    `import { RuiMenuButton } from '@all-the.rest/mat-extended/menu';`,
    `import type { RuiMenuItem } from '@all-the.rest/mat-extended/menu';`,
    ``,
    `@Component({`,
    `  imports: [RuiMenuButton],`,
    `})`,
    `export class MyComponent {`,
    `  iconMenuItems: RuiMenuItem[] = [`,
    `    { label: 'Edit', icon: 'edit', handler: () => ... },`,
    `    { label: 'Copy', icon: 'content_copy', handler: () => ... },`,
    `    { label: 'Delete', icon: 'delete', handler: () => ... },`,
    `  ];`,
    `}`,
  ].join('\n');

  protected disabledHtml = `<rui-menu-button [items]="disabledMenuItems" />`;

  protected disabledTs = [
    `import { RuiMenuButton } from '@all-the.rest/mat-extended/menu';`,
    `import type { RuiMenuItem } from '@all-the.rest/mat-extended/menu';`,
    ``,
    `@Component({`,
    `  imports: [RuiMenuButton],`,
    `})`,
    `export class MyComponent {`,
    `  disabledMenuItems: RuiMenuItem[] = [`,
    `    { label: 'New File', icon: 'description', handler: () => ... },`,
    `    { label: 'Open', icon: 'folder_open', handler: () => ... },`,
    `    { separator: true },`,
    `    { label: 'Save', icon: 'save', handler: () => ... },`,
    `    { label: 'Save As...', icon: 'save_as', handler: () => ..., disabled: true },`,
    `  ];`,
    `}`,
  ].join('\n');

   protected advancedHtml = `<rui-menu-button [items]="advancedMenuItems" />`;

   protected advancedTs = [
    `import { RuiMenuButton } from '@all-the.rest/mat-extended/menu';`,
    `import type { RuiMenuItem } from '@all-the.rest/mat-extended/menu';`,
    ``,
    `@Component({`,
    `  imports: [RuiMenuButton],`,
    `})`,
    `export class MyComponent {`,
    `  advancedMenuItems: RuiMenuItem[] = [`,
    `    { label: 'New File', icon: 'description', handler: () => ... },`,
    `    { label: 'Open', icon: 'folder_open', handler: () => ... },`,
    `    { separator: true },`,
    `    { label: 'Save', icon: 'save', handler: () => ... },`,
    `    { label: 'Save As...', icon: 'save_as', handler: () => ..., disabled: true },`,
    `    { separator: true },`,
    `    { label: 'Export', icon: 'file_upload', children: [`,
    `      { label: 'PDF', handler: () => ... },`,
    `      { label: 'CSV', handler: () => ... },`,
    `    ]},`,
    `    { label: 'Print', icon: 'print', handler: () => ... },`,
    `  ];`,
    `}`,
  ].join('\n');

  protected routerHtml = `<rui-menu-button [items]="routerMenuItems" />`;

  protected routerTs = [
    `import { RuiMenuButton } from '@all-the.rest/mat-extended/menu';`,
    `import type { RuiMenuItem } from '@all-the.rest/mat-extended/menu';`,
    ``,
    `@Component({`,
    `  imports: [RuiMenuButton],`,
    `})`,
    `export class MyComponent {`,
    `  routerMenuItems: RuiMenuItem[] = [`,
    `    { label: 'Dashboard', icon: 'dashboard', routerLink: '/dashboard' },`,
    `    { label: 'Settings', icon: 'settings', routerLink: '/settings' },`,
    `    { separator: true },`,
    `    { label: 'User Profile', icon: 'person', routerLink: ['/users', '123'] },`,
    `    { label: 'Logout', icon: 'logout', handler: () => ... },`,
    `  ];`,
    `}`,
  ].join('\n');
}
