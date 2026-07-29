import {
  Component,
  input,
  model,
  output,
  signal,
  computed,
  booleanAttribute,
  ChangeDetectionStrategy,
  DestroyRef,
  inject,
  afterNextRender,
  viewChild,
  ElementRef,
  forwardRef,
  effect,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { RuiValueAccessor } from '@all-the.rest/mat-extended';
import { RuiFileItem, RuiUploadStatus, RuiUploadHandler, RuiValidationError } from './file-upload.types';
import { RUI_FILE_UPLOAD_DEFAULT_OPTIONS } from './file-upload.config';
import { RuiFileUploadDropzone } from './file-upload-dropzone.component';
import { RuiFileUploadItem } from './file-upload-item.component';
import { RuiFileUploadProgress } from './file-upload-progress.component';
import { formatSize } from './file-upload-utils';

@Component({
  selector: 'rui-file-upload',
  standalone: true,
  imports: [FormsModule, DragDropModule, RuiFileUploadDropzone, RuiFileUploadItem, RuiFileUploadProgress],
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(dragenter)': 'onDragEnter($event)',
    '(dragover)': 'onDragOver($event)',
    '(dragleave)': 'onDragLeave($event)',
    '(drop)': 'onDrop($event)',
    '(keydown.enter)': 'openFilePicker()',
    '(keydown.space)': 'openFilePicker()',
    'tabindex': '0',
    'role': 'region',
    'aria-label': 'File upload drop zone',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RuiFileUpload),
      multi: true,
    },
    {
      provide: MatFormFieldControl,
      useExisting: forwardRef(() => RuiFileUpload),
    },
  ],
})
export class RuiFileUpload extends RuiValueAccessor<RuiFileItem[]> {
  readonly multiple = input<boolean>(true);
  readonly accept = input<string>('*/*');
  readonly maxSize = input<number>(Infinity);
  readonly maxFiles = input<number>(10);
  readonly uploadHandler = input<RuiUploadHandler | undefined>(undefined);
  readonly autoUpload = input<boolean, boolean>(false, { transform: booleanAttribute });
  readonly initialFiles = input<RuiFileItem[]>([]);
  readonly sortable = input<boolean, boolean>(false, { transform: booleanAttribute });
  readonly dragStartDelay = input<number>(100);
  readonly editable = input<boolean, boolean>(false, { transform: booleanAttribute });
  readonly editableExtension = input<boolean, boolean>(true, { transform: booleanAttribute });
  readonly fileManagement = input<boolean, boolean>(true, { transform: booleanAttribute });

  readonly dropzoneText = input('Drag & drop files here or click to browse');
  readonly browseText = input('Select files to upload');
  readonly dragOverText = input('Drop files here');
  readonly uploadButtonText = input('Upload starten');

  readonly files = model<RuiFileItem[]>([]);
  readonly uploadStart = output<RuiFileItem[]>();
  readonly validationErrors = output<RuiValidationError[]>();

  readonly status = signal<RuiUploadStatus>('idle');
  readonly isDragOver = signal(false);
  readonly displayErrors = signal<RuiValidationError[]>([]);
  readonly editingItemId = signal<string | null>(null);
  readonly editInputValue = signal('');
  readonly totalProgress = computed(() => {
    const fileList = this.files();
    if (fileList.length === 0) return 0;
    const total = fileList.reduce((sum, f) => sum + f.progress, 0);
    return Math.round(total / fileList.length);
  });
  readonly hasFiles = computed(() => this.files().length > 0);
  readonly isUploading = computed(() => this.status() === 'uploading');

  private readonly defaults = inject(RUI_FILE_UPLOAD_DEFAULT_OPTIONS, { optional: true });
  private readonly destroyRef = inject(DestroyRef);
  private abortControllers = new Map<string, AbortController>();
  private nextId = 0;

  readonly fileInputRef = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  constructor() {
    super();

    effect(() => {
      const f = this.files();
      this.markAsChanged(f);
    });

    afterNextRender(() => {
      const initial = this.initialFiles();
      if (initial.length > 0) {
        this.updateFiles(initial);
        this.status.set('selected');
      }
    });

    this.destroyRef.onDestroy(() => {
      for (const item of this.files()) {
        if (item.preview) URL.revokeObjectURL(item.preview);
      }
    });
  }

