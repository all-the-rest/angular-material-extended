import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RuiArrayValueAccessor } from './array-value-accessor';

@Component({
  standalone: true,
  template: '',
  selector: 'rui-test-array-accessor',
})
class TestArrayAccessor extends RuiArrayValueAccessor<string> {
  triggerToggle(item: string, compareWith?: (a: string, b: string) => boolean): void {
    this.toggleValue(item, compareWith);
  }

  triggerAdd(item: string, compareWith?: (a: string, b: string) => boolean): void {
    this.addValue(item, compareWith);
  }

  triggerRemove(item: string, compareWith?: (a: string, b: string) => boolean): void {
    this.removeValue(item, compareWith);
  }

  triggerReorder(fromIndex: number, toIndex: number): void {
    this.reorderValue(fromIndex, toIndex);
  }

  triggerContains(item: string, compareWith?: (a: string, b: string) => boolean): boolean {
    return this.containsValue(item, compareWith);
  }

  triggerClear(): void {
    this.clearValues();
  }

  setOnChange(fn: (v: string[] | null) => void): void {
    this.registerOnChange(fn);
  }

  setOnTouched(fn: () => void): void {
    this.registerOnTouched(fn);
  }

  triggerMarkAsTouched(): void {
    this.markAsTouched();
  }
}

@Component({
  standalone: true,
  template: '',
  selector: 'rui-test-obj-accessor',
})
class TestObjectArrayAccessor extends RuiArrayValueAccessor<{ id: number; name: string }> {
  triggerToggle(item: { id: number; name: string }, compareWith?: (a: { id: number; name: string }, b: { id: number; name: string }) => boolean): void {
    this.toggleValue(item, compareWith);
  }

  triggerAdd(item: { id: number; name: string }, compareWith?: (a: { id: number; name: string }, b: { id: number; name: string }) => boolean): void {
    this.addValue(item, compareWith);
  }

  triggerRemove(item: { id: number; name: string }, compareWith?: (a: { id: number; name: string }, b: { id: number; name: string }) => boolean): void {
    this.removeValue(item, compareWith);
  }

  triggerContains(item: { id: number; name: string }, compareWith?: (a: { id: number; name: string }, b: { id: number; name: string }) => boolean): boolean {
    return this.containsValue(item, compareWith);
  }

  setOnChange(fn: (v: { id: number; name: string }[] | null) => void): void {
    this.registerOnChange(fn);
  }
}

