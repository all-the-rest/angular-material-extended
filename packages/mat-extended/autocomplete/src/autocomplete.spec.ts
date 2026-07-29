import { describe, it, expect, beforeEach } from 'vitest';
import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { RuiAutocomplete } from './autocomplete';

@Component({
  standalone: true,
  imports: [RuiAutocomplete],
  template: `
    <rui-autocomplete
      [options]="options()"
      [displayWith]="displayFn"
      [filterFn]="filterFn"
      [compareWith]="compareFn"
      [(selectedOption)]="selected"
      (optionSelected)="onOptionSelected($event)"
    />
  `,
})
class BasicHostComponent {
  readonly options = signal<string[]>(['Apple', 'Banana', 'Cherry']);
  readonly selected = signal<string | null>(null);
  displayFn: (value: string) => string = (v: string) => v;
  filterFn: ((options: string[], query: string) => string[]) | null = null;
  compareFn: ((a: string, b: string) => boolean) | null = null;
  lastSelected: string | null = null;

  onOptionSelected(value: string): void {
    this.lastSelected = value;
  }
}

@Component({
  standalone: true,
  imports: [RuiAutocomplete],
  template: `
    <rui-autocomplete
      [options]="people()"
      [displayWith]="displayWithFn"
      [(selectedOption)]="selected"
    />
  `,
})
class ObjectOptionsHostComponent {
  readonly people = signal([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ]);
  readonly selected = signal<{ id: number; name: string } | null>(null);

  displayWithFn = (value: { id: number; name: string }): string => value?.name ?? '';
}

@Component({
  standalone: true,
  imports: [RuiAutocomplete],
  template: `
    <rui-autocomplete
      [options]="options()"
      [filterFn]="customFilter"
      [(selectedOption)]="selected"
    />
  `,
})
class CustomFilterHostComponent {
  readonly options = signal(['Apple', 'Banana', 'Cherry', 'Avocado', 'Blueberry']);
  readonly selected = signal<string | null>(null);

  customFilter = (opts: string[], query: string): string[] => {
    return opts.filter(o => o.startsWith(query));
  };
}

@Component({
  standalone: true,
  imports: [RuiAutocomplete],
  template: `
    <rui-autocomplete
      [options]="options()"
      [compareWith]="compareFn"
      [(selectedOption)]="selected"
    />
  `,
})
class CompareWithHostComponent {
  readonly options = signal(['apple', 'banana', 'cherry']);
  readonly selected = signal<string | null>(null);

  compareFn = (a: string, b: string): boolean => a.toUpperCase() === b.toUpperCase();
}

