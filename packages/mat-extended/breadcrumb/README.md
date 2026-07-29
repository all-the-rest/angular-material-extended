# @all-the.rest/mat-extended/breadcrumb

> **Angular Material Extended** is an **unofficial** community extension and is
> NOT affiliated with Google, the Angular Team, or the Angular Material project.
> "Angular" and "Material" are trademarks of Google LLC.

A standalone breadcrumb component for Angular Material, built with Signals and
Tailwind CSS. Supports both automatic route-based breadcrumb generation via
`RuiBreadcrumbService` and manual breadcrumbs via `items` input.

## Installation

```bash
pnpm add @all-the.rest/mat-extended
```

## Usage

### Auto-Mode via Service

Annotate your routes with `data.title` (or `data.breadcrumb` to override):

```ts
export const routes: Routes = [
  { path: '', data: { title: 'Home' }, component: HomeComponent },
  { path: 'products', data: { title: 'Products' }, component: ProductsComponent },
  { path: 'products/:id', data: { title: 'Product Detail' }, component: ProductDetailComponent },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
});
```

Then use `<rui-breadcrumb />` anywhere in your template:

```html
<header>
  <rui-breadcrumb />
</header>
```

### Manual Mode

```html
<rui-breadcrumb
  [items]="[{ label: 'Home', url: '/' }, { label: 'Products', url: '/products' }]"
  separator="arrow_forward"
/>
```

### Custom Configuration

```ts
import { RUI_BREADCRUMB_DEFAULT_OPTIONS } from '@all-the.rest/mat-extended/breadcrumb';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    {
      provide: RUI_BREADCRUMB_DEFAULT_OPTIONS,
      useValue: { rootLabel: 'Dashboard', rootUrl: '/dashboard', rootIcon: 'dashboard' },
    },
  ],
});
```

## API

### RuiBreadcrumb

| Input       | Type                      | Default           | Description                                                                 |
|-------------|---------------------------|-------------------|-----------------------------------------------------------------------------|
| `items`     | `RuiBreadcrumbItem[]`     | `null`            | Manual breadcrumb items. When `null`, auto-generates from route data.       |
| `separator` | `string`                  | `'chevron_right'` | Material icon name for the separator between crumbs.                        |

### RuiBreadcrumbService

| Member         | Type                    | Description                                                    |
|----------------|-------------------------|----------------------------------------------------------------|
| `breadcrumbs`  | `Signal<RuiBreadcrumbItem[]>` | Reactive signal of breadcrumb items derived from current route. |

### RuiBreadcrumbItem

```ts
interface RuiBreadcrumbItem {
  label: string;
  url: string;
  icon?: string;
}
```

### RUI_BREADCRUMB_DEFAULT_OPTIONS

Injection token for default configuration:

```ts
interface RuiBreadcrumbConfig {
  rootLabel: string;    // default: 'Home'
  rootUrl: string;      // default: '/'
  rootIcon?: string;    // optional icon for root element
}
```

### Route Data Properties

| Property            | Description                                                      |
|---------------------|------------------------------------------------------------------|
| `data.title`        | Breadcrumb label for this route.                                 |
| `data.breadcrumb`   | Overrides `data.title` for the breadcrumb label only.            |
| `data.breadcrumbIcon`| Material icon name for this breadcrumb entry.                   |

## Behavior

- Routes without `data.title` or `data.breadcrumb` are **skipped** in the
  breadcrumb chain.
- The root element (default "Home") is always prepended.
- The last crumb in the chain is rendered as plain text with `aria-current="page"`.
- All non-last crumbs are clickable `routerLink` anchors.
- Fully SSR-compatible — the `RuiBreadcrumbService` subscribes to
  `Router.events` which fire during server-side rendering.
