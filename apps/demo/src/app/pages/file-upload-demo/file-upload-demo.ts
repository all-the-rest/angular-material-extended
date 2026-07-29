import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

import { RuiFileUpload } from '@all-the.rest/mat-extended/file-upload';
import { RuiFileItem, RuiUploadHandler } from '@all-the.rest/mat-extended/file-upload';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ShowcaseCode } from '../../shared/showcase-code';

@Component({
  selector: 'rui-file-upload-demo',
  standalone: true,
  imports: [
    RuiFileUpload, MatCardModule, MatSlideToggleModule,
    MatFormFieldModule, MatInputModule, MatButtonModule,
    FormsModule, ReactiveFormsModule, ShowcaseCode,
  ],
  template: `
<div class="rui-max-w-4xl rui-mx-auto rui-p-4 rui-md:p-6 rui-space-y-8">
  <h1 class="rui-font-bold">File Upload Demo</h1>
  <p class="rui-text-sm rui-text-on-surface-variant">
    Drag &amp; Drop Upload mit Validierung, Progress-Tracking und Form-Integration.
  </p>

  <section>
    <h2 id="basic" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Basic Usage</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">Configure multiple files, max size, and auto-upload behavior.</p>
    <mat-card>
      <mat-card-content class="rui-pt-4 rui-flex rui-flex-col rui-gap-4">
        <div class="rui-flex rui-gap-4 rui-items-center rui-flex-wrap">
          <mat-slide-toggle [checked]="multipleFiles()" (change)="multipleFiles.set($event.checked)">
            Multiple files
          </mat-slide-toggle>
          <mat-form-field class="rui-w-48">
            <mat-label>Max file size (bytes)</mat-label>
            <input matInput type="number" [value]="maxFileSize()" (input)="onMaxSizeChange($event)" />
          </mat-form-field>
          <mat-slide-toggle [checked]="autoUploadEnabled()" (change)="autoUploadEnabled.set($event.checked)">
            Auto Upload
          </mat-slide-toggle>
        </div>
        <rui-file-upload
          [multiple]="multipleFiles()"
          [maxSize]="maxFileSize()"
          [autoUpload]="autoUploadEnabled()"
          [uploadHandler]="uploadHandler"
          (uploadStart)="onUploadStart($event)"
        />
        @if (uploadedFiles().length > 0) {
          <div>
            <strong>Uploaded Files</strong>
            <ul class="rui-list-disc rui-pl-5">
              @for (f of uploadedFiles(); track f.id) {
                <li>{{ f.file.name }} &mdash; {{ f.status }}</li>
              }
            </ul>
          </div>
        }
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="basicHtml" [ts]="basicTs" />
  </section>

  <section>
    <h2 id="accept" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">File Type Filtering</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">Restrict accepted file types using the <code>accept</code> attribute.</p>
    <mat-card>
      <mat-card-content class="rui-pt-4">
        <rui-file-upload
          accept="image/*"
          [maxFiles]="5"
          dropzoneText="Drop images here or click to browse"
          uploadButtonText="Upload Images"
          [uploadHandler]="imageUploadHandler"
        />
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="acceptHtml" [ts]="acceptTs" />
  </section>

  <section>
    <h2 id="sortable-editable" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Sortable &amp; Editable</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">Enable drag-to-reorder and inline rename on double-click.</p>
    <mat-card>
      <mat-card-content class="rui-pt-4">
        <rui-file-upload
          [sortable]="true"
          [editable]="true"
          [dropzoneText]="'Drop files, then reorder and rename'"
          [uploadHandler]="uploadHandler"
        />
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="sortableHtml" [ts]="sortableTs" />
  </section>

  <section>
    <h2 id="template-driven" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Template-driven Form</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">Using ngModel with the file upload. The model value is the array of RuiFileItem.</p>
    <mat-card>
      <mat-card-content class="rui-pt-4">
        <rui-file-upload
          ngModel
          name="fileUploadModel"
          #fileUploadModelRef="ngModel"
          [uploadHandler]="uploadHandler"
        />
        @if (fileUploadModelRef.value?.length) {
          <p class="rui-text-sm rui-text-on-surface-variant rui-mt-2">{{ fileUploadModelRef.value.length }} file(s) selected</p>
        }
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="templateHtml" [ts]="templateTs" />
  </section>

  <section>
    <h2 id="reactive-forms" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Reactive Forms Integration</h2>
    <mat-card>
      <mat-card-content class="rui-pt-4 rui-flex rui-flex-col rui-gap-3">
        <rui-file-upload
          [formControl]="fileControl"
          [uploadHandler]="uploadHandler"
        />
        <p class="rui-text-sm rui-text-on-surface-variant">
          Files in control: {{ fileControl.value?.length ?? 0 }}
        </p>
        <button mat-flat-button (click)="toggleControl()" class="rui-self-start">
          {{ fileControl.disabled ? 'Enable' : 'Disable' }} form control
        </button>
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="formsHtml" [ts]="formsTs" />
  </section>

  <section>
    <h2 id="signal-form" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Signal Form</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">Using model() signal directly — no FormsModule or ReactiveFormsModule needed.</p>
    <mat-card>
      <mat-card-content class="rui-pt-4">
        <rui-file-upload
          [(files)]="signalFiles"
          [uploadHandler]="uploadHandler"
        />
        @if (signalFiles().length > 0) {
          <p class="rui-text-sm rui-text-on-surface-variant rui-mt-2">{{ signalFiles().length }} file(s) selected</p>
        }
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="signalHtml" [ts]="signalTs" />
  </section>
</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadDemo {
  multipleFiles = signal(true);
  maxFileSize = signal(5 * 1024 * 1024);
  autoUploadEnabled = signal(false);
  uploadedFiles = signal<RuiFileItem[]>([]);

  fileControl = new FormControl<RuiFileItem[]>([]);

  protected signalFiles = signal<RuiFileItem[]>([]);

  protected templateHtml = `<rui-file-upload
  ngModel
  name="fileUploadModel"
  [uploadHandler]="handler"
/>`;

  protected templateTs = `import { FormsModule } from '@angular/forms';
import { RuiFileUpload } from '@all-the.rest/mat-extended/file-upload';
import type { RuiUploadHandler } from '@all-the.rest/mat-extended/file-upload';

@Component({
  imports: [FormsModule, RuiFileUpload],
})
export class MyComponent {
  uploadHandler: RuiUploadHandler = async (file) => {
    file.progress = 100;
  };
}`;

  protected signalHtml = `<rui-file-upload
  [(files)]="myFiles"
  [uploadHandler]="handler"
/>`;

  protected signalTs = `import { signal } from '@angular/core';
import { RuiFileUpload } from '@all-the.rest/mat-extended/file-upload';
import type { RuiFileItem, RuiUploadHandler } from '@all-the.rest/mat-extended/file-upload';

@Component({
  imports: [RuiFileUpload],
})
export class MyComponent {
  myFiles = signal<RuiFileItem[]>([]);
  uploadHandler: RuiUploadHandler = async (file) => {
    file.progress = 100;
  };
}`;

  uploadHandler: RuiUploadHandler = async (file: RuiFileItem) => {
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(r => setTimeout(r, 100));
      file.progress = i;
    }
  };

  imageUploadHandler: RuiUploadHandler = async (file: RuiFileItem) => {
    file.progress = 50;
    await new Promise(r => setTimeout(r, 500));
    file.progress = 100;
  };

  // --- Code snippets ---

  protected basicHtml = `<rui-file-upload
  [multiple]="true"
  [maxSize]="maxFileSize"
  [uploadHandler]="uploadHandler"
/>`;

  protected basicTs = `import { RuiFileUpload } from '@all-the.rest/mat-extended/file-upload';
import type { RuiUploadHandler } from '@all-the.rest/mat-extended/file-upload';

@Component({
  imports: [RuiFileUpload],
})
export class MyComponent {
  uploadHandler: RuiUploadHandler = async (file) => {
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(r => setTimeout(r, 100));
      file.progress = i;
    }
  };
}`;

  protected acceptHtml = `<rui-file-upload
  accept="image/*"
  [maxFiles]="5"
  dropzoneText="Drop images here or click to browse"
  uploadButtonText="Upload Images"
  [uploadHandler]="handler"
/>`;

  protected acceptTs = `import { RuiFileUpload } from '@all-the.rest/mat-extended/file-upload';
import type { RuiUploadHandler } from '@all-the.rest/mat-extended/file-upload';

@Component({
  imports: [RuiFileUpload],
})
export class MyComponent {
  uploadHandler: RuiUploadHandler = async (file) => {
    file.progress = 100;
  };
}`;

  protected formsHtml = `<rui-file-upload
  [formControl]="fileControl"
  [uploadHandler]="uploadHandler"
/>`;

  protected formsTs = `import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RuiFileUpload } from '@all-the.rest/mat-extended/file-upload';
import type { RuiFileItem, RuiUploadHandler } from '@all-the.rest/mat-extended/file-upload';

@Component({
  imports: [ReactiveFormsModule, RuiFileUpload],
})
export class MyComponent {
  fileControl = new FormControl<RuiFileItem[]>([]);

  uploadHandler: RuiUploadHandler = async (file) => {
    file.progress = 100;
  };
}`;

  protected sortableHtml = `<rui-file-upload
  [sortable]="true"
  [editable]="true"
  [uploadHandler]="handler"
/>`;

  protected sortableTs = `import { RuiFileUpload } from '@all-the.rest/mat-extended/file-upload';
import type { RuiUploadHandler } from '@all-the.rest/mat-extended/file-upload';

@Component({
  imports: [RuiFileUpload],
})
export class MyComponent {
  uploadHandler: RuiUploadHandler = async (file) => {
    file.progress = 100;
  };
}`;

  onUploadStart(files: RuiFileItem[]): void {
    this.uploadedFiles.update(current => [...current, ...files]);
  }

  onMaxSizeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.maxFileSize.set(Number(input.value));
  }

  toggleControl(): void {
    if (this.fileControl.disabled) {
      this.fileControl.enable();
    } else {
      this.fileControl.disable();
    }
  }
}
