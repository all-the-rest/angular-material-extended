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
<div class="rui-max-w-4xl rui-mx-auto rui-p-4 rui-md:p-6 rui-space-y-8">
  <h1 style="font-size:1.5rem;font-weight:700;">Navigation</h1>

  <section>
    <h2 id="breadcrumb-overview" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Breadcrumb</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">
      The <code class="rui-text-xs rui-bg-surface-container rui-px-1 rui-py-0.5 rui-rounded">RuiBreadcrumb</code> component
      provides automatic breadcrumb generation from route data or manual item input.
      See the <a routerLink="/breadcrumb" class="rui-text-primary rui-underline">full Breadcrumb demo</a> for all features.
    </p>
    <mat-card appearance="outlined">
      <mat-card-content class="rui-pt-4">
        <rui-breadcrumb />
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="breadcrumbHtml" />
  </section>

  <section>
    <h2 id="on-this-page" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">On This Page</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">
      The <code class="rui-text-xs rui-bg-surface-container rui-px-1 rui-py-0.5 rui-rounded">RuiOnThisPage</code> component
      tracks headings on the current page and highlights the active one using IntersectionObserver.
      It auto-discovers <code class="rui-text-xs rui-bg-surface-container rui-px-1 rui-py-0.5 rui-rounded">&lt;h2&gt;</code>
      elements with <code class="rui-text-xs rui-bg-surface-container rui-px-1 rui-py-0.5 rui-rounded">id</code> attributes
      inside the configured container.
    </p>
    <mat-card appearance="outlined">
      <mat-card-content class="rui-pt-4">
        <div class="rui-flex rui-items-start rui-gap-4">
          <div class="rui-flex-1">
            <p class="rui-text-sm rui-text-on-surface-variant rui-mb-2">
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
    <h2 id="on-this-page-config" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Configuration</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">
      The component accepts inputs for custom heading selectors, scroll containers, root margins, and title.
    </p>
    <mat-card appearance="outlined">
      <mat-card-content class="rui-pt-4">
        <pre ruiCodeHighlight language="typescript" class="rui-m-0 rui-text-xs rui-leading-relaxed" style="overflow-x:auto;"><code>{{ configCode }}</code></pre>
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
