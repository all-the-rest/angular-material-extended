import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RuiBreadcrumb } from '@all-the.rest/mat-extended/breadcrumb';
import { ShowcaseCode } from '../../shared/showcase-code';
import { RuiCodeHighlight } from '../../shared/code-highlight.directive';

@Component({
  selector: 'rui-navigation-demo',
  standalone: true,
  imports: [RouterModule, MatCardModule, MatButtonModule, RuiBreadcrumb, ShowcaseCode, RuiCodeHighlight],
  template: `
<div class="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
  <h1 class="!text-2xl !font-bold">Navigation</h1>

  <section>
    <h2 id="breadcrumb-overview" class="!text-xl !font-semibold mb-1">Breadcrumb</h2>
    <p class="text-sm text-[var(--mat-sys-on-surface-variant)] mb-3">
      The <code class="text-xs bg-[var(--mat-sys-surface-container)] px-1 py-0.5 rounded">RuiBreadcrumb</code> component
      provides automatic breadcrumb generation from route data or manual item input.
      See the <a routerLink="/breadcrumb" class="text-[var(--mat-sys-primary)] underline">full Breadcrumb demo</a> for all features.
    </p>
    <mat-card appearance="outlined">
      <mat-card-content class="pt-4">
        <rui-breadcrumb />
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="breadcrumbHtml" />
  </section>

  <section>
    <h2 id="on-this-page" class="!text-xl !font-semibold mb-1">On This Page</h2>
    <p class="text-sm text-[var(--mat-sys-on-surface-variant)] mb-3">
      The <code class="text-xs bg-[var(--mat-sys-surface-container)] px-1 py-0.5 rounded">RuiOnThisPage</code> component
      tracks headings on the current page and highlights the active one using IntersectionObserver.
      It auto-discovers <code class="text-xs bg-[var(--mat-sys-surface-container)] px-1 py-0.5 rounded">&lt;h2&gt;</code>
      elements with <code class="text-xs bg-[var(--mat-sys-surface-container)] px-1 py-0.5 rounded">id</code> attributes
      inside the configured container.
    </p>
    <mat-card appearance="outlined">
      <mat-card-content class="pt-4">
        <div class="flex items-start gap-4">
          <div class="flex-1">
            <p class="text-sm text-[var(--mat-sys-on-surface-variant)] mb-2">
              The sidebar on the right of this page (visible on xl+ screens) demonstrates the component.
              Scroll to see the active heading change.
            </p>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="onThisPageHtml" [ts]="onThisPageTs" />
  </section>

  <section>
    <h2 id="on-this-page-config" class="!text-xl !font-semibold mb-1">Configuration</h2>
    <p class="text-sm text-[var(--mat-sys-on-surface-variant)] mb-3">
      The component accepts inputs for custom heading selectors, scroll containers, root margins, and title.
    </p>
    <mat-card appearance="outlined">
      <mat-card-content class="pt-4">
        <pre ruiCodeHighlight language="typescript" class="m-0 text-xs leading-relaxed overflow-x-auto"><code>{{ configCode }}</code></pre>
      </mat-card-content>
    </mat-card>
  </section>
</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationDemo {
  protected breadcrumbHtml = `<rui-breadcrumb />`;

  protected onThisPageHtml = `<rui-on-this-page />`;

  protected onThisPageTs = [
    `import { RuiOnThisPage } from '@all-the.rest/mat-extended/on-this-page';`,
    ``,
    `// In your component imports:`,
    `imports: [RuiOnThisPage],`,
    ``,
    `// In your template:`,
    `<rui-on-this-page />`,
    ``,
    `// Or with custom inputs:`,
    `<rui-on-this-page`,
    `  headingSelector="article h3[id]"`,
    `  title="In this article"`,
    `  rootMargin="-10% 0px -70% 0px"`,
    `/>`,
  ].join('\n');

  protected configCode = [
    `// Custom heading selector and scroll container`,
    `<rui-on-this-page`,
    `  headingSelector="article h3[id]"`,
    `  scrollContainer=".article-content"`,
    `  title="In this article"`,
    `  rootMargin="-10% 0px -70% 0px"`,
    `/>`,
    ``,
    `// Available inputs:`,
    `// - headingSelector: CSS selector for headings (default: 'main h2[id]')`,
    `// - scrollContainer: CSS selector for scroll container (default: 'main')`,
    `// - title: sidebar title (default: 'On this page')`,
    `// - rootMargin: IntersectionObserver margin (default: '-10% 0px -70% 0px')`,
  ].join('\n');
}
