import { Component, ElementRef, viewChild, input, model, output, signal, computed, effect, afterNextRender, ChangeDetectionStrategy, ChangeDetectorRef, inject, DestroyRef, NgZone, Injector, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { RuiValueAccessor, ensureBrowser } from '@all-the.rest/mat-extended';
import { RuiCropperCanvas } from './cropper-canvas';
import { RuiCropperInteraction } from './cropper-interaction';
import { RuiCropperToolbar } from './cropper-toolbar.component';
import { RuiCropperGridOverlay } from './cropper-grid-overlay.component';
import {
  RuiCropperResult,
  RuiOutputFormat,
  RuiAspectRatioPreset,
  RuiCropRect,
} from './cropper.types';
import { RUI_CROPPER_DEFAULT_OPTIONS } from './cropper.config';

@Component({
  selector: 'rui-cropper',
  standalone: true,
  imports: [FormsModule, RuiCropperToolbar, RuiCropperGridOverlay],
  templateUrl: './cropper.html',
  styleUrl: './cropper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    tabindex: '0',
    '(keydown)': 'onKeydown($event)',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RuiCropper),
      multi: true,
    },
    {
      provide: MatFormFieldControl,
      useExisting: forwardRef(() => RuiCropper),
    },
  ],
})
export class RuiCropper extends RuiValueAccessor<string> {
  readonly src = input<string>('');
  readonly aspectRatio = input<RuiAspectRatioPreset>('16:9');
  readonly overlayTemplate = input<string>('');
  readonly outputFormat = input<RuiOutputFormat>('image/png');
  readonly outputQuality = input<number>(0.92);
  readonly minCropWidth = input<number>(20);
  readonly minCropHeight = input<number>(20);
  readonly outputWidth = input<number>(0);
  readonly outputHeight = input<number>(0);
  readonly rotationMin = input<number>(-45);
  readonly rotationMax = input<number>(45);
  readonly rotationStepInput = input<number>(1);
  readonly constrainToImage = input<boolean>(true);
  readonly toolbarPosition = input<'top' | 'bottom' | 'left' | 'right'>('bottom');
  readonly width = input<string | number>('100%');

  readonly croppedImage = model<string>('');
  readonly cropChange = output<RuiCropperResult>();
  readonly loadError = output<string>();

  readonly widthStyle = computed(() => {
    const w = this.width();
    return typeof w === 'number' ? w + 'px' : String(w);
  });

  readonly imageLoaded = signal(false);
  readonly zoomLevel = signal(100);
  readonly liveRotationDragging = signal(false);
  readonly rotationAngle = signal(0);
  readonly rotationOffset = signal(0);
  readonly rotation = computed(() => {
    return ((this.rotationOffset() + this.rotationAngle()) % 360 + 360) % 360;
  });
  readonly canvasTransform = computed(() => {
    if (!this.liveRotationDragging()) return 'none';
    const delta = this.rotation() - this._bakedRotation;
    if (Math.abs(delta) < 0.001) return 'none';
    const currentScale = this._canvasEngine?.getRotationFitScale?.(this.rotation()) ?? 1;
    const scaleDelta = this._bakedFitScale > 0 ? currentScale / this._bakedFitScale : 1;
    if (Math.abs(scaleDelta - 1) < 0.001) return `rotate(${delta}deg)`;
    return `rotate(${delta}deg) scale(${scaleDelta.toFixed(4)})`;
  });

  readonly isAspectRatioFixed = computed(() => this.aspectRatio() !== 'free');
  readonly effectiveAspectRatio = signal<RuiAspectRatioPreset>('16:9');
  readonly cropRectStyle = computed(() => {
    const r = this._cropRect();
    return `left:${r.x * 100}%;top:${r.y * 100}%;width:${r.width * 100}%;height:${r.height * 100}%`;
  });

  readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  readonly viewportRef = viewChild<ElementRef<HTMLDivElement>>('viewport');

