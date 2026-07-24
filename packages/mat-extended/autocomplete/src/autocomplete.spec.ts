import { describe, it, expect, beforeEach } from 'vitest';
import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RuiAutocomplete } from './autocomplete';
import { RuiValueAccessor } from '@all-the.rest/mat-extended';

@Component({
  standalone: true,
  imports: [RuiAutocomplete],
  template: `
    <rui-autocomplete
      [options]="options()"
      [label]="label()"
      [placeholder]="placeholder()"
      [(selectedOption)]="selected"
      (optionSelected)="onOptionSelected($event)"
    />
  `,
})
class SignalHostComponent {
  readonly options = signal<string[]>(['Apple', 'Banana', 'Cherry']);
  readonly label = signal<string>('Fruit');
  readonly placeholder = signal<string>('Pick a fruit');
  readonly selected = signal<string | null>(null);
  lastSelected: string | null = null;

  onOptionSelected(value: string): void {
    this.lastSelected = value;
  }
}

@Component({
  standalone: true,
  imports: [RuiAutocomplete, ReactiveFormsModule],
  template: `
    <rui-autocomplete
      [options]="fruits"
      [formControl]="control"
      label="Reactive"
    />
  `,
})
class ReactiveHostComponent {
  readonly fruits = ['Apple', 'Banana', 'Cherry'];
  readonly control = new FormControl<string | null>(null);
}

@Component({
  standalone: true,
  imports: [RuiAutocomplete, FormsModule],
  template: `
    <rui-autocomplete
      [options]="fruits"
      [(ngModel)]="selected"
      label="Template-driven"
    />
  `,
})
class TemplateDrivenHostComponent {
  readonly fruits = ['Apple', 'Banana', 'Cherry'];
  selected: string | null = null;
}

