# @all-the.rest/mat-extended/multi-select — Multi-Select

![MIT License](https://img.shields.io/badge/license-MIT-green) ![Angular v22+](https://img.shields.io/badge/Angular-v22%2B-red) ![Signals](https://img.shields.io/badge/signals-%E2%9C%94-blue)

Enhanced multi-select component wrapping `mat-select multiple` with chip trigger, drag-reorder, selection-order tracking, and full Angular Forms integration (Reactive, Template-driven, Signal).

## Installation

```sh
pnpm add @all-the.rest/mat-extended
```

## Imports

```typescript
import { RuiMultiSelect } from '@all-the.rest/mat-extended/multi-select';

// standalone:
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [RuiMultiSelect],
  // ...
})
export class MyComponent {}
```

## Basic Usage

`rui-multi-select` follows the **composable form field pattern**: the component renders only the inner `<mat-select>` — you own the `<mat-form-field>`. Label, appearance, hints and errors are controlled by the wrapper form field:

```html
<mat-form-field appearance="outline">
  <mat-label>Fruits</mat-label>
  <rui-multi-select
    [options]="fruits"
    [(values)]="selectedFruits"
  />
</mat-form-field>
```

## Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `options` | `T[]` | `[]` | Available options |
| `labelKey` | `string` | `''` | Key to extract display label from object options |
| `sortable` | `boolean` | `false` | Enable drag-and-drop reordering of selected items |
| `compareWith` | `(a: T, b: T) => boolean \| null` | `null` | Custom comparison function (default: `===`) |

## Outputs

| Name | Type | Description |
|---|---|---|
| `selectionChange` | `output<T[]>()` | Emits the current selection array on change |

## Reactive Forms

```typescript
myControl = new FormControl<string[]>([]);
```

```html
<mat-form-field appearance="outline">
  <mat-label>Items</mat-label>
  <rui-multi-select [formControl]="myControl" [options]="items" [labelKey]="'name'" />
</mat-form-field>
```

## Template-driven Forms

```html
<mat-form-field appearance="outline">
  <mat-label>Fruits</mat-label>
  <rui-multi-select [(ngModel)]="selected" name="fruits" [options]="fruits" />
</mat-form-field>
```

## Signal API

```html
<mat-form-field appearance="outline">
  <mat-label>Items</mat-label>
  <rui-multi-select [options]="items" [(values)]="selectedItems" />
</mat-form-field>
```

## Drag-Reorder

When `sortable` is enabled, selected chips can be reordered via drag-and-drop. The selection order is preserved and reflected in the `values` model.

## Accessibility

- Keyboard navigation: Enter/Space to open, Arrow keys to navigate options, Escape to close
- Screen reader support via MatSelect ARIA attributes
- Drag-and-drop handles with aria labels

## Server-Side Rendering

The component uses only standard Angular APIs and is fully compatible with Angular SSR.

## License

MIT — see the root [LICENSE](../../../../LICENSE) file.

## Unofficial Disclaimer

This is an unofficial package and is not affiliated with, endorsed by, or sponsored by Google or the Angular team. All trademarks and registered trademarks are the property of their respective owners.