  private _interaction = new RuiCropperInteraction();
  private _canvasEngine: RuiCropperCanvas | null = null;
  private _destroyRef = inject(DestroyRef);
  private _ngZone = inject(NgZone);
  private _injector = inject(Injector);
  private _activeSrc = signal<string>('');
  private _defaults = inject(RUI_CROPPER_DEFAULT_OPTIONS);
  private _cropRect = signal<RuiCropRect>({ x: 0.25, y: 0.25, width: 0.5, height: 0.5 });
  private _canvasReady = signal(false);
  private _bakedRotation = 0;
  private _bakedFitScale = 1;
  private _panning = false;
  private _panStartPointerX = 0;
  private _panStartPointerY = 0;
  private _panStartPanX = 0;
  private _panStartPanY = 0;
  private _cdr = inject(ChangeDetectorRef);

  constructor() {
    super();

    effect(() => {
      const img = this.croppedImage();
      if (img && img !== this.value) {
        this.markAsChanged(img);
      }
    });

    effect(() => {
      this._activeSrc.set(this.src());
    });

    effect(() => {
      const src = this._activeSrc();
      if (src && this._canvasReady() && this._canvasEngine) {
        this._loadImage(src);
      }
    });

    effect(() => {
      if (!this._canvasReady() || !this._canvasEngine) return;
      const rot = this.rotation();
      const prevRot = this._canvasEngine.getRotation();
      const prevFitScale = this._canvasEngine.getRotationFitScale(prevRot);
      this._canvasEngine.setRotation(rot);
      if (!this.liveRotationDragging()) {
        const newFitScale = this._canvasEngine.getRotationFitScale(rot);
        if (prevFitScale > 0 && Math.abs(prevFitScale - newFitScale) > 0.001) {
          this.zoomLevel.update(v =>
            Math.max(10, Math.min(1000, Math.round(v * prevFitScale / newFitScale)))
          );
        } else {
          this._canvasEngine.render();
        }
        const constrained = this._constrainCropRect(this._canvasEngine.getCropRect());
        this._canvasEngine.setCropRect(constrained);
        this._cropRect.set(constrained);
        if (this.imageLoaded()) this._scheduleEmit();
      }
    });

    effect(() => {
      if (!this._canvasReady() || !this._canvasEngine) return;
      this._canvasEngine.setZoom(this.zoomLevel() / 100);
      this._canvasEngine.render();
      const constrained = this._constrainCropRect(this._canvasEngine.getCropRect());
      this._canvasEngine.setCropRect(constrained);
      this._cropRect.set(constrained);
      if (this.imageLoaded()) this._scheduleEmit();
    });

    effect(() => {
      const ratio = this._resolveAspectRatio(this.effectiveAspectRatio());
      if (this._canvasReady() && this._canvasEngine) {
        this._canvasEngine.setAspectRatio(ratio);
        this._canvasEngine.render();
        const constrained = this._constrainCropRect(this._canvasEngine.getCropRect());
        this._canvasEngine.setCropRect(constrained);
        this._cropRect.set(constrained);
      }
      if (this.imageLoaded()) this._scheduleEmit();
    });

    effect(() => {
      this.effectiveAspectRatio.set(this.aspectRatio());
    });

    afterNextRender({
      write: () => {
        this._initCanvas();
      },
    });
  }

  override writeValue(value: string | null): void {
    super.writeValue(value);
    if (value !== null) {
      this._activeSrc.set(value);
    }
  }

  zoomIn(): void {
    this.zoomLevel.update(v => Math.min(1000, v + (this._defaults.zoomStep ?? 0.1) * 100));
    this._scheduleEmit();
  }

  zoomOut(): void {
    this.zoomLevel.update(v => Math.max(10, v - (this._defaults.zoomStep ?? 0.1) * 100));
    this._scheduleEmit();
  }

  rotateStep(degrees: number): void {
    this.rotationOffset.update(v => v + degrees);
    this._scheduleEmit();
  }

  onRotateSlider(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.rotationAngle.set(Number(input.value));
  }

  onRotateSliderStart(): void {
    this.liveRotationDragging.set(true);
    this._bakedRotation = this.rotation();
    this._bakedFitScale = this._canvasEngine?.getRotationFitScale?.(this.rotation()) ?? 1;
  }

