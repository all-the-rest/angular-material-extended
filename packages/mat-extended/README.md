# @all-the.rest/mat-extended

Extended Angular Material components — Cropper, File Upload, Data Table, Dialog, Toast, Menu, Multi-Select, Breadcrumb, and File Manager.

> **Unofficial** community project — not affiliated with Google or the Angular team. "Angular" and "Material" are trademarks of Google LLC.

[![CI](https://github.com/reisi007/angular-material-extended/actions/workflows/ci.yml/badge.svg)](https://github.com/reisi007/angular-material-extended/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@all-the.rest/mat-extended.svg)](https://www.npmjs.com/package/@all-the.rest/mat-extended)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/reisi007/angular-material-extended/blob/main/LICENSE)
[![Demo](https://img.shields.io/badge/demo-mat--extended.all--the.rest-blue.svg)](http://mat-extended.all-the.rest/)

## Demo

**[mat-extended.all-the.rest](http://mat-extended.all-the.rest/)**

## Installation

```bash
npm install @all-the.rest/mat-extended @angular/material @angular/cdk
```

## Components

| Component | Entry Point | Import |
|---|---|---|
| Image Cropper | `@all-the.rest/mat-extended/cropper` | `import { RuiCropper } from '@all-the.rest/mat-extended/cropper'` |
| File Upload | `@all-the.rest/mat-extended/file-upload` | `import { RuiFileUpload } from '@all-the.rest/mat-extended/file-upload'` |
| Data Table | `@all-the.rest/mat-extended/data-table` | `import { RuiDataTable } from '@all-the.rest/mat-extended/data-table'` |
| Dialog | `@all-the.rest/mat-extended/dialog` | `import { RuiDialogService } from '@all-the.rest/mat-extended/dialog'` |
| Toast | `@all-the.rest/mat-extended/toast` | `import { RuiToastService } from '@all-the.rest/mat-extended/toast'` |
| Menu | `@all-the.rest/mat-extended/menu` | `import { RuiMenuButton } from '@all-the.rest/mat-extended/menu'` |
| Multi-Select | `@all-the.rest/mat-extended/multi-select` | `import { RuiMultiSelect } from '@all-the.rest/mat-extended/multi-select'` |
| Breadcrumb | `@all-the.rest/mat-extended/breadcrumb` | `import { RuiBreadcrumb } from '@all-the.rest/mat-extended/breadcrumb'` |
| File Manager | `@all-the.rest/mat-extended/file-manager` | `import { RuiFileManager } from '@all-the.rest/mat-extended/file-manager'` |

## Quick Start

```typescript
// app.config.ts
import { provideRuiToast } from '@all-the.rest/mat-extended/toast';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRuiToast(),
  ]
};
```

```typescript
// any.component.ts
import { RuiCropper } from '@all-the.rest/mat-extended/cropper';

@Component({
  standalone: true,
  imports: [RuiCropper],
  template: `<rui-cropper [image]="imageUrl" (cropped)="onCrop($event)" />`
})
```

## Features

- **Angular v22** — Standalone Components, Signals, Zoneless
- **Material 3 Theming** — M3 tokens via Tailwind CSS
- **Reactive Forms** — every form component supports `ControlValueAccessor`
- **Signal API** — `model()` signals for all components
- **SSR-compatible** — all browser APIs guarded
- **TypeScript** — strict mode, full type inference
- **Tree-shakable** — import only what you need

## Requirements

| Peer Dependency | Version |
|---|---|
| `@angular/core` | `^22.0.0` |
| `@angular/common` | `^22.0.0` |
| `@angular/forms` | `^22.0.0` |
| `@angular/material` | `^22.0.0` |

## Snapshot Builds

Latest development build from `main`:

```bash
npm install @all-the.rest/mat-extended@snapshot
```

## Links

- [Demo App](http://mat-extended.all-the.rest/)
- [GitHub Repository](https://github.com/reisi007/angular-material-extended)
- [Report Issues](https://github.com/reisi007/angular-material-extended/issues)
- [Contributing](https://github.com/reisi007/angular-material-extended/blob/main/CONTRIBUTING.md)

## License

MIT © [Florian Reisinger](https://github.com/reisi007) — see [LICENSE](https://github.com/reisi007/angular-material-extended/blob/main/LICENSE).