describe('RuiAutocomplete', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    });
    await TestBed.compileComponents();
  });

  describe('Basic rendering', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [RuiAutocomplete, BasicHostComponent, NoopAnimationsModule],
      });
      await TestBed.compileComponents();
    });

    it('creates the component', () => {
      const fixture = TestBed.createComponent(BasicHostComponent);
      expect(fixture.componentInstance).toBeTruthy();
    });

    it('renders mat-autocomplete element', () => {
      const fixture = TestBed.createComponent(BasicHostComponent);
      fixture.detectChanges();
      const auto = fixture.nativeElement.querySelector('mat-autocomplete');
      expect(auto).toBeTruthy();
    });

    it('does not contain mat-form-field inside rui-autocomplete', () => {
      const fixture = TestBed.createComponent(BasicHostComponent);
      fixture.detectChanges();
      const hostEl = fixture.nativeElement.querySelector('rui-autocomplete');
      expect(hostEl.querySelector('mat-form-field')).toBeNull();
    });

    it('does not contain input inside rui-autocomplete', () => {
      const fixture = TestBed.createComponent(BasicHostComponent);
      fixture.detectChanges();
      const hostEl = fixture.nativeElement.querySelector('rui-autocomplete');
      expect(hostEl.querySelector('input')).toBeNull();
    });
  });

  describe('selectedOption model', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [RuiAutocomplete, BasicHostComponent, NoopAnimationsModule],
      });
      await TestBed.compileComponents();
    });

    it('initial selectedOption is null', () => {
      const fixture = TestBed.createComponent(BasicHostComponent);
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.directive(RuiAutocomplete)).componentInstance as RuiAutocomplete<string>;
      expect(comp.selectedOption()).toBeNull();
    });

    it('updates selectedOption when signal changes from host', () => {
      const fixture = TestBed.createComponent(BasicHostComponent);
      fixture.detectChanges();
      fixture.componentInstance.selected.set('Banana');
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.directive(RuiAutocomplete)).componentInstance as RuiAutocomplete<string>;
      expect(comp.selectedOption()).toBe('Banana');
    });
  });

  describe('optionSelected output', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [RuiAutocomplete, BasicHostComponent, NoopAnimationsModule],
      });
      await TestBed.compileComponents();
    });

    it('emits when onOptionSelected is called', () => {
      const fixture = TestBed.createComponent(BasicHostComponent);
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.directive(RuiAutocomplete)).componentInstance as RuiAutocomplete<string>;

      (comp as unknown as { onOptionSelected(event: MatAutocompleteSelectedEvent): void }).onOptionSelected({
        option: { value: 'Banana' },
      } as MatAutocompleteSelectedEvent);

      fixture.detectChanges();
      expect(comp.selectedOption()).toBe('Banana');
      expect(fixture.componentInstance.lastSelected).toBe('Banana');
    });
  });

  describe('Filtering', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [RuiAutocomplete, BasicHostComponent, NoopAnimationsModule],
      });
      await TestBed.compileComponents();
    });

    it('shows all options when query is empty', () => {
      const fixture = TestBed.createComponent(BasicHostComponent);
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.directive(RuiAutocomplete)).componentInstance as RuiAutocomplete<string>;
      expect(comp.filteredOptions().length).toBe(3);
    });

    it('filters options based on query', () => {
      const fixture = TestBed.createComponent(BasicHostComponent);
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.directive(RuiAutocomplete)).componentInstance as RuiAutocomplete<string>;
      comp.query.set('ap');
      expect(comp.filteredOptions()).toEqual(['Apple']);
    });

    it('filters are case-insensitive', () => {
      const fixture = TestBed.createComponent(BasicHostComponent);
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.directive(RuiAutocomplete)).componentInstance as RuiAutocomplete<string>;
      comp.query.set('CHERRY');
      expect(comp.filteredOptions()).toEqual(['Cherry']);
    });
  });

  describe('Custom filter function', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [RuiAutocomplete, CustomFilterHostComponent, NoopAnimationsModule],
      });
      await TestBed.compileComponents();
    });

    it('uses custom filter function', () => {
      const fixture = TestBed.createComponent(CustomFilterHostComponent);
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.directive(RuiAutocomplete)).componentInstance as RuiAutocomplete<string>;
      comp.query.set('A');
      expect(comp.filteredOptions()).toEqual(['Apple', 'Avocado']);
    });

    it('returns empty when no matches with custom filter', () => {
      const fixture = TestBed.createComponent(CustomFilterHostComponent);
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.directive(RuiAutocomplete)).componentInstance as RuiAutocomplete<string>;
      comp.query.set('Z');
      expect(comp.filteredOptions()).toEqual([]);
    });
  });

  describe('displayWith', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [RuiAutocomplete, ObjectOptionsHostComponent, NoopAnimationsModule],
      });
      await TestBed.compileComponents();
    });

    it('displays option label via displayWith', () => {
      const fixture = TestBed.createComponent(ObjectOptionsHostComponent);
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.directive(RuiAutocomplete)).componentInstance as RuiAutocomplete<{ id: number; name: string }>;
      const result = comp.displayWith()({ id: 1, name: 'Alice' });
      expect(result).toBe('Alice');
    });
  });

  describe('displayFn', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [RuiAutocomplete, BasicHostComponent, NoopAnimationsModule],
      });
      await TestBed.compileComponents();
    });

    it('returns string value via displayFn wrapper', () => {
      const fixture = TestBed.createComponent(BasicHostComponent);
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.directive(RuiAutocomplete)).componentInstance as RuiAutocomplete<string>;
      const result = (comp as unknown as { displayFn: (v: string) => string }).displayFn('Apple');
      expect(result).toBe('Apple');
    });
  });

  describe('compareWith', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [RuiAutocomplete, CompareWithHostComponent, NoopAnimationsModule],
      });
      await TestBed.compileComponents();
    });

    it('uses custom compare function', () => {
      const fixture = TestBed.createComponent(CompareWithHostComponent);
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.directive(RuiAutocomplete)).componentInstance as RuiAutocomplete<string>;
      const result = (comp as unknown as { compareFn: (a: string, b: string) => boolean }).compareFn('APPLE', 'apple');
      expect(result).toBe(true);
    });

    it('defaults to strict equality when compareWith is not provided', () => {
      const fixture = TestBed.createComponent(BasicHostComponent);
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.directive(RuiAutocomplete)).componentInstance as RuiAutocomplete<string>;
      const result = (comp as unknown as { compareFn: (a: string, b: string) => boolean }).compareFn('Apple', 'Apple');
      expect(result).toBe(true);
    });
  });

  describe('Panel open/close', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [RuiAutocomplete, BasicHostComponent, NoopAnimationsModule],
      });
      await TestBed.compileComponents();
    });

    it('initial panelOpen is false', () => {
      const fixture = TestBed.createComponent(BasicHostComponent);
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.directive(RuiAutocomplete)).componentInstance as RuiAutocomplete<string>;
      expect(comp.panelOpen()).toBe(false);
    });

    it('toggles panelOpen on opened/closed', () => {
      const fixture = TestBed.createComponent(BasicHostComponent);
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.directive(RuiAutocomplete)).componentInstance as RuiAutocomplete<string>;
      const instance = comp as unknown as { onOpened(): void; onClosed(): void };
      instance.onOpened();
      expect(comp.panelOpen()).toBe(true);
      instance.onClosed();
      expect(comp.panelOpen()).toBe(false);
    });
  });
});
