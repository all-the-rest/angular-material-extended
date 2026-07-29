import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MaterialTableBasic } from './table/material-table-basic';
import { MaterialTableSortPaginated } from './table/material-table-sort-paginated';

@Component({
  selector: 'rui-material-table',
  standalone: true,
  imports: [MaterialTableBasic, MaterialTableSortPaginated],
  template: `
    <div class="rui-p-4 rui-md:p-6 rui-space-y-2">
      <div class="rui-mb-6">
        <h1 class="rui-font-bold rui-text-on-surface">Table</h1>
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-1">mat-table is a flexible data table component with sorting and pagination.</p>
      </div>

      <rui-material-table-basic />
      <rui-material-table-sort-paginated />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialTable {}
