import { RuiCropRect } from './cropper.types';

export class RuiCropperCanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private image: HTMLImageElement | null = null;
  private zoom = 1;
  private rotation = 0;
  private cropRect: RuiCropRect;
  private aspectRatio: number | null = null;

  private _imageWidth = 0;
  private _imageHeight = 0;

  displayWidth = 0;
  displayHeight = 0;
  panX = 0;
  panY = 0;

  private _imgOffsetX = 0;
  private _imgOffsetY = 0;
  private _imageCache: HTMLCanvasElement | null = null;

  get imageWidth(): number { return this._imageWidth; }
  get imageHeight(): number { return this._imageHeight; }

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get 2D context');
    this.ctx = ctx;
    this.cropRect = { x: 0.25, y: 0.25, width: 0.5, height: 0.5 };
  }

  async loadImage(src: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      if (src.startsWith('http')) {
        img.crossOrigin = 'anonymous';
      }
      img.onload = () => {
        this.image = img;
        this._imageWidth = img.naturalWidth;
        this._imageHeight = img.naturalHeight;
        const cache = document.createElement('canvas');
        cache.width = img.naturalWidth;
        cache.height = img.naturalHeight;
        const cacheCtx = cache.getContext('2d');
        if (cacheCtx) {
          cacheCtx.drawImage(img, 0, 0);
        }
        this._imageCache = cache;
        const w = this.displayWidth || this.canvas.width;
        const h = this.displayHeight || this.canvas.height;
        const scaleX = w / img.naturalWidth;
        const scaleY = h / img.naturalHeight;
        const fitZoom = Math.min(scaleX, scaleY);
        this.zoom = fitZoom;
        this.cropRect = { x: 0.25, y: 0.25, width: 0.5, height: 0.5 };
        this._updateOffsets();
        this.render();
        resolve();
      };
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  }

  clearImage(): void {
    this.image = null;
    this._imageWidth = 0;
    this._imageHeight = 0;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  setZoom(zoom: number): void {
    this.zoom = Math.min(10, Math.max(0.1, zoom));
    this._updateOffsets();
  }

  getZoom(): number {
    return this.zoom;
  }

  setRotation(degrees: number): void {
    this.rotation = ((degrees % 360) + 360) % 360;
    this._updateOffsets();
  }

  getRotation(): number {
    return this.rotation;
  }

  getRotationFitScale(rotation?: number): number {
    return this._computeRotationFitScale(rotation ?? this.rotation);
  }

  setCropRect(rect: RuiCropRect): void {
    this.cropRect = { ...rect };
  }

  getCropRect(): RuiCropRect {
    return { ...this.cropRect };
  }

  setAspectRatio(physicalRatio: number | null): void {
    this.aspectRatio = physicalRatio;
    if (physicalRatio === null) return;

    const vw = this.displayWidth || this.canvas.width;
    const vh = this.displayHeight || this.canvas.height;
    if (vw <= 0 || vh <= 0) return;

    const normalizedRatio = physicalRatio * vh / vw;
    const currentRatio = this.cropRect.width / this.cropRect.height;
    if (Math.abs(currentRatio - normalizedRatio) < 0.0001) return;

    if (currentRatio > normalizedRatio) {
      const newWidth = this.cropRect.height * normalizedRatio;
      const dx = (this.cropRect.width - newWidth) / 2;
      this.cropRect.x += dx;
      this.cropRect.width = newWidth;
    } else {
      const newHeight = this.cropRect.width / normalizedRatio;
      const dy = (this.cropRect.height - newHeight) / 2;
      this.cropRect.y += dy;
      this.cropRect.height = newHeight;
    }

    this._clampCropRect();
  }

  getAspectRatio(): number | null {
    return this.aspectRatio;
  }

  getDisplayWidth(): number {
    return this.displayWidth || this.canvas.width;
  }

  getDisplayHeight(): number {
    return this.displayHeight || this.canvas.height;
  }

  render(): void {
    const w = this.getDisplayWidth();
    const h = this.getDisplayHeight();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (!this.image) return;

    const rotationFitScale = this._computeRotationFitScale(this.rotation);
    const effectiveZoom = this.zoom * rotationFitScale;
    const displayW = this.imageWidth * effectiveZoom;
    const displayH = this.imageHeight * effectiveZoom;
    const cx = w / 2;
    const cy = h / 2;
    const imgX = cx - displayW / 2 + this.panX;
    const imgY = cy - displayH / 2 + this.panY;

    this.ctx.save();
    this.ctx.translate(cx, cy);
    this.ctx.rotate((this.rotation * Math.PI) / 180);
    this.ctx.translate(-cx, -cy);

    if (this._imageCache) {
      this.ctx.drawImage(this._imageCache, imgX, imgY, displayW, displayH);
    } else if (this.image) {
      this.ctx.drawImage(this.image, imgX, imgY, displayW, displayH);
    }
    this.ctx.restore();

    this._renderOverlay(w, h);
  }

  private _renderOverlay(w: number, h: number): void {
    const cropPixels = {
      x: this.cropRect.x * w,
      y: this.cropRect.y * h,
      w: this.cropRect.width * w,
      h: this.cropRect.height * h,
    };

    this.ctx.fillStyle = 'rgba(0,0,0,0.5)';
    this.ctx.fillRect(0, 0, w, cropPixels.y);
    this.ctx.fillRect(0, cropPixels.y + cropPixels.h, w, h - cropPixels.y - cropPixels.h);
    this.ctx.fillRect(0, cropPixels.y, cropPixels.x, cropPixels.h);
    this.ctx.fillRect(cropPixels.x + cropPixels.w, cropPixels.y, w - cropPixels.x - cropPixels.w, cropPixels.h);

    this.ctx.strokeStyle = 'white';
    this.ctx.lineWidth = 2;
    this.ctx.setLineDash([5, 5]);
    this.ctx.strokeRect(cropPixels.x, cropPixels.y, cropPixels.w, cropPixels.h);
    this.ctx.setLineDash([]);

    const handleSize = 12;
    const handles = [
      { x: cropPixels.x, y: cropPixels.y },
      { x: cropPixels.x + cropPixels.w, y: cropPixels.y },
      { x: cropPixels.x, y: cropPixels.y + cropPixels.h },
      { x: cropPixels.x + cropPixels.w, y: cropPixels.y + cropPixels.h },
    ];
    this.ctx.fillStyle = 'white';
    for (const h of handles) {
      this.ctx.fillRect(h.x - handleSize / 2, h.y - handleSize / 2, handleSize, handleSize);
    }
  }

  getOutput(format: string, quality: number, outputWidth?: number, outputHeight?: number): string {
    const { width, height } = this._resolveOutputSize(outputWidth, outputHeight);
    const offscreen = this._renderOffscreen(width, height);
    return offscreen.toDataURL(format, quality);
  }

  getOutputBlob(format: string, quality: number, outputWidth?: number, outputHeight?: number): Promise<Blob | null> {
    const { width, height } = this._resolveOutputSize(outputWidth, outputHeight);
    const offscreen = this._renderOffscreen(width, height);
    return new Promise<Blob | null>((resolve) => {
      offscreen.toBlob((blob) => resolve(blob), format, quality);
    });
  }

  getImageOffsetX(): number { return this._imgOffsetX + this.panX; }
  getImageOffsetY(): number { return this._imgOffsetY + this.panY; }

  getCropPixelSize(): { width: number; height: number } {
    const vw = this.getDisplayWidth();
    const vh = this.getDisplayHeight();

    return {
      width: Math.round(Math.max(0, this.cropRect.width * vw)),
      height: Math.round(Math.max(0, this.cropRect.height * vh)),
    };
  }

  getImageBoundsInView(): { left: number; top: number; right: number; bottom: number } {
    const vw = this.displayWidth || this.canvas.width;
    const vh = this.displayHeight || this.canvas.height;

    if (!this.image || this.imageWidth <= 0 || this.imageHeight <= 0) {
      return { left: 0, top: 0, right: vw, bottom: vh };
    }

    const rotationFitScale = this._computeRotationFitScale(this.rotation);
    const effectiveZoom = this.zoom * rotationFitScale;
    const displayW = this.imageWidth * effectiveZoom;
    const displayH = this.imageHeight * effectiveZoom;
    const cx = vw / 2;
    const cy = vh / 2;

    const rad = (this.rotation * Math.PI) / 180;
    const c = Math.abs(Math.cos(rad));
    const s = Math.abs(Math.sin(rad));

    const bboxW = displayW * c + displayH * s;
    const bboxH = displayW * s + displayH * c;

    return {
      left: cx - bboxW / 2 + this.panX,
      top: cy - bboxH / 2 + this.panY,
      right: cx + bboxW / 2 + this.panX,
      bottom: cy + bboxH / 2 + this.panY,
    };
  }

  private _computeRotationFitScale(rotationDeg: number): number {
    if (rotationDeg === 0 || rotationDeg === 180 || rotationDeg === 360) return 1;
    const rad = (Math.abs(rotationDeg % 180) * Math.PI) / 180;
    if (rad < 0.001) return 1;
    const s = Math.abs(Math.sin(rad)) + Math.abs(Math.cos(rad));
    return Math.max(1, s);
  }

  private _updateOffsets(): void {
    const w = this.displayWidth || this.canvas.width;
    const h = this.displayHeight || this.canvas.height;
    const rotationFitScale = this._computeRotationFitScale(this.rotation);
    const effectiveZoom = this.zoom * rotationFitScale;
    this._imgOffsetX = (w - this.imageWidth * effectiveZoom) / 2;
    this._imgOffsetY = (h - this.imageHeight * effectiveZoom) / 2;
  }

  private _resolveOutputSize(outputWidth?: number, outputHeight?: number): { width: number; height: number } {
    const vw = this.getDisplayWidth();
    const vh = this.getDisplayHeight();

    const pixelWidth = Math.round(this.cropRect.width * vw);
    const pixelHeight = Math.round(this.cropRect.height * vh);
    const aspect = pixelWidth / Math.max(pixelHeight, 1);

    if (outputWidth && outputWidth > 0 && outputHeight && outputHeight > 0) {
      return { width: outputWidth, height: outputHeight };
    }
    if (outputWidth && outputWidth > 0) {
      return { width: outputWidth, height: Math.round(outputWidth / aspect) };
    }
    if (outputHeight && outputHeight > 0) {
      return { width: Math.round(outputHeight * aspect), height: outputHeight };
    }
    return { width: pixelWidth, height: pixelHeight };
  }

  private _renderOffscreen(width: number, height: number): HTMLCanvasElement {
    const offscreen = document.createElement('canvas');
    offscreen.width = width;
    offscreen.height = height;
    const offCtx = offscreen.getContext('2d');
    if (!offCtx || !this.image) throw new Error('Could not get offscreen 2D context');

    const vw = this.getDisplayWidth();
    const vh = this.getDisplayHeight();

    const intermediate = document.createElement('canvas');
    intermediate.width = vw;
    intermediate.height = vh;
    const intCtx = intermediate.getContext('2d');
    if (!intCtx) throw new Error('Could not get intermediate 2D context');

    const rotationFitScale = this._computeRotationFitScale(this.rotation);
    const effectiveZoom = this.zoom * rotationFitScale;
    const displayW = this.imageWidth * effectiveZoom;
    const displayH = this.imageHeight * effectiveZoom;
    const cx = vw / 2;
    const cy = vh / 2;
    const imgX = cx - displayW / 2 + this.panX;
    const imgY = cy - displayH / 2 + this.panY;

    intCtx.save();
    intCtx.translate(cx, cy);
    intCtx.rotate((this.rotation * Math.PI) / 180);
    intCtx.translate(-cx, -cy);
    if (this._imageCache) {
      intCtx.drawImage(this._imageCache, imgX, imgY, displayW, displayH);
    } else if (this.image) {
      intCtx.drawImage(this.image, imgX, imgY, displayW, displayH);
    }
    intCtx.restore();

    const sx = Math.round(this.cropRect.x * vw);
    const sy = Math.round(this.cropRect.y * vh);
    const sw = Math.round(this.cropRect.width * vw);
    const sh = Math.round(this.cropRect.height * vh);

    offCtx.drawImage(intermediate, sx, sy, sw, sh, 0, 0, width, height);

    return offscreen;
  }

  private _clampCropRect(): void {
    if (this.cropRect.x < 0) this.cropRect.x = 0;
    if (this.cropRect.y < 0) this.cropRect.y = 0;
    if (this.cropRect.x + this.cropRect.width > 1) {
      this.cropRect.x = 1 - this.cropRect.width;
    }
    if (this.cropRect.y + this.cropRect.height > 1) {
      this.cropRect.y = 1 - this.cropRect.height;
    }
  }
}
