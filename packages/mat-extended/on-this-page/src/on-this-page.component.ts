import {
  Component,
  ChangeDetectionStrategy,
  input,
  signal,
  afterNextRender,
  inject,
  DestroyRef,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { RuiOnThisPageItem } from './on-this-page.types';

@Component({
  selector: 'rui-on-this-page',
  standalone: true,
  styleUrl: './on-this-page.component.scss',
  template: `
    @if (tocItems().length > 0) {
      <div class="rui-on-this-page">
        <div class="rui-on-this-page__title">{{ title() }}</div>
        <nav class="rui-on-this-page__list" aria-label="On this page">
          @for (item of tocItems(); track item.id) {
            <a
              class="rui-on-this-page__link"
              [class.rui-on-this-page__link--active]="activeTocId() === item.id"
              (click)="scrollTo(item.id)"
              (keydown.enter)="scrollTo(item.id)"
              tabindex="0"
            >{{ item.text }}</a>
          }
        </nav>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RuiOnThisPage {
  private _router = inject(Router);
  private _destroyRef = inject(DestroyRef);

  readonly headingSelector = input<string>('main h2[id]');
  readonly rootMargin = input<string>('-10% 0px -70% 0px');
  readonly title = input<string>('On this page');
  readonly scrollContainer = input<string>('main');

  readonly tocItems = signal<RuiOnThisPageItem[]>([]);
  readonly activeTocId = signal('');

  private _mutationObserver: MutationObserver | null = null;
  private _intersectionObserver: IntersectionObserver | null = null;

  constructor() {
    afterNextRender(() => {
      this._buildToc();

      const container = document.querySelector(this.scrollContainer());
      if (container) {
        this._mutationObserver = new MutationObserver(() => this._buildToc());
        this._mutationObserver.observe(container, { childList: true, subtree: true });
      }

      this._setupIntersectionObserver();

      const sub = this._router.events
        .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
        .subscribe(() => setTimeout(() => this._buildToc()));
      this._destroyRef.onDestroy(() => {
        sub.unsubscribe();
        this._mutationObserver?.disconnect();
        this._intersectionObserver?.disconnect();
      });
    });
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  private _buildToc(): void {
    const container = document.querySelector(this.scrollContainer());
    if (!container) return;

    const headingElements = container.querySelectorAll<HTMLElement>(this.headingSelector());
    const items: RuiOnThisPageItem[] = [];
    headingElements.forEach((el) => {
      items.push({ id: el.id, text: el.textContent?.trim() ?? '' });
    });
    this.tocItems.set(items);

    const first = items[0];
    if (first) {
      this.activeTocId.set(first.id);
    }

    this._setupIntersectionObserver();
  }

  private _setupIntersectionObserver(): void {
    this._intersectionObserver?.disconnect();

    const container = document.querySelector(this.scrollContainer());
    if (!container) return;

    const headingElements = container.querySelectorAll<HTMLElement>(this.headingSelector());
    if (headingElements.length === 0) return;

    this._intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeTocId.set(entry.target.id);
          }
        }
      },
      {
        root: container,
        rootMargin: this.rootMargin(),
      },
    );

    const observer = this._intersectionObserver;
    if (observer) {
      headingElements.forEach((el) => observer.observe(el));
    }
  }
}