  onRotateSliderEnd(): void {
    this.liveRotationDragging.set(false);
    if (!this._canvasEngine || !this.imageLoaded()) return;
    this._canvasEngine.setRotation(this.rotation());
    this._canvasEngine.render();
    this._emitResult();
  }

  onAspectChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.effectiveAspectRatio.set(select.value as RuiAspectRatioPreset);
  }

  onPointerDown(event: PointerEvent): void {
    if (!this._canvasEngine || !this.imageLoaded()) return;
    const viewport = this.viewportRef()?.nativeElement;
    if (!viewport) return;

    const rect = viewport.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const currentRect = this._canvasEngine.getCropRect();

    const handle = this._getHandle(x, y, currentRect);
    if (handle) {
      this._interaction.beginResize(handle, x, y, currentRect);
    } else if (this._isInsideRect(x, y, currentRect)) {
      this._interaction.beginMove(x, y, currentRect);
    } else if (this._isInsideImageBounds(x, y)) {
      this._panning = true;
      this._panStartPointerX = event.clientX;
      this._panStartPointerY = event.clientY;
      this._panStartPanX = this._canvasEngine.panX;
      this._panStartPanY = this._canvasEngine.panY;
    }

    viewport.setPointerCapture(event.pointerId);
  }

  onPointerMove(event: PointerEvent): void {
    if (!this._canvasEngine) return;
    const viewport = this.viewportRef()?.nativeElement;
    if (!viewport) return;

    if (this._panning) {
      const rotationRad = (this._canvasEngine.getRotation() * Math.PI) / 180;
      const cosR = Math.cos(rotationRad);
      const sinR = Math.sin(rotationRad);
      const deltaX = event.clientX - this._panStartPointerX;
      const deltaY = event.clientY - this._panStartPointerY;
      const newPanX = this._panStartPanX + deltaX * cosR + deltaY * sinR;
      const newPanY = this._panStartPanY - deltaX * sinR + deltaY * cosR;
      const dpx = newPanX - this._canvasEngine.panX;
      const dpy = newPanY - this._canvasEngine.panY;
      this._canvasEngine.panX = newPanX;
      this._canvasEngine.panY = newPanY;
      const vw = this._canvasEngine.getDisplayWidth();
      const vh = this._canvasEngine.getDisplayHeight();
      if (vw > 0 && vh > 0) {
        const r = this._canvasEngine.getCropRect();
        const constrained = this._constrainCropRect({
          x: r.x + dpx / vw,
          y: r.y + dpy / vh,
          width: r.width,
          height: r.height,
        });
        this._canvasEngine.setCropRect(constrained);
        this._cropRect.set(constrained);
      }
      this._canvasEngine.render();
      return;
    }

    if (this._interaction.mode === 'none') return;
    const rect = viewport.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const physicalRatio = this._resolveAspectRatio(this.effectiveAspectRatio());
    const viewportRatio = physicalRatio !== null
      ? physicalRatio * rect.height / rect.width
      : null;
    const minNormW = Math.max(0.005, this.minCropWidth() / rect.width);
    const minNormH = Math.max(0.005, this.minCropHeight() / rect.height);

    const newRect = this._interaction.updateRect(x, y, rect.width, rect.height, viewportRatio, minNormW, minNormH);
    const constrained = this._constrainCropRect(newRect);
    this._canvasEngine.setCropRect(constrained);
    this._canvasEngine.render();
    this._cropRect.set(constrained);
  }

  onPointerUp(): void {
    if (this._panning) {
      this._panning = false;
      this._interaction.reset();
      if (this._canvasEngine) {
        const constrained = this._constrainCropRect(this._canvasEngine.getCropRect());
        this._canvasEngine.setCropRect(constrained);
        this._cropRect.set(constrained);
      }
      this._emitResult();
      return;
    }
    if (this._interaction.mode === 'none') return;
    this._interaction.end();
    this._emitResult();
  }

  onKeydown(event: KeyboardEvent): void {
    if (!this._canvasEngine) return;

    const step = 0.05;
    let moved = false;
    let dx = 0;
    let dy = 0;

    switch (event.key) {
      case 'ArrowUp':
        dy = -step;
        moved = true;
        break;
      case 'ArrowDown':
        dy = step;
        moved = true;
        break;
      case 'ArrowLeft':
        dx = -step;
        moved = true;
        break;
      case 'ArrowRight':
        dx = step;
        moved = true;
        break;
      case '+':
      case '=':
        this.zoomIn();
        return;
      case '-':
      case '_':
        this.zoomOut();
        return;
      case 'r':
        this.rotateStep(-90);
        return;
      case 'R':
        this.rotateStep(90);
        return;
    }

    if (moved) {
      event.preventDefault();
      const r = this._canvasEngine.getCropRect();
      const newX = Math.max(0, Math.min(1 - r.width, r.x + dx));
      const newY = Math.max(0, Math.min(1 - r.height, r.y + dy));
      const constrained = this._constrainCropRect({
        x: newX,
        y: newY,
        width: r.width,
        height: r.height,
      });
      this._canvasEngine.setCropRect(constrained);
      this._canvasEngine.render();
      this._cropRect.set(constrained);
      this._emitResult();
    }
  }

  private _initCanvas(): void {
    if (!ensureBrowser(this._injector)) return;

    const canvasEl = this.canvasRef()?.nativeElement;
    const viewportEl = this.viewportRef()?.nativeElement;
    if (!canvasEl || !viewportEl) return;

    this._canvasEngine = new RuiCropperCanvas(canvasEl);

    const engine = this._canvasEngine;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = viewportEl.clientWidth;
      const h = viewportEl.clientHeight;
      if (w > 0 && h > 0 && engine) {
        engine.displayWidth = w;
        engine.displayHeight = h;
        canvasEl.width = w * dpr;
        canvasEl.height = h * dpr;
        canvasEl.style.width = w + 'px';
        canvasEl.style.height = h + 'px';
        const ctx = canvasEl.getContext('2d');
        if (ctx) ctx.scale(dpr, dpr);
        engine.render();
      }
    };

    resizeCanvas();
    this._canvasReady.set(true);

    const ro = new ResizeObserver(() => {
      resizeCanvas();
    });
    ro.observe(viewportEl);
    this._destroyRef.onDestroy(() => ro.disconnect());

    viewportEl.addEventListener('wheel', this._onWheel, { passive: false });
    this._destroyRef.onDestroy(() => {
      viewportEl.removeEventListener('wheel', this._onWheel);
    });

    viewportEl.addEventListener('lostpointercapture', this._onLostPointerCapture);
    this._destroyRef.onDestroy(() => {
      viewportEl.removeEventListener('lostpointercapture', this._onLostPointerCapture);
    });

    viewportEl.addEventListener('touchstart', this._onTouchStart, { passive: false });
    viewportEl.addEventListener('touchmove', this._onTouchMove, { passive: false });
    viewportEl.addEventListener('touchend', this._onTouchEnd);
    this._destroyRef.onDestroy(() => {
      viewportEl.removeEventListener('touchstart', this._onTouchStart);
      viewportEl.removeEventListener('touchmove', this._onTouchMove);
      viewportEl.removeEventListener('touchend', this._onTouchEnd);
    });

    const initialSrc = this._activeSrc();
    if (initialSrc) {
      this._loadImage(initialSrc);
    }

    this._destroyRef.onDestroy(() => {
      if (this._emitDebounce) {
        clearTimeout(this._emitDebounce);
      }
    });
  }

  private async _loadImage(src: string): Promise<void> {
    if (!this._canvasEngine) return;
    this.imageLoaded.set(false);
    this._canvasEngine.clearImage();
    this._canvasEngine.panX = 0;
    this._canvasEngine.panY = 0;
    try {
      await this._canvasEngine.loadImage(src);
      const fitZoom = this._canvasEngine.getZoom();
      this.zoomLevel.set(Math.round(fitZoom * 100));
      this._canvasEngine.setRotation(this.rotation());
      const ratio = this._resolveAspectRatio(this.effectiveAspectRatio());
      this._canvasEngine.setAspectRatio(ratio);
      this._canvasEngine.render();
      this._cropRect.set(this._canvasEngine.getCropRect());
      const constrained = this._constrainCropRect(this._canvasEngine.getCropRect());
      this._canvasEngine.setCropRect(constrained);
      this._cropRect.set(constrained);
      this.imageLoaded.set(true);
      this._emitResult();
    } catch {
      this.imageLoaded.set(false);
      this.loadError.emit('Failed to load image: ' + src);
    }
  }

  private _onWheel = (event: WheelEvent): void => {
    event.preventDefault();
    this._ngZone.run(() => {
      if (event.deltaY < 0) {
        this.zoomIn();
      } else {
        this.zoomOut();
      }
    });
  };

  private _onTouchStart = (event: TouchEvent): void => {
    if (event.touches.length === 2) {
      event.preventDefault();
      const dist = this._getTouchDist(event.touches);
      this._interaction.beginPinch(dist, this.zoomLevel() / 100);
    }
  };

  private _onTouchMove = (event: TouchEvent): void => {
    if (event.touches.length === 2) {
      event.preventDefault();
      const dist = this._getTouchDist(event.touches);
      const newZoom = this._interaction.updatePinch(dist);
      this._ngZone.run(() => {
        this.zoomLevel.set(Math.round(Math.max(10, Math.min(1000, newZoom * 100))));
      });
    }
  };

  private _onLostPointerCapture = (): void => {
    this._panning = false;
  };

  private _onTouchEnd = (): void => {
    this._interaction.reset();
  };

  private _getTouchDist(touches: TouchList): number {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  private _getHandle(
    x: number,
    y: number,
    rect: RuiCropRect,
  ): 'nw' | 'ne' | 'sw' | 'se' | null {
    const threshold = 0.05;
    const corners = [
      { handle: 'nw' as const, cx: rect.x, cy: rect.y },
      { handle: 'ne' as const, cx: rect.x + rect.width, cy: rect.y },
      { handle: 'sw' as const, cx: rect.x, cy: rect.y + rect.height },
      { handle: 'se' as const, cx: rect.x + rect.width, cy: rect.y + rect.height },
    ];
    for (const corner of corners) {
      if (Math.abs(x - corner.cx) < threshold && Math.abs(y - corner.cy) < threshold) {
        return corner.handle;
      }
    }
    return null;
  }

  private _isInsideRect(x: number, y: number, rect: RuiCropRect): boolean {
    return (
      x >= rect.x &&
      x <= rect.x + rect.width &&
      y >= rect.y &&
      y <= rect.y + rect.height
    );
  }

  private _isInsideImageBounds(x: number, y: number): boolean {
    if (!this._canvasEngine || !this.imageLoaded()) return false;
    const vw = this._canvasEngine.getDisplayWidth();
    const vh = this._canvasEngine.getDisplayHeight();
    const bounds = this._canvasEngine.getImageBoundsInView();
    const left = bounds.left / vw;
    const right = bounds.right / vw;
    const top = bounds.top / vh;
    const bottom = bounds.bottom / vh;
    return x >= left && x <= right && y >= top && y <= bottom;
  }

  private _resolveAspectRatio(preset: RuiAspectRatioPreset): number | null {
    switch (preset) {
      case '1:1':
        return 1;
      case '4:3':
        return 4 / 3;
      case '16:9':
        return 16 / 9;
      case 'free':
        return null;
    }
  }

  private _emitDebounce: ReturnType<typeof setTimeout> | null = null;

  private _scheduleEmit(): void {
    if (!this._canvasEngine || !this.imageLoaded()) return;
    if (this._emitDebounce) {
      clearTimeout(this._emitDebounce);
    }
    this._emitDebounce = setTimeout(() => {
      this._emitDebounce = null;
      this._emitResult();
    }, 150);
  }

  private _constrainCropToImage(rect: RuiCropRect): RuiCropRect {
    if (!this.constrainToImage()) return rect;
    if (!this._canvasEngine || !this.imageLoaded()) return rect;

    const vw = this._canvasEngine.getDisplayWidth();
    const vh = this._canvasEngine.getDisplayHeight();
    if (vw <= 0 || vh <= 0) return rect;

    const bounds = this._canvasEngine.getImageBoundsInView();
    const left = bounds.left / vw;
    const top = bounds.top / vh;
    const right = bounds.right / vw;
    const bottom = bounds.bottom / vh;

    let { x, y, width, height } = rect;

    if (width > right - left) width = right - left;
    if (height > bottom - top) height = bottom - top;

    if (x < left) x = left;
    if (y < top) y = top;
    if (x + width > right) x = right - width;
    if (y + height > bottom) y = bottom - height;

    if (x < left) x = left;
    if (y < top) y = top;

    return { x, y, width, height };
  }

  private _enforceAspectRatio(rect: RuiCropRect): RuiCropRect {
    if (!this._canvasEngine || !this.imageLoaded()) return rect;

    const physicalRatio = this._resolveAspectRatio(this.effectiveAspectRatio());
    if (physicalRatio === null) return rect;

    const vw = this._canvasEngine.getDisplayWidth();
    const vh = this._canvasEngine.getDisplayHeight();
    if (vw <= 0 || vh <= 0) return rect;

    const bounds = this.constrainToImage()
      ? this._canvasEngine.getImageBoundsInView()
      : { left: 0, top: 0, right: vw, bottom: vh };

    const left = bounds.left / vw;
    const top = bounds.top / vh;
    const right = bounds.right / vw;
    const bottom = bounds.bottom / vh;

    const normalizedRatio = physicalRatio * vh / vw;
    const bw = right - left;
    const bh = bottom - top;

    let { x, y, width, height } = rect;

    const maxW = Math.min(bw, bh * normalizedRatio);
    const maxH = Math.min(bh, bw / normalizedRatio);
    if (width > maxW) width = maxW;
    if (height > maxH) height = maxH;

    const currentRatio = width / height;
    if (currentRatio > normalizedRatio + 0.0001) {
      width = height * normalizedRatio;
    } else if (currentRatio < normalizedRatio - 0.0001) {
      height = width / normalizedRatio;
    }

    if (x + width > right) x = right - width;
    if (y + height > bottom) y = bottom - height;
    if (x < left) x = left;
    if (y < top) y = top;

    return { x, y, width, height };
  }

  private _constrainCropRect(rect: RuiCropRect): RuiCropRect {
    rect = this._enforceAspectRatio(rect);
    rect = this._constrainCropToImage(rect);
    return rect;
  }

  private async _emitResult(): Promise<void> {
    if (!this._canvasEngine) return;
    const format = this.outputFormat();
    const quality = this.outputQuality();
    const ow = this.outputWidth() || undefined;
    const oh = this.outputHeight() || undefined;
    const dataUrl = this._canvasEngine.getOutput(format, quality, ow, oh);
    const blob = await this._canvasEngine.getOutputBlob(format, quality, ow, oh);

    let outputWidthFinal = ow ?? 0;
    let outputHeightFinal = oh ?? 0;
    if (!ow && !oh) {
      const cropSize = this._canvasEngine.getCropPixelSize();
      outputWidthFinal = cropSize.width;
      outputHeightFinal = cropSize.height;
    } else if (ow && !oh) {
      const cropSize = this._canvasEngine.getCropPixelSize();
      const aspect = cropSize.width / Math.max(cropSize.height, 1);
      outputHeightFinal = Math.round(ow / aspect);
    } else if (!ow && oh) {
      const cropSize = this._canvasEngine.getCropPixelSize();
      const aspect = cropSize.width / Math.max(cropSize.height, 1);
      outputWidthFinal = Math.round(oh * aspect);
    }

    const result: RuiCropperResult = {
      dataUrl,
      blob,
      width: outputWidthFinal,
      height: outputHeightFinal,
      format,
    };
    this.croppedImage.set(dataUrl);
    this.cropChange.emit(result);
    this.markAsChanged(dataUrl);
  }
}
