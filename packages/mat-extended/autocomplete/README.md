# @all-the.rest/mat-extended/autocomplete

> **Unofficial** – This project is a community extension and is NOT officially affiliated with Google or the Angular team. "Angular" and "Material" are trademarks of Google LLC.

Drop-in replacement for `<mat-autocomplete>` with Signal-based API, built-in filtering, and `selectedOption` two-way binding.

## Installation

```bash
pnpm add @all-the.rest/mat-extended
```

## Usage

```ts
import { RuiAutocomplete } from '@all-the.rest/mat-extended/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  imports: [RuiAutocomplete, MatFormFieldModule, MatInputModule],
  template: `
    <mat-form-field appearance="outline">
      <mat-label>Fruit</mat-label>
      <input matInput [formControl]="control" [matAutocomplete]="auto.inner">
      <rui-autocomplete
        #auto
        [options]="fruits"
        [(selectedOption)]="selected"
      />
    </mat-form-field>
  `,
})
export class Example {
  fruits = ['Apple', 'Banana', 'Cherry'];
  selected: string | null = null;
}
```

## API

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `options` | `T[]` | `[]` | Available options |
| `displayWith` | `(value: T) => string` | `String(v)` | Custom display function |
| `filterFn` | `((options: T[], query: string) => T[]) \| null` | case-insensitive includes | Custom filter function |
| `compareWith` | `((a: T, b: T) => boolean) \| null` | `a === b` | Custom comparison function |

| Output | Type | Description |
|--------|------|-------------|
| `optionSelected` | `T` | Emitted when an option is selected |

| Model | Type | Description |
|-------|------|-------------|
| `selectedOption` | `T \| null` | Two-way bindable selected value |

| Property | Type | Description |
|----------|------|-------------|
| `inner` | `MatAutocomplete` | Access to the inner `<mat-autocomplete>` instance. Use `[matAutocomplete]="ref.inner"` on the `<input>`. |

## License

MIT
