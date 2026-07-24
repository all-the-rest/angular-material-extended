import { describe, it, expect, beforeEach } from 'vitest';
import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RuiMultiSelect } from './multi-select';
import { RuiArrayValueAccessor } from '@all-the.rest/mat-extended';

@Component({
  standalone: true,
  imports: [RuiMultiSelect],
  template: `
    <rui-multi-select
      [options]="options()"
      [label]="label()"
      [(values)]="selected"
      (selectionChange)="onSelectionChange($event)"
    />
  `,
})
class SignalHostComponent {
  readonly options = signal<string[]>(['Apple', 'Banana', 'Cherry']);
  readonly label = signal<string>('Fruits');
  readonly selected = signal<string[]>(['Apple']);
  selectionChangeCalled = false;
  lastSelection: string[] | undefined;

  onSelectionChange(values: string[]): void {
    this.selectionChangeCalled = true;
    this.lastSelection = values;
  }
}

@Component({
  standalone: true,
  imports: [RuiMultiSelect, ReactiveFormsModule],
  template: `
    <rui-multi-select
      [options]="fruits"
      [formControl]="control"
      label="Reactive"
    />
  `,
})
class ReactiveHostComponent {
  readonly fruits = ['Apple', 'Banana', 'Cherry'];
  readonly control = new FormControl<string[]>(['Banana']);
}

@Component({
  standalone: true,
  imports: [RuiMultiSelect, FormsModule],
  template: `
    <rui-multi-select
      [options]="fruits"
      [(ngModel)]="selected"
      label="NgModel"
    />
  `,
})
class TemplateDrivenHostComponent {
  readonly fruits = ['Apple', 'Banana', 'Cherry'];
  selected: string[] = ['Cherry'];
}

@Component({
  standalone: true,
  imports: [RuiMultiSelect],
  template: `
    <rui-multi-select
      [options]="people()"
      label="People"
      labelKey="name"
      [(values)]="selected"
    />
  `,
})
class ObjectOptionsHostComponent {
  readonly people = signal([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ]);
  readonly selected = signal<{ id: number; name: string }[]>([{ id: 1, name: 'Alice' }]);
}

@Component({
  standalone: true,
  imports: [RuiMultiSelect],
  template: `
    <rui-multi-select
      [options]="options()"
      label="Sortable"
      [sortable]="true"
      [(values)]="selected"
    />
  `,
})
class SortableHostComponent {
  readonly options = signal<string[]>(['Apple', 'Banana', 'Cherry']);
  readonly selected = signal<string[]>(['Apple', 'Banana', 'Cherry']);
}

