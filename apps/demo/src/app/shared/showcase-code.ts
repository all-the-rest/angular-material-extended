import { Component, input, signal, ChangeDetectionStrategy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { RuiCodeHighlight } from './code-highlight.directive';

@Component({
  selector: 'rui-showcase-code',
  standalone: true,
  imports: [MatTabsModule, RuiCodeHighlight],
  template: `
    <div class="rui-mt-4 rui-rounded-xl rui-border rui-border-outline-variant" style="overflow:hidden;">
      <div class="rui-flex rui-items-center rui-justify-between rui-px-3 rui-py-2 rui-text-xs rui-font-semibold rui-text-on-surface-variant rui-border-b rui-border-outline-variant rui-bg-surface-container-low">
        <span>{{ label() || 'Code' }}</span>
        <button
          (click)="copyCode()"
          class="rui-inline-flex rui-items-center rui-gap-1 rui-px-2 rui-py-1 rui-rounded-md rui-text-xs rui-font-medium rui-transition-colors"
          style="background:transparent;border:none;cursor:pointer;"
          [class.rui-text-primary]="!copied()"
          [class.rui-text-tertiary]="copied()"
        >
          @if (copied()) {
            <span>Copied!</span>
          } @else {
            <span>Copy</span>
          }
        </button>
      </div>
      <mat-tab-group disableRipple>
        <mat-tab label="Template">
          <div class="rui-p-3 rui-bg-surface-container-low" style="max-height:24rem;overflow-y:auto;">
            @if (html()) {
              <pre ruiCodeHighlight language="html" class="rui-m-0 rui-text-xs rui-leading-relaxed" style="overflow-x:auto;"><code>{{ html() }}</code></pre>
            }
          </div>
        </mat-tab>
        <mat-tab label="TypeScript">
          <div class="rui-p-3 rui-bg-surface-container-low" style="max-height:24rem;overflow-y:auto;">
            @if (ts()) {
              <pre ruiCodeHighlight language="typescript" class="rui-m-0 rui-text-xs rui-leading-relaxed" style="overflow-x:auto;"><code>{{ ts() }}</code></pre>
            }
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowcaseCode {
  readonly html = input('');
  readonly ts = input('');
  readonly label = input('');

  protected copied = signal(false);

  private platformId = inject(PLATFORM_ID);

  protected copyCode(): void {
    const text = this.html() || this.ts();
    if (!text || !isPlatformBrowser(this.platformId)) return;
    navigator.clipboard.writeText(text).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }
}
