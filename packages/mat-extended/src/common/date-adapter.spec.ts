import { TestBed } from '@angular/core/testing';
import { DateAdapter } from '@angular/material/core';
import { RuiDateAdapter, createDateFormats, provideRuiDateAdapter } from './date-adapter';

describe('RuiDateAdapter DI decoration', () => {
  it('should not emit the "inherits its @Injectable decorator" deprecation warning when instantiated via useClass', () => {
    TestBed.resetTestingModule();
    const warnings: string[] = [];
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation((...args: unknown[]) => {
      warnings.push(args.map(String).join(' '));
    });
    try {
      TestBed.configureTestingModule({
        providers: [provideRuiDateAdapter()],
      });
      TestBed.inject(DateAdapter);
      expect(
        warnings.some(w => w.includes('RuiDateAdapter') && w.includes('@Injectable')),
      ).toBe(false);
    } finally {
      warnSpy.mockRestore();
    }
  });

  it('should carry its own injectable definition instead of inheriting it', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [provideRuiDateAdapter()],
    });
    const adapter = TestBed.inject(DateAdapter);
    expect(adapter).toBeInstanceOf(RuiDateAdapter);
    expect(adapter.parse('2026-12-24', 'YYYY-MM-dd')).not.toBeNull();
  });
});

describe('RuiDateAdapter', () => {
  let adapter: RuiDateAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRuiDateAdapter(createDateFormats('YYYY-MM-dd'))],
    });
    adapter = TestBed.inject(DateAdapter) as RuiDateAdapter;
  });

  describe('parse', () => {
    it('should parse YYYY-MM-dd format without timezone shift', () => {
      const date = adapter.parse('2026-12-24', 'YYYY-MM-dd') as Date;
      expect(date.getFullYear()).toBe(2026);
      expect(date.getMonth()).toBe(11);
      expect(date.getDate()).toBe(24);
    });

    it('should not shift date by one day when serialized to ISO string', () => {
      const date = adapter.parse('2026-12-24', 'YYYY-MM-dd') as Date;
      expect(date.toISOString()).toBe('2026-12-24T00:00:00.000Z');
    });

    it('should parse dd.MM.YYYY format without timezone shift', () => {
      const date = adapter.parse('24.12.2026', 'dd.MM.YYYY') as Date;
      expect(date.getFullYear()).toBe(2026);
      expect(date.getMonth()).toBe(11);
      expect(date.getDate()).toBe(24);
      expect(date.toISOString()).toBe('2026-12-24T00:00:00.000Z');
    });

    it('should parse MM/dd/YYYY format without timezone shift', () => {
      const date = adapter.parse('12/24/2026', 'MM/dd/YYYY') as Date;
      expect(date.getFullYear()).toBe(2026);
      expect(date.getMonth()).toBe(11);
      expect(date.getDate()).toBe(24);
      expect(date.toISOString()).toBe('2026-12-24T00:00:00.000Z');
    });

    it('should return null for invalid date', () => {
      expect(adapter.parse('2026-13-01', 'YYYY-MM-dd')).toBeNull();
      expect(adapter.parse('2026-02-30', 'YYYY-MM-dd')).toBeNull();
    });

    it('should return null for empty string', () => {
      expect(adapter.parse('', 'YYYY-MM-dd')).toBeNull();
    });

    it('should return null for non-string non-number', () => {
      expect(adapter.parse(undefined, 'YYYY-MM-dd')).toBeNull();
    });

    it('should parse number timestamp', () => {
      const ts = Date.UTC(2026, 11, 24);
      const date = adapter.parse(ts, 'YYYY-MM-dd') as Date;
      expect(date.getTime()).toBe(ts);
    });
  });

  describe('format', () => {
    it('should format date using string format', () => {
      const date = new Date(Date.UTC(2026, 11, 24));
      const result = adapter.format(date, 'YYYY-MM-dd');
      expect(result).toBe('2026-12-24');
    });

    it('should format date using dd.MM.YYYY format', () => {
      const date = new Date(Date.UTC(2026, 11, 24));
      const result = adapter.format(date, 'dd.MM.YYYY');
      expect(result).toBe('24.12.2026');
    });

    it('should format date using MM/dd/YYYY format', () => {
      const date = new Date(Date.UTC(2026, 11, 24));
      const result = adapter.format(date, 'MM/dd/YYYY');
      expect(result).toBe('12/24/2026');
    });

    it('should format using Intl.DateTimeFormat for object format', () => {
      const date = new Date(Date.UTC(2026, 11, 24));
      const result = adapter.format(date, { year: 'numeric', month: 'short', day: 'numeric' });
      expect(result).toContain('Dec');
      expect(result).toContain('24');
      expect(result).toContain('2026');
    });
  });

  describe('roundtrip: parse then format', () => {
    it('should preserve YYYY-MM-dd through parse/format roundtrip', () => {
      const input = '2026-12-24';
      const date = adapter.parse(input, 'YYYY-MM-dd') as Date;
      const output = adapter.format(date, 'YYYY-MM-dd');
      expect(output).toBe(input);
    });

    it('should preserve dd.MM.YYYY through parse/format roundtrip', () => {
      const input = '24.12.2026';
      const date = adapter.parse(input, 'dd.MM.YYYY') as Date;
      const output = adapter.format(date, 'dd.MM.YYYY');
      expect(output).toBe(input);
    });

    it('should preserve ISO serialization through roundtrip', () => {
      const date = adapter.parse('2026-12-24', 'YYYY-MM-dd') as Date;
      expect(date.toISOString()).toBe('2026-12-24T00:00:00.000Z');
    });
  });
});

describe('createDateFormats', () => {
  it('should create parse config with dateInput', () => {
    const formats = createDateFormats('YYYY-MM-dd');
    expect(formats.parse.dateInput).toBe('YYYY-MM-dd');
  });

  it('should create display config with dateInput', () => {
    const formats = createDateFormats('dd.MM.YYYY');
    expect(formats.display.dateInput).toBe('dd.MM.YYYY');
  });
});
