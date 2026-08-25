import { Injectable, Provider } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';

function parseFormat(format: string): { type: 'lit' | 'year' | 'month' | 'day'; value: string }[] {
  const segments: { type: 'lit' | 'year' | 'month' | 'day'; value: string }[] = [];
  let i = 0;
  while (i < format.length) {
    const ch = format[i];
    if (!ch) break;
    if (ch === 'Y' || ch === 'M' || ch === 'd') {
      const type = ch === 'Y' ? 'year' : ch === 'M' ? 'month' : 'day';
      let value = '';
      while (i < format.length) {
        const c = format[i];
        if (c === ch) { value += c; i++; } else break;
      }
      segments.push({ type, value });
    } else {
      let value = '';
      while (i < format.length) {
        const c = format[i];
        if (c && c !== 'Y' && c !== 'M' && c !== 'd') { value += c; i++; } else break;
      }
      segments.push({ type: 'lit', value });
    }
  }
  return segments;
}

export function createDateFormats(format: string) {
  return {
    parse: { dateInput: format },
    display: {
      dateInput: format,
      monthYearLabel: { year: 'numeric', month: 'short' } as Intl.DateTimeFormatOptions,
      dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' } as Intl.DateTimeFormatOptions,
      monthYearA11yLabel: { year: 'numeric', month: 'long' } as Intl.DateTimeFormatOptions,
    },
  };
}

export function provideRuiDateAdapter(formats = MAT_NATIVE_DATE_FORMATS): Provider[] {
  return [
    { provide: DateAdapter, useClass: RuiDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: formats },
  ];
}

@Injectable()
export class RuiDateAdapter extends NativeDateAdapter {
  override parse(value: unknown, parseFormat: unknown): Date | null {
    if (typeof value === 'number') return new Date(value);
    if (typeof value !== 'string' || !value) return null;
    if (typeof parseFormat === 'string') return parseByFormat(value, parseFormat);
    if (typeof value === 'string') return new Date(Date.parse(value));
    return null;
  }

  override format(date: Date, displayFormat: unknown): string {
    if (typeof displayFormat === 'string') return formatByPattern(date, displayFormat);
    if (!this.isValid(date)) {
      throw Error('RuiDateAdapter: Cannot format invalid date.');
    }
    const dtf = new Intl.DateTimeFormat(this.locale, {
      ...(displayFormat as Intl.DateTimeFormatOptions),
      timeZone: 'utc',
    });
    return dtf.format(new Date(date.getTime()));
  }
}

function parseByFormat(value: string, format: string): Date | null {
  const digits = value.replace(/\D/g, '');
  const segs = parseFormat(format).filter(s => s.type !== 'lit');

  let pos = 0;
  let year = 0;
  let month = 1;
  let day = 1;
  for (const seg of segs) {
    const raw = digits.slice(pos, pos + seg.value.length);
    if (!raw || raw.length < seg.value.length) return null;
    const val = parseInt(raw, 10);
    if (seg.type === 'year') year = val;
    else if (seg.type === 'month') month = val;
    else day = val;
    pos += seg.value.length;
  }

  if (year < 1 || month < 1 || month > 12 || day < 1 || day > 31) return null;

  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;

  return date;
}

function formatByPattern(date: Date, format: string): string {
  return format
    .replace('YYYY', String(date.getUTCFullYear()))
    .replace('MM', String(date.getUTCMonth() + 1).padStart(2, '0'))
    .replace('dd', String(date.getUTCDate()).padStart(2, '0'));
}
