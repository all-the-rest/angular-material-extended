import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RuiFileManager } from '@all-the.rest/mat-extended/file-manager';
import { RuiFileUpload } from '@all-the.rest/mat-extended/file-upload';
import type { RuiFileItem, RuiUploadHandler } from '@all-the.rest/mat-extended/file-upload';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterLink } from '@angular/router';
import { ShowcaseCode } from '../../shared/showcase-code';

@Component({
  selector: 'rui-file-manager-demo',
  standalone: true,
  imports: [
    RuiFileManager, RuiFileUpload, MatCardModule, MatSlideToggleModule,
    RouterLink, ShowcaseCode,
  ],
  template: `
<div class="rui-max-w-4xl rui-mx-auto rui-p-4 rui-md:p-6 rui-space-y-8">
  <h1 class="rui-font-bold">File Management</h1>

  <p class="rui-text-sm rui-text-on-surface-variant">
    Der File Manager verwaltet existierende Dateien: Umbenennen, Sortieren (Drag & Drop + Buttons), Löschen.
    Für Upload-Funktionalität (Dropzone, Validierung, Progress) siehe <a routerLink="/file-upload" class="rui-text-primary rui-underline">File Upload</a>.
  </p>

  <!-- Section 1: Basic -->
  <section>
    <h2 id="basic" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Basic File Manager</h2>

    <mat-card>
      <mat-card-header><mat-card-title>Toggle Features</mat-card-title></mat-card-header>
      <mat-card-content class="rui-pt-4 rui-flex rui-flex-wrap rui-gap-4 rui-items-center">
        <mat-slide-toggle [checked]="basicSortable()" (change)="basicSortable.set($event.checked)">
          Sortable
        </mat-slide-toggle>
        <mat-slide-toggle [checked]="basicEditable()" (change)="basicEditable.set($event.checked)">
          Editable
        </mat-slide-toggle>
        <mat-slide-toggle [checked]="basicFileMgmt()" (change)="basicFileMgmt.set($event.checked)">
          File Management
        </mat-slide-toggle>
      </mat-card-content>
    </mat-card>

    <mat-card>
      <mat-card-content class="rui-pt-4">
        <rui-file-manager
          [(files)]="basicFiles"
          [sortable]="basicSortable()"
          [editable]="basicEditable()"
          [fileManagement]="basicFileMgmt()"
        />
      </mat-card-content>
    </mat-card>

    <rui-showcase-code [html]="basicHtml" [ts]="basicTs" />
  </section>

  <!-- Section 2: Rename -->
  <section>
    <h2 id="rename" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Rename (mit/ohne Extension)</h2>

    <mat-card>
      <mat-card-header><mat-card-title>Extension Handling</mat-card-title></mat-card-header>
      <mat-card-content class="rui-pt-4 rui-flex rui-flex-wrap rui-gap-4 rui-items-center">
        <mat-slide-toggle [checked]="allowExtEdit()" (change)="allowExtEdit.set($event.checked)">
          Edit extension ({{ allowExtEdit() ? 'on' : 'off — extension preserved' }})
        </mat-slide-toggle>
      </mat-card-content>
    </mat-card>

    <mat-card>
      <mat-card-content class="rui-pt-4">
        <rui-file-manager
          [(files)]="renameFiles"
          [editable]="true"
          [editableExtension]="allowExtEdit()"
          [fileManagement]="true"
        />
      </mat-card-content>
    </mat-card>

    <rui-showcase-code [html]="renameHtml" [ts]="renameTs" />
  </section>

  <!-- Section 3: Sort -->
  <section>
    <h2 id="sort" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Sortierung (Drag & Drop + Buttons)</h2>

    <mat-card>
      <mat-card-header><mat-card-title>Drag Handle &amp; Move Buttons</mat-card-title></mat-card-header>
      <mat-card-content class="rui-pt-4">
        <p class="rui-text-sm rui-text-on-surface-variant">
          Dateien per Drag Handle (Gitter-Icon) oder den Pfeil-Buttons neu anordnen.
        </p>
      </mat-card-content>
    </mat-card>

    <mat-card>
      <mat-card-content class="rui-pt-4">
        <rui-file-manager
          [(files)]="sortFiles"
          [sortable]="true"
          [fileManagement]="false"
        />
      </mat-card-content>
    </mat-card>

    <rui-showcase-code [html]="sortHtml" [ts]="sortTs" />
  </section>

  <!-- Section 4: Composition -->
  <section>
    <h2 id="composition" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Composition mit File Upload</h2>

    <mat-card>
      <mat-card-header><mat-card-title>Upload + Management</mat-card-title></mat-card-header>
      <mat-card-content class="rui-pt-4 rui-flex rui-flex-col rui-gap-4">
        <rui-file-upload
          [(files)]="sharedFiles"
          [uploadHandler]="mockHandler"
          [autoUpload]="true"
          [fileManagement]="false"
        />
        <rui-file-manager
          [(files)]="sharedFiles"
          [sortable]="true"
          [editable]="true"
          [fileManagement]="true"
        />
      </mat-card-content>
    </mat-card>

    <rui-showcase-code [html]="compositionHtml" [ts]="compositionTs" />
  </section>
</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileManagerDemo {
  protected basicSortable = signal(true);
  protected basicEditable = signal(true);
  protected basicFileMgmt = signal(true);

  protected basicFiles = signal<RuiFileItem[]>([
    { id: 'f1', file: new File([], 'report-2024.pdf', { type: 'application/pdf' }), status: 'done', progress: 100, editName: 'report-2024.pdf' },
    { id: 'f2', file: new File([], 'vacation-photo.jpg', { type: 'image/jpeg' }), status: 'done', progress: 100, editName: 'vacation-photo.jpg' },
    { id: 'f3', file: new File([], 'data-export.csv', { type: 'text/csv' }), status: 'done', progress: 100, editName: 'data-export.csv' },
    { id: 'f4', file: new File([], 'notes.txt', { type: 'text/plain' }), status: 'done', progress: 100, editName: 'notes.txt' },
  ]);

  protected allowExtEdit = signal(false);

  protected renameFiles = signal<RuiFileItem[]>([
    { id: 'r1', file: new File([], 'presentation-v3.pptx', { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' }), status: 'done', progress: 100, editName: 'presentation-v3.pptx' },
    { id: 'r2', file: new File([], 'budget-2024.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), status: 'done', progress: 100, editName: 'budget-2024.xlsx' },
    { id: 'r3', file: new File([], 'readme.md', { type: 'text/markdown' }), status: 'done', progress: 100, editName: 'readme.md' },
  ]);

  protected sortFiles = signal<RuiFileItem[]>([
    { id: 's1', file: new File([], 'alpha.doc'), status: 'done', progress: 100, editName: 'alpha.doc' },
    { id: 's2', file: new File([], 'bravo.doc'), status: 'done', progress: 100, editName: 'bravo.doc' },
    { id: 's3', file: new File([], 'charlie.doc'), status: 'done', progress: 100, editName: 'charlie.doc' },
    { id: 's4', file: new File([], 'delta.doc'), status: 'done', progress: 100, editName: 'delta.doc' },
  ]);

  protected sharedFiles = signal<RuiFileItem[]>([]);

  protected mockHandler: RuiUploadHandler = () =>
    new Promise<void>((resolve) => setTimeout(resolve, 1500));

  protected basicHtml = `<rui-file-manager
  [(files)]="files"
  [sortable]="true"
  [editable]="true"
  [fileManagement]="true"
/>`;

  protected basicTs = `import { Component, signal } from '@angular/core';
import { RuiFileManager } from '@all-the.rest/mat-extended/file-manager';
import type { RuiFileItem } from '@all-the.rest/mat-extended/file-upload';

@Component({ imports: [RuiFileManager] })
export class MyComponent {
  files = signal<RuiFileItem[]>([
    { id: '1', file: new File([], 'doc.pdf'), status: 'done', progress: 100 },
  ]);
}`;

  protected renameHtml = `<rui-file-manager
  [(files)]="files"
  [editable]="true"
  [editableExtension]="allowExtEdit()"
  [fileManagement]="true"
/>`;

  protected renameTs = `allowExtEdit = signal(false);

// editableExtension=false: Extension wird abgetrennt
// und als Badge angezeigt, nur der Basisname editierbar`;

  protected sortHtml = `<rui-file-manager
  [(files)]="files"
  [sortable]="true"
  [fileManagement]="false"
/>`;

  protected sortTs = `// sortable aktiviert Drag Handle + Pfeil-Buttons`;

  protected compositionHtml = `<rui-file-upload
  [(files)]="sharedFiles"
  [uploadHandler]="handler"
  [autoUpload]="true"
  [fileManagement]="false"
/>
<rui-file-manager
  [(files)]="sharedFiles"
  [sortable]="true"
  [editable]="true"
  [fileManagement]="true"
/>`;

  protected compositionTs = `import { RuiFileUpload } from '@all-the.rest/mat-extended/file-upload';
import { RuiFileManager } from '@all-the.rest/mat-extended/file-manager';
import type { RuiFileItem, RuiUploadHandler } from '@all-the.rest/mat-extended/file-upload';

sharedFiles = signal<RuiFileItem[]>([]);

handler: RuiUploadHandler = () =>
  new Promise((resolve) => setTimeout(resolve, 1500));`;
}
