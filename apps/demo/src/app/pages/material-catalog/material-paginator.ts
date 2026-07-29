import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MaterialPaginatorBasic } from './paginator/material-paginator-basic';

@Component({
  selector: 'rui-material-paginator',
  standalone: true,
  imports: [MaterialPaginatorBasic],
  template: `
    <div class="rui-p-4 rui-md:p-6 rui-space-y-2">
      <div class="rui-mb-6">
        <h1 class="rui-font-bold rui-text-on-surface">Paginator</h1>
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-1">mat-paginator provides pagination navigation for large data sets.</p>
      </div>

      <rui-material-paginator-basic />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialPaginator {}
