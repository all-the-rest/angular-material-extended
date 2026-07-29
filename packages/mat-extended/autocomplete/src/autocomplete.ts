import { Component, input, output, model, signal, computed, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatAutocompleteModule, MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

let nextId = 0;

@Component({
  selector: 'rui-autocomplete',
  standalone: true,
  imports: [MatAutocompleteModule],
  templateUrl: './autocomplete.html',
  styleUrl: './autocomplete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RuiAutocomplete<T = string> {
  private readonly instanceId = nextId++;

  @ViewChild(MatAutocomplete, { static: true }) readonly inner!: MatAutocomplete;

  readonly panelId = `rui-autocomplete-panel-${this.instanceId}`;
  readonly panelOpen = signal(false);

  readonly options = input<T[]>([]);
  readonly displayWith = input<(value: T) => string>((v: T) => String(v ?? ''));
  readonly filterFn = input<((options: T[], query: string) => T[]) | null>(null);
  readonly compareWith = input<((a: T, b: T) => boolean) | null>(null);

  readonly query = signal('');
  readonly selectedOption = model<T | null>(null);
  readonly optionSelected = output<T>();

  readonly filteredOptions = computed(() => {
    const raw = this.query();
    const opts = this.options();
    const fn = this.filterFn();

    if (fn) {
      return fn(opts, raw);
    }

    const q = raw.toLowerCase();
    if (!q) {
      return opts;
    }

    return opts.filter(opt => {
      const label = this.displayWith()(opt);
      return label.toLowerCase().includes(q);
    });
  });

  protected onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.value as T;
    this.selectedOption.set(value);
    this.optionSelected.emit(value);
  }

  protected onOpened(): void {
    this.panelOpen.set(true);
  }

  protected onClosed(): void {
    this.panelOpen.set(false);
  }

  protected compareFn = (a: T, b: T): boolean => {
    const cmp = this.compareWith();
    return cmp ? cmp(a, b) : a === b;
  };

  protected displayFn = (value: T): string => {
    return this.displayWith()(value);
  };

  protected trackByOption(index: number, option: T): T {
    return option;
  }
}
