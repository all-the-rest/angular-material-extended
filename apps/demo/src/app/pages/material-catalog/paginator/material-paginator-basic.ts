import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-paginator-basic',
  standalone: true,
  imports: [MatPaginatorModule, FormsModule, ShowcaseCode],
  template: `
    <section id="paginator-basic" class="rui-mb-8">
      <h2 id="paginator-basic" class="rui-font-bold rui-text-on-surface rui-mb-1">Basic Paginator</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">mat-paginator with configurable page size and first/last buttons.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface rui-p-5">
        <mat-paginator
          [length]="100"
          [pageSize]="10"
          [pageSizeOptions]="[5, 10, 25, 100]"
          [showFirstLastButtons]="true"
          aria-label="Paginator"
        >
        </mat-paginator>
      </div>

      <rui-showcase-code
        html='<mat-paginator
  [length]="100"
  [pageSize]="10"
  [pageSizeOptions]="[5, 10, 25, 100]"
  [showFirstLastButtons]="true"
  aria-label="Paginator"
>
</mat-paginator>'
        ts="import { MatPaginatorModule } from '@angular/material/paginator';

// In component imports:
imports: [MatPaginatorModule],"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialPaginatorBasic {}