  openFilePicker(): void {
    this.fileInputRef()?.nativeElement.click();
  }

  onFilesSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.processFiles(Array.from(target.files));
    }
    target.value = '';
  }

  onDragEnter(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.disabled) {
      this.isDragOver.set(true);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.disabled) {
      this.isDragOver.set(true);
    }
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
    if (this.disabled) return;
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.processFiles(Array.from(event.dataTransfer.files));
    }
  }

  processFiles(fileList: FileList | File[]): void {
    this.displayErrors.set([]);
    const currentFiles = this.files();
    const maxFiles = this.maxFiles();
    const maxSize = this.maxSize();
    const remaining = maxFiles - currentFiles.length;
    const validationErrors: RuiValidationError[] = [];

    if (remaining <= 0) {
      validationErrors.push({ type: 'count', message: `Maximum ${maxFiles} files allowed` });
      this.validationErrors.emit(validationErrors);
      this.displayErrors.set(validationErrors);
      return;
    }

    const newItems: RuiFileItem[] = [];
    const filesToProcess = Math.min(fileList.length, remaining);

    for (let i = 0; i < filesToProcess; i++) {
      const file = fileList[i];
      if (!file) continue;

      if (file.size > maxSize) {
        validationErrors.push({
          type: 'size',
          message: `File "${file.name}" exceeds the maximum size of ${formatSize(maxSize)}`,
          file,
        });
        continue;
      }
      if (!this.isFileAccepted(file)) {
        validationErrors.push({
          type: 'type',
          message: `File type "${file.type || 'unknown'}" for "${file.name}" is not accepted`,
          file,
        });
        continue;
      }

      let preview: string | undefined;
      if (file.type.startsWith('image/')) {
        preview = URL.createObjectURL(file);
      }

      newItems.push({
        id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`,
        file,
        preview,
        status: 'selected',
        progress: 0,
        editName: file.name,
      });
    }

    if (validationErrors.length > 0) {
      this.validationErrors.emit(validationErrors);
      this.displayErrors.set(validationErrors);
    } else {
      this.displayErrors.set([]);
    }

    if (newItems.length > 0) {
      this.status.set('selected');
      this.updateFiles([...currentFiles, ...newItems]);

      if (this.autoUpload()) {
        this.startUpload();
      }
    }
  }

  private isFileAccepted(file: File): boolean {
    const accept = this.accept();
    if (!accept || accept === '*/*') return true;

    const acceptedTypes = accept.split(',').map(t => t.trim());
    return acceptedTypes.some(type => {
      if (type.startsWith('.')) {
        return file.name.toLowerCase().endsWith(type.toLowerCase());
      }
      if (type.endsWith('/*')) {
        const category = type.slice(0, -1);
        return file.type.startsWith(category);
      }
      return file.type === type;
    });
  }

  removeFile(id: string): void {
    const currentFiles = this.files();
    const item = currentFiles.find(f => f.id === id);
    if (item?.preview) URL.revokeObjectURL(item.preview);

    const updated = currentFiles.filter(f => f.id !== id);
    this.updateFiles(updated);

    if (updated.length === 0) {
      this.status.set('idle');
    }
  }

  async startUpload(): Promise<void> {
    const handler = this.uploadHandler();
    const currentFiles = this.files();

    if (currentFiles.length === 0) return;

    if (handler) {
      this.status.set('uploading');
    }
    this.uploadStart.emit(currentFiles);

    let hasError = false;

    if (handler) {
      for (const item of currentFiles) {
        const controller = new AbortController();
        this.abortControllers.set(item.id, controller);

        this.files.update(files =>
          files.map(f => f.id === item.id ? { ...f, status: 'uploading' as const } : f),
        );

        try {
          await handler(item, controller.signal);
          if (!controller.signal.aborted) {
            this.files.update(files =>
              files.map(f => f.id === item.id ? { ...f, status: 'done' as const, progress: 100 } : f),
            );
          }
        } catch (e: unknown) {
          if (!controller.signal.aborted) {
            hasError = true;
            this.files.update(files =>
              files.map(f =>
                f.id === item.id
                  ? { ...f, status: 'error' as const, error: e instanceof Error ? e.message : 'Upload failed' }
                  : f,
              ),
            );
          }
        } finally {
          this.abortControllers.delete(item.id);
        }
      }
    }

    this.status.set(hasError ? 'error' : 'idle');
  }

  cancelUpload(id: string): void {
    const controller = this.abortControllers.get(id);
    if (controller) {
      controller.abort();
      this.abortControllers.delete(id);
    }
    this.files.update(files =>
      files.map(f =>
        f.id === id
          ? { ...f, status: 'selected' as const, progress: 0 }
          : f,
      ),
    );
  }

  onDropListDropped(event: CdkDragDrop<RuiFileItem[]>): void {
    if (event.previousIndex === event.currentIndex) return;
    const current = [...this.files()];
    moveItemInArray(current, event.previousIndex, event.currentIndex);
    this.updateFiles(current);
  }

  onItemRemove(id: string): void {
    this.removeFile(id);
  }

  onItemCancelUpload(id: string): void {
    this.cancelUpload(id);
  }

  onItemRetry(id: string, item: RuiFileItem): void {
    const handler = this.uploadHandler();
    if (!handler) return;
    this.status.set('uploading');
    const controller = new AbortController();
    this.abortControllers.set(id, controller);
    this.files.update(files =>
      files.map(f => f.id === id ? { ...f, status: 'uploading' as const, progress: 0 } : f),
    );
    handler(item, controller.signal)
      .then(() => {
        if (!controller.signal.aborted) {
          this.files.update(files =>
            files.map(f => f.id === id ? { ...f, status: 'done' as const, progress: 100 } : f),
          );
        }
      })
      .catch((e: unknown) => {
        if (!controller.signal.aborted) {
          this.files.update(files =>
            files.map(f =>
              f.id === id
                ? { ...f, status: 'error' as const, error: e instanceof Error ? e.message : 'Upload failed' }
                : f,
            ),
          );
        }
      })
      .finally(() => {
        this.abortControllers.delete(id);
        if (this.abortControllers.size === 0) {
          this.status.set('idle');
        }
      });
  }

  onItemStartRename(item: RuiFileItem): void {
    this.editingItemId.set(item.id);
    const fullName = item.editName ?? item.file.name;
    if (!this.editableExtension()) {
      const lastDot = fullName.lastIndexOf('.');
      this.editInputValue.set(lastDot > 0 ? fullName.slice(0, lastDot) : fullName);
    } else {
      this.editInputValue.set(fullName);
    }
  }

  onItemConfirmRename(item: RuiFileItem): void {
    let newName = this.editInputValue().trim();
    if (!newName) return;
    if (!this.editableExtension()) {
      const fullName = item.editName ?? item.file.name;
      const lastDot = fullName.lastIndexOf('.');
      if (lastDot > 0) {
        newName = newName + fullName.slice(lastDot);
      }
    }
    this.files.update(files =>
      files.map(f => f.id === item.id ? { ...f, editName: newName } : f),
    );
    this.editingItemId.set(null);
    this.editInputValue.set('');
  }

  onItemCancelRename(): void {
    this.editingItemId.set(null);
    this.editInputValue.set('');
  }

  onItemEditInputChange(value: string): void {
    this.editInputValue.set(value);
  }

  onItemMoveUp(index: number): void {
    if (index <= 0) return;
    const current = [...this.files()];
    const temp = current[index];
    const prev = current[index - 1];
    if (temp === undefined || prev === undefined) return;
    current[index] = prev;
    current[index - 1] = temp;
    this.updateFiles(current);
  }

  onItemMoveDown(index: number): void {
    const current = [...this.files()];
    if (index >= current.length - 1) return;
    const temp = current[index];
    const next = current[index + 1];
    if (temp === undefined || next === undefined) return;
    current[index] = next;
    current[index + 1] = temp;
    this.updateFiles(current);
  }

  override writeValue(value: RuiFileItem[] | null): void {
    super.writeValue(value);
    this.files.set(value ?? []);
  }

  private updateFiles(newFiles: RuiFileItem[]): void {
    this.files.set(newFiles);
    this.markAsChanged(newFiles);
  }
}