@Component({
  standalone: true,
  imports: [RuiAutocomplete],
  template: `
    <rui-autocomplete
      [options]="people()"
      label="People"
      [displayWith]="displayFn"
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

  displayFn = (value: { id: number; name: string }): string => value?.name ?? '';
}

@Component({
  standalone: true,
  imports: [RuiAutocomplete],
  template: `
    <rui-autocomplete
      [options]="options()"
      [filterFn]="customFilter"
      label="Custom Filter"
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
        imports: [RuiAutocomplete, SignalHostComponent, NoopAnimationsModule],
      });
      await TestBed.compileComponents();
    });

    it('creates the component', () => {
      const fixture = TestBed.createComponent(SignalHostComponent);
      expect(fixture.componentInstance).toBeTruthy();
    });

    it('renders the label inside mat-label', () => {
      const fixture = TestBed.createComponent(SignalHostComponent);
      fixture.detectChanges();
      const labelEl = fixture.nativeElement.querySelector('mat-label');
      expect(labelEl).toBeTruthy();
      expect(labelEl.textContent.trim()).toBe('Fruit');
    });

    it('renders mat-form-field with appearance', () => {
      const fixture = TestBed.createComponent(SignalHostComponent);
      fixture.detectChanges();
      const ff = fixture.nativeElement.querySelector('mat-form-field');
      expect(ff).toBeTruthy();
    });

    it('renders input element', () => {
      const fixture = TestBed.createComponent(SignalHostComponent);
      fixture.detectChanges();
      const input = fixture.nativeElement.querySelector('input');
      expect(input).toBeTruthy();
    });

    it('renders mat-autocomplete element', () => {
      const fixture = TestBed.createComponent(SignalHostComponent);
      fixture.detectChanges();
      const auto = fixture.nativeElement.querySelector('mat-autocomplete');
      expect(auto).toBeTruthy();
    });
  });

  describe('Input rendering', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [RuiAutocomplete, SignalHostComponent, NoopAnimationsModule],
      });
      await TestBed.compileComponents();
    });

    it('renders placeholder on input', () => {
      const fixture = TestBed.createComponent(SignalHostComponent);
      fixture.detectChanges();
      const input = fixture.nativeElement.querySelector('input');
      expect(input.getAttribute('placeholder')).toBe('Pick a fruit');
    });

    it('has autocomplete="off" on input', () => {
      const fixture = TestBed.createComponent(SignalHostComponent);
      fixture.detectChanges();
      const input = fixture.nativeElement.querySelector('input');
      expect(input.getAttribute('autocomplete')).toBe('off');
    });

    it('has role="combobox" on input', () => {
      const fixture = TestBed.createComponent(SignalHostComponent);
      fixture.detectChanges();
      const input = fixture.nativeElement.querySelector('input');
      expect(input.getAttribute('role')).toBe('combobox');
    });
  });

  describe('selectedOption model binding', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [RuiAutocomplete, SignalHostComponent, NoopAnimationsModule],
      });
      await TestBed.compileComponents();
    });

    it('initial selectedOption is null', () => {
      const fixture = TestBed.createComponent(SignalHostComponent);
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.directive(RuiAutocomplete)).componentInstance as RuiAutocomplete<string>;
      expect(comp.selectedOption()).toBeNull();
    });

    it('updates selectedOption when signal changes', () => {
      const fixture = TestBed.createComponent(SignalHostComponent);
      fixture.detectChanges();
      fixture.componentInstance.selected.set('Banana');
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.directive(RuiAutocomplete)).componentInstance as RuiAutocomplete<string>;
      expect(comp.selectedOption()).toBe('Banana');
    });
  });

  describe('Reactive forms integration', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [RuiAutocomplete, ReactiveHostComponent, NoopAnimationsModule],
      });
      await TestBed.compileComponents();
    });

    it('renders with formControl binding', () => {
      const fixture = TestBed.createComponent(ReactiveHostComponent);
      fixture.detectChanges();
      const input = fixture.nativeElement.querySelector('input');
      expect(input).toBeTruthy();
    });

    it('initial formControl value is propagated to component', () => {
      const fixture = TestBed.createComponent(ReactiveHostComponent);
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.directive(RuiAutocomplete)).componentInstance as RuiAutocomplete<string>;
      expect(comp.selectedOption()).toBeNull();
    });

    it('control disabled state enables disabled signal', () => {
      const fixture = TestBed.createComponent(ReactiveHostComponent);
      fixture.detectChanges();
      fixture.componentInstance.control.disable();
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.directive(RuiAutocomplete)).componentInstance as unknown as RuiAutocomplete<string> & RuiValueAccessor<string>;
      expect(comp.disabled()).toBe(true);
    });
  });

  describe('Template-driven forms integration', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [RuiAutocomplete, TemplateDrivenHostComponent, NoopAnimationsModule],
      });
      await TestBed.compileComponents();
    });

    it('renders with ngModel binding', () => {
      const fixture = TestBed.createComponent(TemplateDrivenHostComponent);
      fixture.detectChanges();
      const input = fixture.nativeElement.querySelector('input');
      expect(input).toBeTruthy();
    });
  });

  describe('Object options with displayWith', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [RuiAutocomplete, ObjectOptionsHostComponent, NoopAnimationsModule],
      });
      await TestBed.compileComponents();
    });

    it('initializes with null selectedOption', () => {
      const fixture = TestBed.createComponent(ObjectOptionsHostComponent);
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.directive(RuiAutocomplete)).componentInstance as RuiAutocomplete<{ id: number; name: string }>;
      expect(comp.selectedOption()).toBeNull();
    });

    it('displays option label via displayWith', () => {
      const fixture = TestBed.createComponent(ObjectOptionsHostComponent);
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.directive(RuiAutocomplete)).componentInstance as RuiAutocomplete<{ id: number; name: string }>;
      const result = comp.displayWith()({ id: 1, name: 'Alice' });
      expect(result).toBe('Alice');
    });
  });

  describe('Filtering', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [RuiAutocomplete, SignalHostComponent, NoopAnimationsModule],
      });
      await TestBed.compileComponents();
    });

    it('shows all options when query is empty', () => {
      const fixture = TestBed.createComponent(SignalHostComponent);
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.directive(RuiAutocomplete)).componentInstance as RuiAutocomplete<string>;
      expect(comp.filteredOptions().length).toBe(3);
    });

    it('filters options based on query', () => {
      const fixture = TestBed.createComponent(SignalHostComponent);
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.directive(RuiAutocomplete)).componentInstance as RuiAutocomplete<string>;
      comp.query.set('ap');
      expect(comp.filteredOptions()).toEqual(['Apple']);
    });

    it('filters are case-insensitive', () => {
      const fixture = TestBed.createComponent(SignalHostComponent);
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

  describe('CVA integration', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [RuiAutocomplete, NoopAnimationsModule],
      });
      await TestBed.compileComponents();
    });

    it('implements writeValue', () => {
      const fixture = TestBed.createComponent(RuiAutocomplete);
      fixture.detectChanges();
      const comp = fixture.componentInstance as unknown as RuiAutocomplete<string> & RuiValueAccessor<string>;
      comp.writeValue('Apple');
      fixture.detectChanges();
      expect(comp.selectedOption()).toBe('Apple');
    });

    it('implements setDisabledState', () => {
      const fixture = TestBed.createComponent(RuiAutocomplete);
      fixture.detectChanges();
      const comp = fixture.componentInstance as unknown as RuiAutocomplete<string> & RuiValueAccessor<string>;
      comp.setDisabledState(true);
      fixture.detectChanges();
      expect(comp.disabled()).toBe(true);
    });

    it('implements registerOnChange', () => {
      const fixture = TestBed.createComponent(RuiAutocomplete);
      fixture.detectChanges();
      const comp = fixture.componentInstance as unknown as RuiAutocomplete<string> & RuiValueAccessor<string>;
      let called = false;
      comp.registerOnChange(() => { called = true; });
      comp.selectedOption.set('Banana');
      comp.markAsChanged('Banana');
      expect(called).toBe(true);
    });

    it('implements registerOnTouched', () => {
      const fixture = TestBed.createComponent(RuiAutocomplete);
      fixture.detectChanges();
      const comp = fixture.componentInstance as unknown as RuiAutocomplete<string> & RuiValueAccessor<string>;
      let called = false;
      comp.registerOnTouched(() => { called = true; });
      comp.markAsTouched();
      expect(called).toBe(true);
    });
  });

  describe('Direct component API', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [RuiAutocomplete, SignalHostComponent, NoopAnimationsModule],
      });
      await TestBed.compileComponents();
    });

    it('exposes selectedOption model signal', () => {
      const fixture = TestBed.createComponent(SignalHostComponent);
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.directive(RuiAutocomplete)).componentInstance as RuiAutocomplete<string>;
      expect(comp.selectedOption).toBeDefined();
      expect(comp.selectedOption()).toBeNull();
    });

    it('allows setting selectedOption via model', () => {
      const fixture = TestBed.createComponent(SignalHostComponent);
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.directive(RuiAutocomplete)).componentInstance as RuiAutocomplete<string>;
      comp.selectedOption.set('Cherry');
      fixture.detectChanges();
      expect(comp.selectedOption()).toBe('Cherry');
    });

    it('exposes optionSelected output', () => {
      const fixture = TestBed.createComponent(SignalHostComponent);
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.directive(RuiAutocomplete)).componentInstance as RuiAutocomplete<string>;
      expect(comp.optionSelected).toBeDefined();
    });

    it('exposes query signal', () => {
      const fixture = TestBed.createComponent(SignalHostComponent);
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.directive(RuiAutocomplete)).componentInstance as RuiAutocomplete<string>;
      expect(comp.query).toBeDefined();
      expect(comp.query()).toBe('');
    });

    it('exposes filteredOptions computed', () => {
      const fixture = TestBed.createComponent(SignalHostComponent);
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.directive(RuiAutocomplete)).componentInstance as RuiAutocomplete<string>;
      expect(comp.filteredOptions).toBeDefined();
      expect(comp.filteredOptions().length).toBe(3);
    });
  });

  describe('displayWith', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [RuiAutocomplete, SignalHostComponent, NoopAnimationsModule],
      });
      await TestBed.compileComponents();
    });

    it('returns string value as-is via displayWith', () => {
      const fixture = TestBed.createComponent(SignalHostComponent);
      fixture.detectChanges();
      const comp = fixture.debugElement.query(By.directive(RuiAutocomplete)).componentInstance as RuiAutocomplete<string>;
      const result = comp.displayWith()('Apple');
      expect(result).toBe('Apple');
    });
  });
});
