import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RuiBreadcrumb, RuiBreadcrumbItem } from '@all-the.rest/mat-extended/breadcrumb';
import { ShowcaseCode } from '../../shared/showcase-code';
import { RuiCodeHighlight } from '../../shared/code-highlight.directive';

@Component({
  selector: 'rui-breadcrumb-demo',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, RuiBreadcrumb, ShowcaseCode, RuiCodeHighlight],
  templateUrl: './breadcrumb-demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbDemo {
  protected manualItems = signal<RuiBreadcrumbItem[]>([
    { label: 'Home', url: '/', icon: 'home' },
    { label: 'Products', url: '/products', icon: 'category' },
    { label: 'Electronics', url: '/products/electronics' },
  ]);

  protected manualItems2 = signal<RuiBreadcrumbItem[]>([
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Settings', url: '/settings' },
    { label: 'Profile', url: '/settings/profile' },
  ]);

  protected customItems = signal<RuiBreadcrumbItem[]>([
    { label: 'Home', url: '/', icon: 'home' },
    { label: 'Documents', url: '/documents', icon: 'folder' },
    { label: 'Projects', url: '/documents/projects', icon: 'work' },
    { label: '2024', url: '/documents/projects/2024', icon: 'calendar_today' },
  ]);

  protected customItemsHtml = `<rui-breadcrumb
  [items]="[
    { label: 'Home', url: '/', icon: 'home' },
    { label: 'Documents', url: '/documents', icon: 'folder' },
    { label: 'Projects', url: '/documents/projects', icon: 'work' },
    { label: '2024', url: '/documents/projects/2024', icon: 'calendar_today' },
  ]"
/>`;

  protected customItemsTs = `import { signal } from '@angular/core';
import { RuiBreadcrumb, RuiBreadcrumbItem } from '@all-the.rest/mat-extended/breadcrumb';

@Component({
  standalone: true,
  imports: [RuiBreadcrumb],
  template: \`
    <rui-breadcrumb [items]="items()" />
  \`,
})
export class MyComponent {
  items = signal<RuiBreadcrumbItem[]>([
    { label: 'Home', url: '/', icon: 'home' },
    { label: 'Documents', url: '/documents', icon: 'folder' },
    { label: 'Projects', url: '/documents/projects', icon: 'work' },
    { label: '2024', url: '/documents/projects/2024', icon: 'calendar_today' },
  ]);
}`;

  protected manualHtml = `<rui-breadcrumb
  [items]="[
    { label: 'Home', url: '/', icon: 'home' },
    { label: 'Products', url: '/products', icon: 'category' },
    { label: 'Electronics', url: '/products/electronics' },
  ]"
/>`;

  protected manualTs = `import { Component, signal } from '@angular/core';
import { RuiBreadcrumb, RuiBreadcrumbItem } from '@all-the.rest/mat-extended/breadcrumb';

@Component({
  standalone: true,
  imports: [RuiBreadcrumb],
  template: \`
    <rui-breadcrumb [items]="breadcrumbItems()" />
  \`,
})
export class MyComponent {
  protected breadcrumbItems = signal<RuiBreadcrumbItem[]>([
    { label: 'Home', url: '/', icon: 'home' },
    { label: 'Products', url: '/products', icon: 'category' },
    { label: 'Electronics', url: '/products/electronics' },
  ]);
}`;

  protected customSeparatorHtml = `<rui-breadcrumb
  [items]="[
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Settings', url: '/settings' },
    { label: 'Profile', url: '/settings/profile' },
  ]"
  separator="arrow_forward"
/>`;

  protected customSeparatorTs = `import { Component, signal } from '@angular/core';
import { RuiBreadcrumb, RuiBreadcrumbItem } from '@all-the.rest/mat-extended/breadcrumb';

@Component({
  standalone: true,
  imports: [RuiBreadcrumb],
  template: \`
    <rui-breadcrumb
      [items]="breadcrumbItems()"
      separator="arrow_forward"
    />
  \`,
})
export class MyComponent {
  protected breadcrumbItems = signal<RuiBreadcrumbItem[]>([
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Settings', url: '/settings' },
    { label: 'Profile', url: '/settings/profile' },
  ]);
}`;

  protected autoHtml = `<!-- No inputs = auto mode from route data -->
<header>
  <rui-breadcrumb />
</header>`;

  protected autoTs = `// Route data drives the breadcrumb
export const routes: Routes = [
  {
    path: '',
    data: { title: 'Home' },
    component: HomeComponent,
  },
  {
    path: 'products',
    data: { title: 'Products' },
    children: [
      {
        path: 'detail',
        data: { title: 'Product Detail' },
        component: ProductDetailComponent,
      },
    ],
  },
];

// breadcrumb for /products/detail → Home / Products / Product Detail`;

  protected singleCrumbHtml = `<rui-breadcrumb
  [items]="[{ label: 'Home', url: '/' }]"
/>`;

  protected configHtml = `import { RUI_BREADCRUMB_DEFAULT_OPTIONS } from '@all-the.rest/mat-extended/breadcrumb';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    {
      provide: RUI_BREADCRUMB_DEFAULT_OPTIONS,
      useValue: {
        rootLabel: 'Dashboard',
        rootUrl: '/dashboard',
        rootIcon: 'dashboard',
      },
    },
  ],
});`;
}
