import { Component, ChangeDetectionStrategy, inject, TemplateRef, ViewChild } from '@angular/core';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { ShowcaseCode } from '../../../shared/showcase-code';

@Component({
  selector: 'rui-material-bottom-sheet-basic',
  standalone: true,
  imports: [MatBottomSheetModule, MatButtonModule, MatListModule, ShowcaseCode],
  template: `
    <section id="bottom-sheet-basic" class="rui-mb-8">
      <h2 id="bottom-sheet-basic" class="rui-font-bold rui-text-on-surface rui-mb-1">Basic Bottom Sheet</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">Open a bottom sheet with a list of actions using MatBottomSheet service and a template.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface rui-p-5 rui-flex rui-gap-2 rui-flex-wrap rui-items-center">
        <button mat-raised-button color="primary" (click)="openBottomSheet()">Open Bottom Sheet</button>
      </div>

      <ng-template #bottomSheetTemplate>
        <mat-nav-list>
          <a mat-list-item tabindex="0" (click)="closeBottomSheet()" (keydown.enter)="closeBottomSheet()">
            <mat-icon matListItemIcon>share</mat-icon>
            <span matListItemTitle>Share</span>
          </a>
          <a mat-list-item tabindex="0" (click)="closeBottomSheet()" (keydown.enter)="closeBottomSheet()">
            <mat-icon matListItemIcon>link</mat-icon>
            <span matListItemTitle>Copy link</span>
          </a>
          <a mat-list-item tabindex="0" (click)="closeBottomSheet()" (keydown.enter)="closeBottomSheet()">
            <mat-icon matListItemIcon>edit</mat-icon>
            <span matListItemTitle>Edit</span>
          </a>
          <a mat-list-item tabindex="0" (click)="closeBottomSheet()" (keydown.enter)="closeBottomSheet()" class="rui-text-error">
            <mat-icon matListItemIcon color="warn">delete</mat-icon>
            <span matListItemTitle>Delete</span>
          </a>
        </mat-nav-list>
      </ng-template>

      <rui-showcase-code
        html="<button mat-raised-button color=&quot;primary&quot; (click)=&quot;openBottomSheet()&quot;>Open Bottom Sheet</button>

&lt;ng-template #bottomSheetTemplate&gt;
  &lt;mat-nav-list&gt;
    &lt;a mat-list-item (click)=&quot;closeBottomSheet()&quot;&gt;
      &lt;mat-icon matListItemIcon&gt;share&lt;/mat-icon&gt;
      &lt;span matListItemTitle&gt;Share&lt;/span&gt;
    &lt;/a&gt;
    &lt;a mat-list-item (click)=&quot;closeBottomSheet()&quot;&gt;
      &lt;mat-icon matListItemIcon&gt;link&lt;/mat-icon&gt;
      &lt;span matListItemTitle&gt;Copy link&lt;/span&gt;
    &lt;/a&gt;
  &lt;/mat-nav-list&gt;
&lt;/ng-template&gt;"
        ts="import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

readonly #bottomSheet = inject(MatBottomSheet);
@ViewChild('bottomSheetTemplate') private readonly bottomSheetTemplate!: TemplateRef&lt;unknown&gt;;

openBottomSheet(): void {
  this.#bottomSheet.open(this.bottomSheetTemplate);
}"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialBottomSheetBasic {
  readonly #bottomSheet = inject(MatBottomSheet);

  @ViewChild('bottomSheetTemplate') private readonly bottomSheetTemplate!: TemplateRef<unknown>;

  openBottomSheet(): void {
    this.#bottomSheet.open(this.bottomSheetTemplate);
  }

  closeBottomSheet(): void {
    this.#bottomSheet.dismiss();
  }
}