describe('RuiMultiSelect', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    });
    await TestBed.compileComponents();
  });

  describe('Basic rendering', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [RuiMultiSelect, SignalHostComponent, NoopAnimationsModule],
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
      expect(labelEl.textContent.trim()).toBe('Fruits');
    });

    it('renders mat-select element', () => {
      const fixture = TestBed.createComponent(SignalHostComponent);
      fixture.detectChanges();
      const selectEl = fixture.nativeElement.querySelector('mat-select');
      expect(selectEl).toBeTruthy();
    });

    it('renders mat-form-field with appearance', () => {
      const fixture = TestBed.createComponent(SignalHostComponent);
      fixture.detectChanges();
      const ff = fixture.nativeElement.querySelector('mat-form-field');
      expect(ff).toBeTruthy();
    });
  });

  describe('values model binding', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [RuiMultiSelect, SignalHostComponent, NoopAnimationsModule],
      });
      await TestBed.compileComponents();
    });

    it('initial values are set via values model', () => {
      const fixture = TestBed.createComponent(SignalHostComponent);
      fixture.detectChanges();
      const multiSelect = fixture.debugElement.query(By.directive(RuiMultiSelect)).componentInstance as unknown as RuiMultiSelect<string> & RuiArrayValueAccessor<string>;
      expect(multiSelect.values()).toEqual(['Apple']);
    });

    it('updates values when selected signal changes', () => {
      const fixture = TestBed.createComponent(SignalHostComponent);
      fixture.detectChanges();
      fixture.componentInstance.selected.set(['Apple', 'Banana']);
      fixture.detectChanges();
      const multiSelect = fixture.debugElement.query(By.directive(RuiMultiSelect)).componentInstance as unknown as RuiMultiSelect<string> & RuiArrayValueAccessor<string>;
      expect(multiSelect.values()).toEqual(['Apple', 'Banana']);
    });

    it('does not emit selectionChange when values change programmatically via host', () => {
      const fixture = TestBed.createComponent(SignalHostComponent);
      const comp = fixture.componentInstance;
      comp.selected.set(['Apple', 'Banana']);
      fixture.detectChanges();
      expect(comp.selectionChangeCalled).toBe(false);
    });
  });

  describe('Reactive forms integration', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [RuiMultiSelect, ReactiveHostComponent, NoopAnimationsModule],
      });
      await TestBed.compileComponents();
    });

    it('renders with formControl binding', () => {
      const fixture = TestBed.createComponent(ReactiveHostComponent);
      fixture.detectChanges();
      const selectEl = fixture.nativeElement.querySelector('mat-select');
      expect(selectEl).toBeTruthy();
    });

    it('initial formControl value is propagated to component', () => {
      const fixture = TestBed.createComponent(ReactiveHostComponent);
      fixture.detectChanges();
      const multiSelect = fixture.debugElement.query(By.directive(RuiMultiSelect)).componentInstance as unknown as RuiMultiSelect<string> & RuiArrayValueAccessor<string>;
      expect(multiSelect.values()).toEqual(['Banana']);
    });

    it('control value changes propagate to component', () => {
      const fixture = TestBed.createComponent(ReactiveHostComponent);
      fixture.detectChanges();
      fixture.componentInstance.control.setValue(['Apple', 'Cherry']);
      fixture.detectChanges();
      const multiSelect = fixture.debugElement.query(By.directive(RuiMultiSelect)).componentInstance as unknown as RuiMultiSelect<string> & RuiArrayValueAccessor<string>;
      expect(multiSelect.values()).toEqual(['Apple', 'Cherry']);
    });

    it('control is enabled by default', () => {
      const fixture = TestBed.createComponent(ReactiveHostComponent);
      fixture.detectChanges();
      expect(fixture.componentInstance.control.disabled).toBe(false);
    });

    it('control disabled state enables disabled signal', () => {
      const fixture = TestBed.createComponent(ReactiveHostComponent);
      fixture.componentInstance.control.disable();
      fixture.detectChanges();
      const multiSelect = fixture.debugElement.query(By.directive(RuiMultiSelect)).componentInstance as unknown as RuiMultiSelect<string> & RuiArrayValueAccessor<string>;
      expect(multiSelect.disabled()).toBe(true);
    });
  });

  describe('Template-driven forms integration', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [RuiMultiSelect, TemplateDrivenHostComponent, NoopAnimationsModule],
      });
      await TestBed.compileComponents();
    });

    it('renders with ngModel binding', () => {
      const fixture = TestBed.createComponent(TemplateDrivenHostComponent);
      fixture.detectChanges();
      const selectEl = fixture.nativeElement.querySelector('mat-select');
      expect(selectEl).toBeTruthy();
    });

    it('initial ngModel value is propagated to component', async () => {
      const fixture = TestBed.createComponent(TemplateDrivenHostComponent);
      fixture.detectChanges();
      await fixture.whenStable();
      const multiSelect = fixture.debugElement.query(By.directive(RuiMultiSelect)).componentInstance as unknown as RuiMultiSelect<string> & RuiArrayValueAccessor<string>;
      expect(multiSelect.values()).toEqual(['Cherry']);
    });
  });

  describe('Object options with labelKey', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [RuiMultiSelect, ObjectOptionsHostComponent, NoopAnimationsModule],
      });
      await TestBed.compileComponents();
    });

    it('initializes values with object items', () => {
      const fixture = TestBed.createComponent(ObjectOptionsHostComponent);
      fixture.detectChanges();
      const multiSelect = fixture.debugElement.query(By.directive(RuiMultiSelect)).componentInstance as unknown as RuiMultiSelect<{ id: number; name: string }> & RuiArrayValueAccessor<{ id: number; name: string }>;
      expect(multiSelect.values().length).toBe(1);
      expect(multiSelect.values()[0]?.name).toBe('Alice');
    });

    it('updates when selected objects change', () => {
      const fixture = TestBed.createComponent(ObjectOptionsHostComponent);
      fixture.detectChanges();
      fixture.componentInstance.selected.set([
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
      ]);
      fixture.detectChanges();
      const multiSelect = fixture.debugElement.query(By.directive(RuiMultiSelect)).componentInstance as unknown as RuiMultiSelect<{ id: number; name: string }> & RuiArrayValueAccessor<{ id: number; name: string }>;
      expect(multiSelect.values().length).toBe(2);
    });
  });

  describe('Sortable mode', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [RuiMultiSelect, SortableHostComponent, NoopAnimationsModule],
      });
      await TestBed.compileComponents();
    });

    it('accepts sortable input', () => {
      const fixture = TestBed.createComponent(SortableHostComponent);
      fixture.detectChanges();
      const multiSelect = fixture.debugElement.query(By.directive(RuiMultiSelect)).componentInstance as unknown as RuiMultiSelect<string> & RuiArrayValueAccessor<string>;
      expect(multiSelect.sortable()).toBe(true);
    });
  });

  describe('Direct component API', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [RuiMultiSelect, SignalHostComponent, NoopAnimationsModule],
      });
      await TestBed.compileComponents();
    });

    it('exposes values model signal', () => {
      const fixture = TestBed.createComponent(SignalHostComponent);
      fixture.detectChanges();
      const multiSelect = fixture.debugElement.query(By.directive(RuiMultiSelect)).componentInstance as unknown as RuiMultiSelect<string> & RuiArrayValueAccessor<string>;
      expect(multiSelect.values).toBeDefined();
      expect(multiSelect.values()).toEqual(['Apple']);
    });

    it('allows setting values via model', () => {
      const fixture = TestBed.createComponent(SignalHostComponent);
      fixture.detectChanges();
      const multiSelect = fixture.debugElement.query(By.directive(RuiMultiSelect)).componentInstance as unknown as RuiMultiSelect<string> & RuiArrayValueAccessor<string>;
      multiSelect.values.set(['Banana', 'Cherry']);
      fixture.detectChanges();
      expect(multiSelect.values()).toEqual(['Banana', 'Cherry']);
    });

    it('exposes selectionChange output', () => {
      const fixture = TestBed.createComponent(SignalHostComponent);
      fixture.detectChanges();
      const multiSelect = fixture.debugElement.query(By.directive(RuiMultiSelect)).componentInstance as unknown as RuiMultiSelect<string> & RuiArrayValueAccessor<string>;
      expect(multiSelect.selectionChange).toBeDefined();
    });
  });

  describe('CVA integration', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [RuiMultiSelect, NoopAnimationsModule],
      });
      await TestBed.compileComponents();
    });

    it('implements writeValue', () => {
      const fixture = TestBed.createComponent(RuiMultiSelect);
      fixture.detectChanges();
      const comp = fixture.componentInstance as unknown as RuiMultiSelect<string> & RuiArrayValueAccessor<string>;
      comp.writeValue(['A', 'B']);
      fixture.detectChanges();
      expect(comp.values()).toEqual(['A', 'B']);
    });

    it('implements setDisabledState', () => {
      const fixture = TestBed.createComponent(RuiMultiSelect);
      fixture.detectChanges();
      const comp = fixture.componentInstance as unknown as RuiMultiSelect<string> & RuiArrayValueAccessor<string>;
      comp.setDisabledState(true);
      fixture.detectChanges();
      expect(comp.disabled()).toBe(true);
    });

    it('implements registerOnChange', () => {
      const fixture = TestBed.createComponent(RuiMultiSelect);
      fixture.detectChanges();
      const comp = fixture.componentInstance as unknown as RuiMultiSelect<string> & RuiArrayValueAccessor<string>;
      let called = false;
      comp.registerOnChange(() => { called = true; });
      comp.values.set(['X']);
      comp.markAsChanged(['X']);
      expect(called).toBe(true);
    });

    it('implements registerOnTouched', () => {
      const fixture = TestBed.createComponent(RuiMultiSelect);
      fixture.detectChanges();
      const comp = fixture.componentInstance as unknown as RuiMultiSelect<string> & RuiArrayValueAccessor<string>;
      let called = false;
      comp.registerOnTouched(() => { called = true; });
      comp.markAsTouched();
      expect(called).toBe(true);
    });
  });
});
