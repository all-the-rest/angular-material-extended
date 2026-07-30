import { Component, input, model, output, signal, computed, ChangeDetectionStrategy, ViewChild, effect, inject, AfterViewInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { RuiDataColumn, RuiDataAction, RuiDataSortDirection, RuiDataSortEvent, RuiDataSelectionEvent, RuiDataTableConfig } from './data-table.types';
import { RuiDataTableFilter } from './data-table-filter.component';
import { RuiDataTableLoading } from './data-table-loading.component';
import { RuiDataTableEmptyState } from './data-table-empty-state.component';
import { RuiDataTablePaginator } from './data-table-paginator.component';
import { RUI_DATA_TABLE_DEFAULT_OPTIONS, RUI_DATA_TABLE_DEFAULTS } from './data-table.config';

@Component({
  selector: 'rui-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatSortModule, MatPaginatorModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatIconModule, MatMenuModule, MatButtonModule, MatDividerModule, RuiDataTableFilter, RuiDataTableLoading, RuiDataTableEmptyState, RuiDataTablePaginator],
  templateUrl: './data-table.html',
  styleUrl: './data-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RuiDataTable<T extends object> implements AfterViewInit {
  readonly data = input<T[]>([]);
  readonly columns = input<RuiDataColumn<T>[]>([]);
  readonly config = input<Partial<RuiDataTableConfig>>({});
  readonly loading = input(false);
  readonly emptyMessage = input('No data available');
  readonly actions = input<RuiDataAction<T>[]>([]);
  readonly expandedRowTemplate = input<TemplateRef<{ $implicit: T }> | undefined>(undefined);

  readonly sortChange = output<RuiDataSortEvent>();
  readonly selectionChange = output<RuiDataSelectionEvent<T>>();
  readonly pageChange = output<PageEvent>();

  readonly selectedItems = model<T[]>([]);

  readonly dataSource = new MatTableDataSource<T>([]);
  readonly displayedColumns = signal<string[]>([]);
  readonly filterValue = signal('');
  readonly expandedRows = signal<Set<T>>(new Set());

  @ViewChild(MatSort) matSort!: MatSort;
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;

  private _defaults = inject(RUI_DATA_TABLE_DEFAULT_OPTIONS, { optional: true });

  readonly mergedConfig = computed(() => {
    const defaults = this._defaults ?? {};
    return { ...RUI_DATA_TABLE_DEFAULTS, ...defaults, ...this.config() } as Required<RuiDataTableConfig>;
  });

  readonly hasActions = computed(() => this.actions().length > 0);

  constructor() {
    effect(() => {
      this.dataSource.data = this.data();
    });

    effect(() => {
      const cols = this.columns();
      const sel = this.mergedConfig().selectable;
      const expand = this.expandedRowTemplate();
      const colsToShow = cols.map(c => c.key);
      const result: string[] = [];
      if (sel) result.push('_select');
      if (expand) result.push('_expand');
      result.push(...colsToShow);
      if (this.hasActions()) result.push('_actions');
      this.displayedColumns.set(result);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.matSort;
    this.dataSource.paginator = this.matPaginator;
  }

  onSortChange(sort: Sort): void {
    this.sortChange.emit({ key: sort.active, direction: sort.direction as RuiDataSortDirection });
  }

  onFilterInput(value: string): void {
    this.filterValue.set(value);
    this.dataSource.filter = value.trim().toLowerCase();
  }

  isAllSelected(): boolean {
    const currentData = this.dataSource.data;
    return currentData.length > 0 && currentData.every(item => this.selectedItems().includes(item));
  }

  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selectedItems.set([]);
    } else {
      this.selectedItems.set([...this.dataSource.data]);
    }
    this.emitSelection();
  }

  toggleRow(row: T): void {
    const current = [...this.selectedItems()];
    const index = current.indexOf(row);
    if (index >= 0) {
      current.splice(index, 1);
    } else {
      current.push(row);
    }
    this.selectedItems.set(current);
    this.emitSelection();
  }

  checkboxLabel(row?: T): string {
    if (!row) return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    return `${this.selectedItems().includes(row) ? 'deselect' : 'select'} row`;
  }

  toggleRowExpansion(row: T): void {
    this.expandedRows.update(rows => {
      const newSet = new Set(rows);
      if (newSet.has(row)) {
        newSet.delete(row);
      } else {
        newSet.add(row);
      }
      return newSet;
    });
  }

  isRowExpanded(row: T): boolean {
    return this.expandedRows().has(row);
  }

  private emitSelection(): void {
    this.selectionChange.emit({
      selected: this.selectedItems(),
      allSelected: this.isAllSelected(),
    });
  }
}
