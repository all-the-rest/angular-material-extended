import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'rui-data-table-paginator',
  standalone: true,
  imports: [MatPaginatorModule],
  styleUrl: './data-table-paginator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-paginator
      [length]="length()"
      [pageSize]="pageSize()"
      [pageSizeOptions]="pageSizeOptions()"
      (page)="pageChange.emit($event)"
      showFirstLastButtons
      aria-label="Select page"
    />
  `,
})
export class RuiDataTablePaginator {
  readonly length = input(0);
  readonly pageSize = input(10);
  readonly pageSizeOptions = input<number[]>([5, 10, 25, 50]);
  readonly pageChange = output<PageEvent>();
}
