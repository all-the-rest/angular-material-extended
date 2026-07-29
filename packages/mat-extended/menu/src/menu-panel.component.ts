import { Component, input, output, signal, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import type { RuiMenuItem } from './menu.types';

@Component({
  selector: 'rui-menu-panel',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './menu-panel.html',
  styleUrl: './menu-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'menu',
    '(keydown.arrowdown)': 'onArrowDown()',
    '(keydown.arrowup)': 'onArrowUp()',
    '(keydown.escape)': 'closePanel.emit()',
  },
})
export class RuiMenuPanel {
  readonly items = input<RuiMenuItem[]>([]);
  readonly closePanel = output<void>();
  readonly selectedItem = output<RuiMenuItem>();
  readonly activeIndex = signal(0);

  onArrowDown(): void {
    const items = this.items();
    const len = items.length;
    let next = this.activeIndex();
    for (let i = 0; i < len; i++) {
      next = (next + 1) % len;
      if (!items[next]?.separator && !items[next]?.disabled) {
        this.activeIndex.set(next);
        return;
      }
    }
  }

  onArrowUp(): void {
    const items = this.items();
    const len = items.length;
    let prev = this.activeIndex();
    for (let i = 0; i < len; i++) {
      prev = (prev - 1 + len) % len;
      if (!items[prev]?.separator && !items[prev]?.disabled) {
        this.activeIndex.set(prev);
        return;
      }
    }
  }

  onSelect(item: RuiMenuItem): void {
    if (item.disabled) return;
    this.selectedItem.emit(item);
  }
}
