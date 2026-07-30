import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

import { RuiCropper, RuiCropperGridOverlay } from '@all-the.rest/mat-extended/cropper';
import { RuiCropperResult, RuiOutputFormat, RuiAspectRatioPreset } from '@all-the.rest/mat-extended/cropper';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { ShowcaseCode } from '../../shared/showcase-code';

const VALID_IMAGE = 'https://picsum.photos/800/600';
const INVALID_IMAGE = 'https://invalid.example/nonexistent.jpg';

@Component({
  selector: 'rui-cropper-demo',
  standalone: true,
  imports: [
    FormsModule, ReactiveFormsModule,
    RuiCropper, RuiCropperGridOverlay, MatCardModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatSliderModule, MatSlideToggleModule, MatButtonModule, ShowcaseCode,
  ],
  template: `
<div class="rui-max-w-4xl rui-mx-auto rui-p-4 rui-md:p-6 rui-space-y-8">
  <h1 class="rui-font-bold rui-text-on-surface">Image Cropper</h1>
  <p class="rui-text-sm rui-text-on-surface-variant">
    Crop, zoom, and rotate images. Supports Reactive Forms and Signal API.
  </p>

  <!-- Basic Cropper -->
  <section>
    <h2 id="basic-cropper" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Basic Cropper (16:9)</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">Default 16:9 aspect ratio. Drag to crop, zoom with +/-, rotate with the slider.</p>
    <mat-card>
      <mat-card-content class="rui-pt-4">
        <div style="max-width:800px;">
          <rui-cropper
            [src]="basicSrc"
            [rotationMin]="-10"
            [rotationMax]="10"
            [(croppedImage)]="basicOutput"
            (cropChange)="onBasicCrop($event)"
            (loadError)="basicError.set($event)"
          >
            <rui-cropper-grid-overlay />
          </rui-cropper>
        </div>
          <div class="rui-mt-4">
            <p class="rui-text-sm rui-font-medium rui-mb-1 rui-text-on-surface">Cropped Result</p>
            <img [src]="basicOutput()" class="rui-max-w-sm rui-rounded rui-border rui-border-outline-variant" alt="Cropped preview" />
            <p class="rui-text-xs rui-text-on-surface-variant rui-mt-1">{{ basicDimensions().width }} × {{ basicDimensions().height }} px</p>
          </div>
        @if (basicError()) {
          <p class="rui-text-error rui-text-sm rui-mt-2">{{ basicError() }}</p>
        }
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="basicHtml" [ts]="basicTs" />
  </section>

  <!-- Square Fixed Aspect -->
  <section>
    <h2 id="square-fixed" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Square 1:1 (Fixed Aspect)</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">Fixed 1:1 aspect ratio in a 320px square container. No aspect dropdown shown.</p>
    <mat-card>
      <mat-card-content class="rui-pt-4">
        <div class="rui-w-80 rui-h-80">
          <rui-cropper
            [src]="basicSrc"
            [aspectRatio]="'1:1'"
            [rotationMin]="-10"
            [rotationMax]="10"
            [(croppedImage)]="squareOutput"
            (cropChange)="onSquareCrop($event)"
          />
        </div>
        @if (squareResult()) {
          <p class="rui-text-xs rui-text-on-surface-variant rui-mt-2">{{ squareResult()!.width }} × {{ squareResult()!.height }} px</p>
        }
        @if (squareOutput()) {
          <img [src]="squareOutput()" class="rui-max-w-xs rui-mt-2 rui-rounded rui-border rui-border-outline-variant" alt="Square crop output" />
        }
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="squareHtml" ts="Check the basic example for the TypeScript setup." />
  </section>

  <!-- Free Aspect -->
  <section>
    <h2 id="free-aspect" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Free Aspect Ratio</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">Container has 4:3 aspect ratio. Aspect ratio selector is visible.</p>
    <mat-card>
      <mat-card-content class="rui-pt-4">
        <div style="max-width:640px;">
          <div class="rui-max-w-2xl" style="aspect-ratio:4/3;">
            <rui-cropper
              [src]="basicSrc"
              [aspectRatio]="'free'"
              [rotationMin]="-10"
              [rotationMax]="10"
              [(croppedImage)]="freeOutput"
              (cropChange)="onFreeCrop($event)"
            >
              <rui-cropper-grid-overlay />
            </rui-cropper>
          </div>
        </div>
        @if (freeResult()) {
          <p class="rui-text-xs rui-text-on-surface-variant rui-mt-2">{{ freeResult()!.width }} × {{ freeResult()!.height }} px</p>
        }
        @if (freeOutput()) {
          <img [src]="freeOutput()" class="rui-max-w-xs rui-mt-2 rui-rounded rui-border rui-border-outline-variant" alt="Free crop output" />
        }
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="freeHtml" ts="Check the basic example for the TypeScript setup." />
  </section>

  <!-- Fixed Width -->
  <section>
    <h2 id="fixed-width" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Fixed Width with Sidebar</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">Set a fixed width like <code>[width]="600"</code> so the cropper size stays constant regardless of sibling layout changes.</p>
    <mat-card>
      <mat-card-content class="rui-pt-4">
        <rui-cropper
          [src]="basicSrc"
          [width]="600"
          [aspectRatio]="'16:9'"
          [rotationMin]="-10"
          [rotationMax]="10"
          [(croppedImage)]="fixedOutput"
          (cropChange)="onFixedCrop($event)"
        />
        @if (fixedOutput()) {
          <div class="rui-mt-4">
            <p class="rui-text-sm rui-font-medium rui-mb-1 rui-text-on-surface">Cropped Result</p>
            <img [src]="fixedOutput()" class="rui-max-w-sm rui-rounded rui-border rui-border-outline-variant" alt="Fixed width crop output" />
          </div>
        }
        @if (fixedResult()) {
          <p class="rui-text-xs rui-text-on-surface-variant rui-mt-1">{{ fixedResult()!.width }} × {{ fixedResult()!.height }} px</p>
        }
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="fixedWidthHtml" ts="Check the basic example for the TypeScript setup." />
  </section>

  <!-- Error State -->
  <section>
    <h2 id="error-state" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Error Handling</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">When the image fails to load, a <code>loadError</code> event is emitted.</p>
    <mat-card>
      <mat-card-content class="rui-pt-4 rui-space-y-3">
        <rui-cropper
          [src]="errorSrc()"
          (loadError)="errorMsg.set($event)"
          [rotationMin]="-10"
          [rotationMax]="10"
        />
        <div class="rui-flex rui-gap-2">
          <button mat-stroked-button (click)="errorSrc.set(INVALID_IMAGE)">Invalid Image</button>
          <button mat-stroked-button color="primary" (click)="errorSrc.set(VALID_IMAGE)">Restore Valid</button>
        </div>
        @if (errorMsg()) {
          <p class="rui-text-error rui-text-sm">{{ errorMsg() }}</p>
        }
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="errorHtml" ts="Check the basic example for the TypeScript setup." />
  </section>

  <!-- Dynamic Configuration -->
  <section>
    <h2 id="dynamic-config" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Dynamic Configuration</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">Change aspect ratio, format, quality, and output size on the fly.</p>
    <mat-card>
      <mat-card-content class="rui-pt-4 rui-space-y-3">
        <rui-cropper
          [src]="basicSrc"
          [aspectRatio]="dynAspect()"
          [outputFormat]="dynFormat()"
          [outputQuality]="dynQuality()"
          [outputWidth]="dynWidth()"
          [outputHeight]="dynHeight()"
          [rotationMin]="-10"
          [rotationMax]="10"
          [(croppedImage)]="dynOutput"
          (cropChange)="onDynCrop($event)"
        >
          <rui-cropper-grid-overlay />
        </rui-cropper>

        <div class="rui-grid rui-grid-cols-2 rui-md:grid-cols-4 rui-gap-3">
          <mat-form-field>
            <mat-label>Aspect</mat-label>
            <mat-select [value]="dynAspect()" (valueChange)="dynAspect.set($event)">
              <mat-option value="free">Free</mat-option>
              <mat-option value="1:1">1:1</mat-option>
              <mat-option value="4:3">4:3</mat-option>
              <mat-option value="16:9">16:9</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field>
            <mat-label>Format</mat-label>
            <mat-select [value]="dynFormat()" (valueChange)="dynFormat.set($event)">
              <mat-option value="image/png">PNG</mat-option>
              <mat-option value="image/jpeg">JPEG</mat-option>
              <mat-option value="image/webp">WebP</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field>
            <mat-label>Quality</mat-label>
            <mat-select [value]="dynQuality()" (valueChange)="dynQuality.set($event)">
              <mat-option [value]="0.1">0.1</mat-option>
              <mat-option [value]="0.5">0.5</mat-option>
              <mat-option [value]="0.75">0.75</mat-option>
              <mat-option [value]="0.92">0.92</mat-option>
              <mat-option [value]="1">1</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field>
            <mat-label>Width</mat-label>
            <input matInput type="number" min="0" max="2048" [ngModel]="dynWidth()" (ngModelChange)="dynWidth.set($event)" />
          </mat-form-field>

          <mat-form-field>
            <mat-label>Height</mat-label>
            <input matInput type="number" min="0" max="2048" [ngModel]="dynHeight()" (ngModelChange)="dynHeight.set($event)" />
          </mat-form-field>
        </div>

        @if (dynOutput()) {
          <div>
            <p class="rui-text-sm rui-font-medium rui-mb-1 rui-text-on-surface">Output</p>
            <img [src]="dynOutput()" class="rui-max-w-xs rui-rounded rui-border rui-border-outline-variant" alt="Dynamic cropper output" />
            <p class="rui-text-xs rui-text-on-surface-variant rui-mt-1">{{ dynDimensions().width }} × {{ dynDimensions().height }} px</p>
          </div>
        }
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="dynHtml" ts="Check the basic example for the TypeScript setup." />
  </section>

  <!-- Toolbar Positions -->
  <section>
    <h2 id="toolbar-positions" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Toolbar Positions</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">The toolbar can be placed at top, bottom (default), left, or right.</p>
    <mat-card>
      <mat-card-content class="rui-pt-4 rui-grid rui-grid-cols-1 rui-md:grid-cols-2 rui-gap-4">
        <div class="rui-space-y-1">
          <p class="rui-text-xs rui-font-medium">Bottom (default)</p>
          <rui-cropper [src]="basicSrc" toolbarPosition="bottom" [(croppedImage)]="toolbarOutput" (cropChange)="onToolbarCrop($event)" [rotationMin]="-10" [rotationMax]="10" />
        </div>
        <div class="rui-space-y-1">
          <p class="rui-text-xs rui-font-medium">Top</p>
          <rui-cropper [src]="basicSrc" toolbarPosition="top" [rotationMin]="-10" [rotationMax]="10" />
        </div>
        <div class="rui-space-y-1">
          <p class="rui-text-xs rui-font-medium">Left</p>
          <rui-cropper [src]="basicSrc" toolbarPosition="left" [rotationMin]="-10" [rotationMax]="10" />
        </div>
        <div class="rui-space-y-1">
          <p class="rui-text-xs rui-font-medium">Right</p>
          <rui-cropper [src]="basicSrc" toolbarPosition="right" [rotationMin]="-10" [rotationMax]="10" />
        </div>
        @if (toolbarOutput()) {
          <div class="rui-mt-4 rui-col-span-2">
            <p class="rui-text-sm rui-font-medium rui-mb-1 rui-text-on-surface">Cropped Result</p>
            <img [src]="toolbarOutput()" class="rui-max-w-sm rui-rounded rui-border rui-border-outline-variant" alt="Toolbar crop output" />
            <p class="rui-text-xs rui-text-on-surface-variant rui-mt-1">{{ toolbarDimensions().width }} × {{ toolbarDimensions().height }} px</p>
          </div>
        }
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="positionHtml" ts="Check the basic example for the TypeScript setup." />
  </section>

  <!-- Constrain to Image -->
  <section>
    <h2 id="constrain-to-image" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Constrain to Image</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">
      When <code>constrainToImage</code> is <code>true</code> (default), the crop selection cannot leave the original image area — even when zooming out or rotating.
    </p>
    <mat-card>
      <mat-card-content class="rui-pt-4 rui-space-y-3">
        <mat-slide-toggle [checked]="constrainEnabled()" (change)="constrainEnabled.set($event.checked)">
          constrainToImage: <strong>{{ constrainEnabled() }}</strong>
        </mat-slide-toggle>
        <div style="max-width:800px;">
          <rui-cropper
            [src]="basicSrc"
            [constrainToImage]="constrainEnabled()"
            [aspectRatio]="'free'"
            [rotationMin]="-180"
            [rotationMax]="180"
            [(croppedImage)]="constrainOutput"
            (cropChange)="onConstrainCrop($event)"
          />
        </div>
        @if (constrainOutput()) {
          <div>
            <p class="rui-text-sm rui-font-medium rui-mb-1 rui-text-on-surface">Cropped Result</p>
            <img [src]="constrainOutput()" class="rui-max-w-sm rui-rounded rui-border rui-border-outline-variant" alt="Constrain crop output" />
          </div>
        }
        @if (constrainResult()) {
          <p class="rui-text-xs rui-text-on-surface-variant">{{ constrainResult()!.width }} x {{ constrainResult()!.height }} px</p>
        }
        <p class="rui-text-xs rui-text-on-surface-variant">
          Try zooming out (<kbd>-</kbd>) or rotating (<kbd>r</kbd>).
          @if (constrainEnabled()) { The crop stays inside the image. }
          @else { The crop can extend into the dark letterbox area. }
        </p>
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="constrainHtml" [ts]="constrainTs" />
  </section>

  <!-- Template-driven Form -->
  <section>
    <h2 id="template-driven" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Template-driven Form</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">Using ngModel with the cropper. The model value is the cropped image data URL.</p>
    <mat-card>
      <mat-card-content class="rui-pt-4">
        <div style="max-width:800px;">
          <rui-cropper
            [src]="basicSrc"
            ngModel
            name="cropperModel"
            #cropperModelRef="ngModel"
            [rotationMin]="-10"
            [rotationMax]="10"
            (cropChange)="onTemplateCrop($event)"
          />
        </div>
        @if (cropperModelRef.value) {
          <div class="rui-mt-4">
            <p class="rui-text-sm rui-font-medium rui-mb-1 rui-text-on-surface">Cropped Result</p>
            <img [src]="cropperModelRef.value" class="rui-max-w-sm rui-rounded rui-border rui-border-outline-variant" alt="Template-driven crop output" />
          </div>
        }
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-2">Model value: {{ cropperModelRef.value?.length ? (cropperModelRef.value?.length + ' chars') : 'none' }}</p>
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="templateHtml" [ts]="templateTs" />
  </section>

  <!-- Reactive Form -->
  <section>
    <h2 id="reactive-form" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Reactive Form</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">Using formControl with the cropper. The control value is the cropped image data URL.</p>
    <mat-card>
      <mat-card-content class="rui-pt-4">
        <div style="max-width:800px;">
          <rui-cropper
            [src]="basicSrc"
            [formControl]="cropControl"
            [rotationMin]="-10"
            [rotationMax]="10"
            (cropChange)="onReactiveCrop($event)"
          />
        </div>
        @if (cropControl.value) {
          <div class="rui-mt-4">
            <p class="rui-text-sm rui-font-medium rui-mb-1 rui-text-on-surface">Cropped Result</p>
            <img [src]="cropControl.value" class="rui-max-w-sm rui-rounded rui-border rui-border-outline-variant" alt="Reactive form crop output" />
          </div>
        }
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-2">Control value: {{ cropControl.value?.length ? (cropControl.value.length + ' chars') : 'none' }}</p>
        <p class="rui-text-sm">Control enabled: {{ cropControl.enabled }}</p>
        <button mat-stroked-button (click)="toggleCropControl()" class="rui-mt-2">
          {{ cropControl.disabled ? 'Enable' : 'Disable' }}
        </button>
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="reactiveHtml" [ts]="reactiveTs" />
  </section>

  <!-- Signal Form -->
  <section>
    <h2 id="signal-form" style="font-size:1.25rem;font-weight:600;margin-bottom:0.25rem;">Signal Form</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">Using model() signal directly — no FormsModule or ReactiveFormsModule needed.</p>
    <mat-card>
      <mat-card-content class="rui-pt-4">
        <div style="max-width:800px;">
          <rui-cropper
            [src]="basicSrc"
            [(croppedImage)]="signalCropped"
            [rotationMin]="-10"
            [rotationMax]="10"
            (cropChange)="onSignalCrop($event)"
          />
        </div>
        @if (signalCropped()) {
          <div class="rui-mt-4">
            <p class="rui-text-sm rui-font-medium rui-mb-1 rui-text-on-surface">Cropped Result</p>
            <img [src]="signalCropped()" class="rui-max-w-sm rui-rounded rui-border rui-border-outline-variant" alt="Signal form crop output" />
          </div>
        }
        <p class="rui-text-sm rui-text-on-surface-variant rui-mt-2">Signal value: {{ signalCropped().length ? (signalCropped().length + ' chars') : 'none' }}</p>
      </mat-card-content>
    </mat-card>
    <rui-showcase-code [html]="signalHtml" [ts]="signalTs" />
  </section>

</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CropperDemo {
  protected readonly VALID_IMAGE = VALID_IMAGE;
  protected readonly INVALID_IMAGE = INVALID_IMAGE;

  readonly basicSrc = VALID_IMAGE;
  readonly basicOutput = signal('');
  readonly basicDimensions = signal({ width: 0, height: 0 });
  readonly basicError = signal('');

  readonly squareResult = signal<RuiCropperResult | null>(null);
  readonly squareOutput = signal<string>('');
  readonly freeResult = signal<RuiCropperResult | null>(null);
  readonly freeOutput = signal<string>('');

  readonly errorSrc = signal(VALID_IMAGE);
  readonly errorMsg = signal('');

  readonly dynAspect = signal<RuiAspectRatioPreset>('16:9');
  readonly dynFormat = signal<RuiOutputFormat>('image/png');
  readonly dynQuality = signal(0.92);
  readonly dynWidth = signal(0);
  readonly dynHeight = signal(0);
  readonly dynOutput = signal('');
  readonly dynDimensions = signal({ width: 0, height: 0 });

  readonly basicHtml = `<rui-cropper
  [src]="'https://picsum.photos/800/600'"
  [rotationMin]="-10"
  [rotationMax]="10"
  [(croppedImage)]="cropped"
/>`;

  readonly basicTs = `import { RuiCropper, RuiCropperResult } from '@all-the.rest/mat-extended/cropper';
import { signal } from '@angular/core';

@Component({ imports: [RuiCropper], /* ... */ })
export class MyComponent {
  cropped = signal('');

  onCrop(result: RuiCropperResult) {
    console.log(result.width, result.height);
  }
}`;

  readonly squareHtml = `<div style="width:20rem;height:20rem;">
  <rui-cropper
    [src]="'...'"
    [aspectRatio]="'1:1'"
  />
</div>`;

  readonly freeHtml = `<div style="aspect-ratio:4/3;max-width:42rem;">
  <rui-cropper
    [src]="'...'"
    [aspectRatio]="'free'"
  />
</div>`;

  readonly errorHtml = `<rui-cropper
  [src]="errorSrc()"
  (loadError)="errorMsg.set($event)"
/>`;

  readonly dynHtml = `<rui-cropper
  [src]="'...'"
  [aspectRatio]="dynAspect()"
  [outputFormat]="dynFormat()"
  [outputQuality]="dynQuality()"
  [outputWidth]="dynWidth()"
  [outputHeight]="dynHeight()"
  [(croppedImage)]="cropped"
/>`;

  readonly positionHtml = `<rui-cropper [src]="'https://picsum.photos/800/600'" toolbarPosition="top" />

<rui-cropper [src]="'https://picsum.photos/800/600'" toolbarPosition="bottom" />

<rui-cropper [src]="'https://picsum.photos/800/600'" toolbarPosition="left" />

<rui-cropper [src]="'https://picsum.photos/800/600'" toolbarPosition="right" />`;

  readonly cropControl = new FormControl<string>('');
  readonly signalCropped = signal('');
  readonly templateOutput = signal('');
  readonly reactiveOutput = signal('');

  readonly templateHtml = `<rui-cropper
  [src]="'https://picsum.photos/800/600'"
  ngModel
  name="cropperModel"
  #cropperModelRef="ngModel"
  [rotationMin]="-10"
  [rotationMax]="10"
/>`;

  readonly templateTs = `import { FormsModule } from '@angular/forms';
import { RuiCropper } from '@all-the.rest/mat-extended/cropper';

@Component({
  imports: [FormsModule, RuiCropper],
})
export class MyComponent {
  // ngModel value is automatically synced with the cropped image
}`;

  readonly reactiveHtml = `<rui-cropper
  [src]="'https://picsum.photos/800/600'"
  [formControl]="cropControl"
  [rotationMin]="-10"
  [rotationMax]="10"
/>`;

  readonly reactiveTs = `import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { RuiCropper } from '@all-the.rest/mat-extended/cropper';

@Component({
  imports: [ReactiveFormsModule, RuiCropper],
})
export class MyComponent {
  cropControl = new FormControl<string>('');
}`;

  readonly signalHtml = `<rui-cropper
  [src]="'https://picsum.photos/800/600'"
  [(croppedImage)]="cropped"
  [rotationMin]="-10"
  [rotationMax]="10"
/>`;

  readonly signalTs = `import { signal } from '@angular/core';
import { RuiCropper } from '@all-the.rest/mat-extended/cropper';

@Component({
  imports: [RuiCropper],
})
export class MyComponent {
  cropped = signal('');
}`;

  onTemplateCrop(result: RuiCropperResult): void {
    void result;
  }

  toggleCropControl(): void {
    if (this.cropControl.disabled) {
      this.cropControl.enable();
    } else {
      this.cropControl.disable();
    }
  }

  onReactiveCrop(result: RuiCropperResult): void {
    void result;
  }

  onSignalCrop(result: RuiCropperResult): void {
    void result;
  }

  onBasicCrop(result: RuiCropperResult): void {
    this.basicDimensions.set({ width: result.width, height: result.height });
  }

  onSquareCrop(result: RuiCropperResult): void {
    this.squareResult.set(result);
  }

  onFreeCrop(result: RuiCropperResult): void {
    this.freeResult.set(result);
  }

  onDynCrop(result: RuiCropperResult): void {
    this.dynDimensions.set({ width: result.width, height: result.height });
  }

  readonly fixedOutput = signal('');
  readonly fixedResult = signal<RuiCropperResult | null>(null);
  readonly toolbarOutput = signal('');
  readonly toolbarDimensions = signal({ width: 0, height: 0 });

  readonly fixedWidthHtml = `<rui-cropper
  [src]="'...'"
  [width]="600"
  [aspectRatio]="'16:9'"
/>`;

  onFixedCrop(result: RuiCropperResult): void {
    this.fixedResult.set(result);
  }

  onToolbarCrop(result: RuiCropperResult): void {
    this.toolbarDimensions.set({ width: result.width, height: result.height });
  }

  readonly constrainOutput = signal('');
  readonly constrainEnabled = signal(true);
  readonly constrainResult = signal<RuiCropperResult | null>(null);

  readonly constrainHtml = `<mat-slide-toggle [checked]="constrainEnabled()" (change)="constrainEnabled.set($event.checked)">
  constrainToImage: {{ constrainEnabled() }}
</mat-slide-toggle>

<rui-cropper
  [src]="'...'"
  [constrainToImage]="constrainEnabled()"
  [aspectRatio]="'free'"
  [rotationMin]="-180"
  [rotationMax]="180"
/>`;

  readonly constrainTs = `import { signal } from '@angular/core';
import { RuiCropper } from '@all-the.rest/mat-extended/cropper';

export class MyComponent {
  constrainEnabled = signal(true);
}`;

  onConstrainCrop(result: RuiCropperResult): void {
    this.constrainResult.set(result);
  }

}
