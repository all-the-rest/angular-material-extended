import { Component, input, output, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldControl } from '@angular/material/form-field';
import { DragDropModule, moveItemInArray, type CdkDragDrop } from '@angular/cdk/drag-drop';
import { RuiArrayValueAccessor } from '@all-the.rest/mat-extended';

@Component({
  selector: 'rui-multi-select',
  standalone: true,
  imports: [
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    DragDropModule,
  ],
  templateUrl: './multi-select.html',
  styleUrl: './multi-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RuiMultiSelect),
      multi: true,
    },
    {
      provide: MatFormFieldControl,
      useExisting: forwardRef(() => RuiMultiSelect),
    },
  ],
})
export class RuiMultiSelect<T = unknown> extends RuiArrayValueAccessor<T> {
  readonly options = input<T[]>([]);
  readonly labelKey = input<string>('');
  readonly sortable = input(false);
  readonly compareWith = input<((a: T, b: T) => boolean) | null>(null);

  readonly selectionChange = output<T[]>();

  private _selectionOrder: T[] = [];

  override writeValue(values: T[] | null): void {
    super.writeValue(values);
    this._selectionOrder = [...(values ?? [])];
  }

  protected displayLabel(item: T): string {
    const key = this.labelKey();
    if (key && item !== null && item !== undefined && typeof item === 'object' && key in (item as Record<string, unknown>)) {
      return String((item as Record<string, unknown>)[key]);
    }
    return String(item ?? '');
  }

  protected compareFn = (a: T, b: T): boolean => {
    const cmp = this.compareWith();
    return cmp ? cmp(a, b) : a === b;
  };

  protected trackByValue(item: T): unknown {
    const key = this.labelKey();
    if (key && item !== null && item !== undefined && typeof item === 'object' && key in (item as Record<string, unknown>)) {
      return (item as Record<string, unknown>)[key];
    }
    return item;
  }

  protected onSelectionChange(event: MatSelectChange): void {
    const next = event.value as T[];

    const removed = this._selectionOrder.filter(
      existing => !next.some(n => this.compareFn(n, existing)),
    );
    const added = next.filter(
      n => !this._selectionOrder.some(existing => this.compareFn(existing, n)),
    );

    const ordered = [
      ...this._selectionOrder.filter(
        existing => !removed.some(r => this.compareFn(r, existing)),
      ),
      ...added,
    ];

    this._selectionOrder = ordered;
    this.values.set(ordered);
    this.markAsChanged(ordered);
    this.selectionChange.emit(ordered);
  }

  protected removeItem(item: T): void {
    const next = this.values().filter(v => !this.compareFn(v, item));
    this._selectionOrder = this._selectionOrder.filter(o => !this.compareFn(o, item));
    this.values.set(next);
    this.markAsChanged(next);
    this.selectionChange.emit(next);
  }

  protected onDrop(event: CdkDragDrop<T[]>): void {
    if (event.previousIndex === event.currentIndex) return;

    const arr = [...this.values()];
    const item = arr[event.previousIndex];
    if (item === undefined) return;

    moveItemInArray(arr, event.previousIndex, event.currentIndex);

    const order = [...this._selectionOrder];
    const orderIdx = order.findIndex(o => this.compareFn(o, item));
    if (orderIdx >= 0) {
      moveItemInArray(order, orderIdx, event.currentIndex);
      this._selectionOrder = order;
    }

    this.values.set(arr);
    this.markAsChanged(arr);
    this.selectionChange.emit(arr);
  }
}
