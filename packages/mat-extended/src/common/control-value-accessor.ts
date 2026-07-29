import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Directive, signal, inject, Injector, runInInjectionContext, effect } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';

let nextId = 0;

@Directive()
export abstract class RuiValueAccessor<T> implements ControlValueAccessor, MatFormFieldControl<T> {
  protected onChange: (value: T | null) => void = () => undefined;
  protected onTouched: () => void = () => undefined;

  private readonly _value = signal<T | null>(null);
  private readonly _disabled = signal(false);
  private _ngControl: NgControl | null = null;
  private _ngControlResolved = false;

  readonly stateChanges = new Subject<void>();

  readonly id = `rui-form-field-${nextId++}`;

  placeholder = '';

  focused = false;

  get empty(): boolean {
    const v = this._value();
    return v === null || v === '' || (Array.isArray(v) && v.length === 0);
  }

  shouldLabelFloat = false;

  required = false;

  get disabled(): boolean {
    return this._disabled();
  }

  set disabled(v: boolean) {
    this._disabled.set(v);
  }

  get errorState(): boolean {
    return this.ngControl?.invalid === true && this.ngControl?.touched === true;
  }

  controlType = 'rui-form-field';

  autofilled = false;

  userAriaDescribedBy = '';

  disableAutomaticLabeling = false;

  get describedByIds(): string[] {
    return this.userAriaDescribedBy ? this.userAriaDescribedBy.split(' ') : [];
  }

  setDescribedByIds(ids: string[]): void {
    this.userAriaDescribedBy = ids.join(' ');
  }

  get ngControl(): NgControl | null {
    if (!this._ngControlResolved) {
      this._ngControlResolved = true;
      const injector = inject(Injector);
      this._ngControl = runInInjectionContext(injector, () =>
        inject(NgControl, { optional: true, self: true }),
      );
    }
    return this._ngControl;
  }

  constructor() {
    effect(() => {
      this._value();
      this.shouldLabelFloat = !this.empty && !this.focused;
    });
  }

  get value(): T | null {
    return this._value();
  }

  set value(v: T | null) {
    this._value.set(v);
    this.stateChanges.next();
  }

  writeValue(value: T | null): void {
    this._value.set(value);
    this.shouldLabelFloat = !this.empty;
    this.stateChanges.next();
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
    this.stateChanges.next();
  }

  markAsChanged(value: T | null = this._value()): void {
    this._value.set(value);
    this.onChange(value);
    this.stateChanges.next();
  }

  markAsTouched(): void {
    this.onTouched();
  }

  onContainerClick(): void {
    this.focus();
  }

  focus(): void {
    this.focused = true;
    this.shouldLabelFloat = true;
    this.stateChanges.next();
  }

  blur(): void {
    this.focused = false;
    this.shouldLabelFloat = !this.empty;
    this.stateChanges.next();
  }
}