describe('RuiArrayValueAccessor', () => {
  let accessor: TestArrayAccessor;
  let onChange: (v: string[] | null) => void;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestArrayAccessor],
    });
    const fixture = TestBed.createComponent(TestArrayAccessor);
    accessor = fixture.componentInstance;
    onChange = vi.fn();
    accessor.setOnChange(onChange);
  });

  describe('initial state', () => {
    it('should default values to empty array', () => {
      expect(accessor.values()).toEqual([]);
    });

    it('should default value to null', () => {
      expect(accessor.value).toBeNull();
    });
  });

  describe('writeValue', () => {
    it('should set values and value when called with an array', () => {
      accessor.writeValue(['a', 'b', 'c']);

      expect(accessor.values()).toEqual(['a', 'b', 'c']);
      expect(accessor.value).toEqual(['a', 'b', 'c']);
    });

    it('should set values to empty array when called with null', () => {
      accessor.writeValue(['a']);
      accessor.writeValue(null);

      expect(accessor.values()).toEqual([]);
      expect(accessor.value).toBeNull();
    });

    it('should set values to empty array when called with empty array', () => {
      accessor.writeValue([]);

      expect(accessor.values()).toEqual([]);
      expect(accessor.value).toEqual([]);
    });

    it('should not call onChange', () => {
      accessor.writeValue(['x']);
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('toggleValue', () => {
    it('should add item when not present', () => {
      accessor.triggerToggle('a');

      expect(accessor.values()).toEqual(['a']);
    });

    it('should remove item when present', () => {
      accessor.writeValue(['a', 'b', 'c']);
      accessor.triggerToggle('b');

      expect(accessor.values()).toEqual(['a', 'c']);
    });

    it('should handle toggling the same item multiple times', () => {
      accessor.triggerToggle('a');
      accessor.triggerToggle('a');
      expect(accessor.values()).toEqual([]);
    });

    it('should call onChange after toggle', () => {
      accessor.triggerToggle('a');
      expect(onChange).toHaveBeenCalledWith(['a']);
    });

    it('should call onChange after toggle removal', () => {
      accessor.writeValue(['a', 'b']);
      accessor.triggerToggle('a');
      expect(onChange).toHaveBeenCalledWith(['b']);
    });

    it('should use custom compareWith', () => {
      accessor.writeValue(['a', 'B', 'c']);
      accessor.triggerToggle('b', (a, b) => a.toLowerCase() === b.toLowerCase());

      expect(accessor.values()).toEqual(['a', 'c']);
    });

    it('should add item based on custom compareWith', () => {
      accessor.triggerToggle('B', (a, b) => a.toLowerCase() === b.toLowerCase());
      expect(accessor.values()).toEqual(['B']);
    });
  });

  describe('addValue', () => {
    it('should add item to an initially empty array', () => {
      accessor.triggerAdd('a');

      expect(accessor.values()).toEqual(['a']);
    });

    it('should add item to a non-empty array', () => {
      accessor.writeValue(['a', 'b']);
      accessor.triggerAdd('c');

      expect(accessor.values()).toEqual(['a', 'b', 'c']);
    });

    it('should not add a duplicate item', () => {
      accessor.writeValue(['a', 'b']);
      accessor.triggerAdd('a');

      expect(accessor.values()).toEqual(['a', 'b']);
    });

    it('should not call onChange for duplicate', () => {
      accessor.writeValue(['a']);
      accessor.triggerAdd('a');

      expect(onChange).not.toHaveBeenCalled();
    });

    it('should call onChange after adding', () => {
      accessor.triggerAdd('first');
      expect(onChange).toHaveBeenCalledWith(['first']);
    });

    it('should use custom compareWith', () => {
      accessor.writeValue(['a', 'b']);
      accessor.triggerAdd('A', (a, b) => a === b);
      expect(accessor.values()).toEqual(['a', 'b', 'A']);
    });

    it('should not add if custom compareWith finds duplicate', () => {
      accessor.writeValue(['a', 'b']);
      accessor.triggerAdd('B', (a, b) => a.toLowerCase() === b.toLowerCase());
      expect(accessor.values()).toEqual(['a', 'b']);
    });
  });

  describe('removeValue', () => {
    it('should remove an existing item', () => {
      accessor.writeValue(['a', 'b', 'c']);
      accessor.triggerRemove('b');

      expect(accessor.values()).toEqual(['a', 'c']);
    });

    it('should not modify array for non-existing item', () => {
      accessor.writeValue(['a', 'b']);
      accessor.triggerRemove('z');

      expect(accessor.values()).toEqual(['a', 'b']);
    });

    it('should not call onChange for non-existing item', () => {
      accessor.writeValue(['a']);
      accessor.triggerRemove('z');

      expect(onChange).not.toHaveBeenCalled();
    });

    it('should handle removing from array with single item', () => {
      accessor.writeValue(['only']);
      accessor.triggerRemove('only');

      expect(accessor.values()).toEqual([]);
    });

    it('should remove all matching items with default compare', () => {
      accessor.writeValue(['a', 'a', 'b']);
      accessor.triggerRemove('a');

      expect(accessor.values()).toEqual(['b']);
    });

    it('should call onChange after removal', () => {
      accessor.writeValue(['x', 'y']);
      accessor.triggerRemove('x');

      expect(onChange).toHaveBeenCalledWith(['y']);
    });

    it('should use custom compareWith', () => {
      accessor.writeValue(['a', 'B', 'c']);
      accessor.triggerRemove('b', (a, b) => a.toLowerCase() === b.toLowerCase());
      expect(accessor.values()).toEqual(['a', 'c']);
    });

    it('should not remove if custom compareWith does not match', () => {
      accessor.writeValue(['a', 'b']);
      accessor.triggerRemove('c', (a, b) => a === b);
      expect(accessor.values()).toEqual(['a', 'b']);
    });
  });

  describe('reorderValue', () => {
    it('should move item forward', () => {
      accessor.writeValue(['a', 'b', 'c', 'd']);
      accessor.triggerReorder(0, 2);

      expect(accessor.values()).toEqual(['b', 'c', 'a', 'd']);
    });

    it('should move item backward', () => {
      accessor.writeValue(['a', 'b', 'c', 'd']);
      accessor.triggerReorder(3, 1);

      expect(accessor.values()).toEqual(['a', 'd', 'b', 'c']);
    });

    it('should be a no-op when fromIndex equals toIndex', () => {
      accessor.writeValue(['a', 'b', 'c']);
      accessor.triggerReorder(1, 1);

      expect(accessor.values()).toEqual(['a', 'b', 'c']);
    });

    it('should be a no-op when fromIndex is negative', () => {
      accessor.writeValue(['a', 'b']);
      accessor.triggerReorder(-1, 0);

      expect(accessor.values()).toEqual(['a', 'b']);
    });

    it('should be a no-op when fromIndex is out of bounds', () => {
      accessor.writeValue(['a', 'b']);
      accessor.triggerReorder(2, 0);

      expect(accessor.values()).toEqual(['a', 'b']);
    });

    it('should be a no-op when toIndex is negative', () => {
      accessor.writeValue(['a', 'b']);
      accessor.triggerReorder(0, -1);

      expect(accessor.values()).toEqual(['a', 'b']);
    });

    it('should be a no-op when toIndex is out of bounds', () => {
      accessor.writeValue(['a', 'b']);
      accessor.triggerReorder(0, 2);

      expect(accessor.values()).toEqual(['a', 'b']);
    });

    it('should be a no-op for an empty array', () => {
      accessor.triggerReorder(0, 1);

      expect(accessor.values()).toEqual([]);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('should call onChange after reorder', () => {
      accessor.writeValue(['a', 'b', 'c']);
      accessor.triggerReorder(0, 2);

      expect(onChange).toHaveBeenCalledWith(['b', 'c', 'a']);
    });

    it('should not call onChange on out-of-bounds', () => {
      accessor.writeValue(['a', 'b']);
      accessor.triggerReorder(5, 0);
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('containsValue', () => {
    it('should return true for an item that exists', () => {
      accessor.writeValue(['a', 'b', 'c']);

      expect(accessor.triggerContains('b')).toBe(true);
    });

    it('should return false for an item that does not exist', () => {
      accessor.writeValue(['a', 'b']);
      expect(accessor.triggerContains('z')).toBe(false);
    });

    it('should return false for an empty array', () => {
      expect(accessor.triggerContains('a')).toBe(false);
    });

    it('should use custom compareWith', () => {
      accessor.writeValue(['a', 'B', 'c']);
      expect(accessor.triggerContains('b', (a, b) => a.toLowerCase() === b.toLowerCase())).toBe(true);
    });

    it('should return false with custom compareWith mismatch', () => {
      accessor.writeValue(['a', 'b']);
      expect(accessor.triggerContains('c', (a, b) => a === b)).toBe(false);
    });

    it('should not mutate the array', () => {
      const items = ['x', 'y'];
      accessor.writeValue(items);

      expect(accessor.triggerContains('x')).toBe(true);
      expect(accessor.values()).toEqual(items);
    });
  });

  describe('clearValues', () => {
    it('should empty the values array', () => {
      accessor.writeValue(['a', 'b', 'c']);
      accessor.triggerClear();

      expect(accessor.values()).toEqual([]);
    });

    it('should call onChange with empty array', () => {
      accessor.writeValue(['a']);
      accessor.triggerClear();

      expect(onChange).toHaveBeenCalledWith([]);
    });

    it('should work when already empty', () => {
      accessor.triggerClear();

      expect(accessor.values()).toEqual([]);
      expect(onChange).toHaveBeenCalledWith([]);
    });
  });

  describe('CVA integration', () => {
    it('should propagate onChange via toggleValue', () => {
      accessor.triggerToggle('added');

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(['added']);
    });

    it('should propagate onChange via addValue', () => {
      accessor.triggerAdd('item');

      expect(onChange).toHaveBeenCalledWith(['item']);
    });

    it('should propagate onChange via removeValue', () => {
      accessor.writeValue(['keep', 'remove']);
      accessor.triggerRemove('remove');

      expect(onChange).toHaveBeenCalledWith(['keep']);
    });

    it('should propagate onChange via reorderValue', () => {
      accessor.writeValue(['x', 'y']);
      accessor.triggerReorder(0, 1);

      expect(onChange).toHaveBeenCalledWith(['y', 'x']);
    });

    it('should propagate onChange via clearValues', () => {
      accessor.writeValue(['a']);
      accessor.triggerClear();

      expect(onChange).toHaveBeenCalledWith([]);
    });

    it('should call onTouched', () => {
      const onTouched = vi.fn();
      accessor.setOnTouched(onTouched);
      accessor.triggerMarkAsTouched();

      expect(onTouched).toHaveBeenCalledTimes(1);
    });

    it('should update disabled state via setDisabledState', () => {
      expect(accessor.disabled).toBe(false);
      accessor.setDisabledState(true);
      expect(accessor.disabled).toBe(true);
    });

    it('should sync value signal with values signal after writeValue', () => {
      accessor.writeValue(['a', 'b']);
      expect(accessor.value).toEqual(['a', 'b']);
      expect(accessor.values()).toEqual(['a', 'b']);
    });
  });

  describe('custom compareWith with objects', () => {
    let objAccessor: TestObjectArrayAccessor;
    let objOnChange: (v: { id: number; name: string }[] | null) => void;

    beforeEach(() => {
      const fixture = TestBed.createComponent(TestObjectArrayAccessor);
      objAccessor = fixture.componentInstance;
      objOnChange = vi.fn();
      objAccessor.setOnChange(objOnChange);
    });

    const items = [
      { id: 1, name: 'one' },
      { id: 2, name: 'two' },
      { id: 3, name: 'three' },
    ];

    it('should toggle object by reference', () => {
      objAccessor.triggerToggle(items[0]);
      expect(objAccessor.values()).toEqual([items[0]]);
    });

    it('should toggle object by custom compareWith (id)', () => {
      objAccessor.writeValue([items[0], items[1]]);
      const match = { id: 2, name: 'two' };

      objAccessor.triggerToggle(match, (a, b) => a.id === b.id);
      expect(objAccessor.values()).toEqual([items[0]]);
    });

    it('should add object with custom compareWith', () => {
      objAccessor.writeValue([items[0]]);
      const dup = { id: 1, name: 'one' };

      objAccessor.triggerAdd(dup, (a, b) => a.id === b.id);
      expect(objAccessor.values()).toEqual([items[0]]);
    });

    it('should remove object with custom compareWith', () => {
      objAccessor.writeValue([items[0], items[1], items[2]]);
      const match = { id: 2, name: 'two' };

      objAccessor.triggerRemove(match, (a, b) => a.id === b.id);
      expect(objAccessor.values()).toEqual([items[0], items[2]]);
    });

    it('should check contains with custom compareWith', () => {
      objAccessor.writeValue([items[0], items[1]]);
      const match = { id: 1, name: 'one' };

      expect(objAccessor.triggerContains(match, (a, b) => a.id === b.id)).toBe(true);
      expect(objAccessor.triggerContains({ id: 99, name: 'nope' }, (a, b) => a.id === b.id)).toBe(false);
    });
  });
});
