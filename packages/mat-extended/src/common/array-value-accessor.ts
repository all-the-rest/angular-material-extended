import { Directive, model, effect } from '@angular/core';
import { RuiValueAccessor } from './control-value-accessor';

@Directive({ standalone: true })
export abstract class RuiArrayValueAccessor<T> extends RuiValueAccessor<T[]> {
  readonly values = model<T[]>([]);

  constructor() {
    super();
    effect(() => {
      const v = this.values();
      if (JSON.stringify(v) !== JSON.stringify(this.value)) {
        this.markAsChanged(v);
      }
    });
  }

  override writeValue(values: T[] | null): void {
    super.writeValue(values);
    this.values.set(values ?? []);
  }

  protected toggleValue(
    item: T,
    compareWith?: (a: T, b: T) => boolean,
  ): void {
    const current = this.values();
    const cmp = compareWith ?? ((a, b) => a === b);
    const has = current.some((c) => cmp(c, item));
    const next = has
      ? current.filter((c) => !cmp(c, item))
      : [...current, item];
    this.values.set(next);
    this.markAsChanged(next);
  }

  protected addValue(
    item: T,
    compareWith?: (a: T, b: T) => boolean,
  ): void {
    const current = this.values();
    const cmp = compareWith ?? ((a, b) => a === b);
    if (current.some((c) => cmp(c, item))) return;
    const next = [...current, item];
    this.values.set(next);
    this.markAsChanged(next);
  }

  protected removeValue(
    item: T,
    compareWith?: (a: T, b: T) => boolean,
  ): void {
    const current = this.values();
    const cmp = compareWith ?? ((a, b) => a === b);
    const next = current.filter((c) => !cmp(c, item));
    if (next.length === current.length) return;
    this.values.set(next);
    this.markAsChanged(next);
  }

  protected reorderValue(fromIndex: number, toIndex: number): void {
    const current = [...this.values()];
    if (fromIndex < 0 || fromIndex >= current.length) return;
    if (toIndex < 0 || toIndex >= current.length) return;
    const item = current.splice(fromIndex, 1)[0];
    if (item === undefined) return;
    current.splice(toIndex, 0, item);
    this.values.set(current);
    this.markAsChanged(current);
  }

  protected containsValue(
    item: T,
    compareWith?: (a: T, b: T) => boolean,
  ): boolean {
    const cmp = compareWith ?? ((a, b) => a === b);
    return this.values().some((c) => cmp(c, item));
  }

  protected clearValues(): void {
    this.values.set([]);
    this.markAsChanged([]);
  }
}
