import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { RuiCropper } from './cropper';
import { RuiCropRect } from './cropper.types';
import type { RuiCropperInteraction } from './cropper-interaction';

interface CropperTestHandle {
  _initCanvas(): void;
  _emitResult(): Promise<void>;
  _onTouchStart(event: { touches: Array<{ clientX: number; clientY: number }>; preventDefault: () => void }): void;
  _onTouchMove(event: { touches: Array<{ clientX: number; clientY: number }>; preventDefault: () => void }): void;
  _onTouchEnd(): void;
  _interaction: RuiCropperInteraction;
  _canvasReady: import('@angular/core').WritableSignal<boolean>;
}

function asCropper(comp: RuiCropper): CropperTestHandle {
  return comp as unknown as CropperTestHandle;
}

const { mockCanvas } = vi.hoisted(() => {
  const mc = {
    displayWidth: 800,
    displayHeight: 600,
    loadImage: vi.fn().mockResolvedValue(undefined),
    clearImage: vi.fn(),
    setZoom: vi.fn(),
    getZoom: vi.fn().mockReturnValue(1),
    setRotation: vi.fn(),
    getRotation: vi.fn().mockReturnValue(0),
    setCropRect: vi.fn(),
    getCropRect: vi.fn().mockReturnValue({ x: 0.25, y: 0.25, width: 0.5, height: 0.5 }),
    setAspectRatio: vi.fn(),
    getAspectRatio: vi.fn().mockReturnValue(null),
    render: vi.fn(),
    getOutput: vi.fn().mockReturnValue('data:image/png;base64,test'),
    getOutputBlob: vi.fn().mockResolvedValue(new Blob(['test'], { type: 'image/png' })),
    getImageOffsetX: vi.fn().mockReturnValue(0),
    getImageOffsetY: vi.fn().mockReturnValue(0),
    getImageBoundsInView: vi.fn().mockReturnValue({ left: 0, top: 0, right: 800, bottom: 600 }),
    getCropPixelSize: vi.fn().mockReturnValue({ width: 400, height: 300 }),
    getDisplayWidth: vi.fn().mockReturnValue(800),
    getDisplayHeight: vi.fn().mockReturnValue(600),
    getRotationFitScale: vi.fn().mockReturnValue(1),
    panX: 0,
    panY: 0,
    imageWidth: 800,
    imageHeight: 600,
  };
  return { mockCanvas: mc };
});

vi.mock('./cropper-canvas', () => {
  function RuiCropperCanvas() {
    return mockCanvas;
  }
  return { RuiCropperCanvas };
});

describe('RuiCropper', () => {
  beforeEach(async () => {
    mockCanvas.loadImage.mockReset();
    mockCanvas.loadImage.mockResolvedValue(undefined);
    mockCanvas.getOutputBlob.mockReset();
    mockCanvas.getOutputBlob.mockResolvedValue(new Blob(['test'], { type: 'image/png' }));
    mockCanvas.getCropRect.mockReset();
    mockCanvas.getCropRect.mockReturnValue({ x: 0.25, y: 0.25, width: 0.5, height: 0.5 });
    mockCanvas.getCropPixelSize.mockReset();
    mockCanvas.getCropPixelSize.mockReturnValue({ width: 400, height: 300 });
    mockCanvas.getOutput.mockReset();
    mockCanvas.getOutput.mockReturnValue('data:image/png;base64,test');
    mockCanvas.getDisplayWidth.mockReset();
    mockCanvas.getDisplayWidth.mockReturnValue(800);
    mockCanvas.getDisplayHeight.mockReset();
    mockCanvas.getDisplayHeight.mockReturnValue(600);
    mockCanvas.getImageBoundsInView.mockReset();
    mockCanvas.getImageBoundsInView.mockReturnValue({ left: 0, top: 0, right: 800, bottom: 600 });
    mockCanvas.getRotation.mockReset();
    mockCanvas.getRotation.mockReturnValue(0);
    mockCanvas.getRotationFitScale.mockReset();
    mockCanvas.getRotationFitScale.mockReturnValue(1);
    mockCanvas.render.mockReset();
    mockCanvas.setCropRect.mockReset();
    mockCanvas.setZoom.mockReset();
    mockCanvas.clearImage.mockReset();
    mockCanvas.getZoom.mockReset();
    mockCanvas.getZoom.mockReturnValue(1);
    mockCanvas.panX = 0;
    mockCanvas.panY = 0;
    await TestBed.configureTestingModule({
      imports: [RuiCropper],
    }).compileComponents();
  });

  it('creates the component', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('has canvas element in view', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    fixture.detectChanges();
    const canvas = fixture.nativeElement.querySelector('canvas');
    expect(canvas).toBeTruthy();
  });

  it('default aspectRatio is 16:9', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    expect(comp.aspectRatio()).toBe('16:9');
  });

  it('zooms in and out correctly', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;

    expect(comp.zoomLevel()).toBe(100);

    comp.zoomIn();
    expect(comp.zoomLevel()).toBe(110);

    comp.zoomOut();
    expect(comp.zoomLevel()).toBe(100);

    comp.zoomOut();
    expect(comp.zoomLevel()).toBe(90);
  });

  it('rotateStep accumulates rotation offset', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;

    expect(comp.rotationOffset()).toBe(0);
    expect(comp.rotationAngle()).toBe(0);
    expect(comp.rotation()).toBe(0);

    comp.rotateStep(90);
    expect(comp.rotationOffset()).toBe(90);
    expect(comp.rotationAngle()).toBe(0);
    expect(comp.rotation()).toBe(90);

    comp.rotateStep(-90);
    expect(comp.rotationOffset()).toBe(0);
    expect(comp.rotation()).toBe(0);

    comp.rotateStep(90);
    comp.rotateStep(90);
    comp.rotateStep(90);
    comp.rotateStep(90);
    expect(comp.rotationOffset()).toBe(360);
    expect(comp.rotation()).toBe(0);
  });

  it('rotation combines offset and angle', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;

    comp.rotateStep(90);
    comp.rotationAngle.set(-10);
    expect(comp.rotation()).toBe(80);

    comp.rotationAngle.set(45);
    expect(comp.rotation()).toBe(135);
  });

  it('rotationMin and rotationMax default to -45/45', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    expect(comp.rotationMin()).toBe(-45);
    expect(comp.rotationMax()).toBe(45);
  });

  it('changes effective aspect ratio via select', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    fixture.componentRef.setInput('aspectRatio', 'free');
    fixture.detectChanges();
    const comp = fixture.componentInstance;

    comp.imageLoaded.set(true);
    fixture.detectChanges();

    const select = fixture.nativeElement.querySelector('select');
    expect(select).toBeTruthy();

    select.value = '1:1';
    select.dispatchEvent(new Event('change'));
    expect(comp.effectiveAspectRatio()).toBe('1:1');
  });

  it('emits loadError on image load failure', async () => {
    mockCanvas.loadImage.mockRejectedValue(new Error('load failed'));
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    asCropper(comp)._initCanvas();
    asCropper(comp)._canvasReady.set(true);
    fixture.detectChanges();

    fixture.componentRef.setInput('src', 'bad-url');
    fixture.detectChanges();
    await new Promise(resolve => setTimeout(resolve, 50));
    fixture.detectChanges();

    expect(comp.imageLoaded()).toBe(false);
  });

  it('emits result with blob via _emitResult', async () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    asCropper(comp)._initCanvas();
    fixture.detectChanges();

    const emitSpy = vi.fn();
    comp.cropChange.subscribe(emitSpy);

    await asCropper(comp)._emitResult();

    expect(emitSpy).toHaveBeenCalledTimes(1);
    const result = emitSpy.mock.calls[0][0];
    expect(result.dataUrl).toBe('data:image/png;base64,test');
    expect(result.blob).toBeInstanceOf(Blob);
  });

  it('passes outputWidth/outputHeight to canvas engine', async () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    asCropper(comp)._initCanvas();
    fixture.componentRef.setInput('outputWidth', 400);
    fixture.componentRef.setInput('outputHeight', 300);

    await asCropper(comp)._emitResult();

    expect(mockCanvas.getOutput).toHaveBeenCalledWith('image/png', 0.92, 400, 300);
    expect(mockCanvas.getOutputBlob).toHaveBeenCalledWith('image/png', 0.92, 400, 300);
  });

  it('clamps keyboard move to viewport bounds', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    asCropper(comp)._initCanvas();
    mockCanvas.getCropRect.mockReturnValue({ x: 0, y: 0, width: 0.5, height: 0.5 });

    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    comp.onKeydown(event);

    expect(mockCanvas.setCropRect).toHaveBeenCalledWith(
      expect.objectContaining({ x: 0, y: 0 })
    );
  });

  it('clamps keyboard move to bottom-right bounds', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    asCropper(comp)._initCanvas();
    mockCanvas.getCropRect.mockReturnValue({ x: 0.9, y: 0.9, width: 0.5, height: 0.5 });

    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    comp.onKeydown(event);

    expect(mockCanvas.setCropRect).toHaveBeenCalledWith(
      expect.objectContaining({ x: 0.5, y: 0.5 })
    );
  });

  it('handles touch pinch zoom', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    asCropper(comp)._initCanvas();

    const touchStart = { touches: [{ clientX: 100, clientY: 200 }, { clientX: 300, clientY: 200 }], preventDefault: vi.fn() };
    asCropper(comp)._onTouchStart(touchStart);

    const touchMove = { touches: [{ clientX: 50, clientY: 200 }, { clientX: 350, clientY: 200 }], preventDefault: vi.fn() };
    asCropper(comp)._onTouchMove(touchMove);

    expect(comp.zoomLevel()).toBeGreaterThan(100);
  });

  it('resets pinch interaction on touchend', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    asCropper(comp)._initCanvas();

    const touchStart = { touches: [{ clientX: 100, clientY: 200 }, { clientX: 300, clientY: 200 }], preventDefault: vi.fn() };
    asCropper(comp)._onTouchStart(touchStart);

    asCropper(comp)._onTouchEnd();

    const interaction = asCropper(comp)._interaction;
    expect(interaction.mode).toBe('none');
    expect(interaction.startPinchDist).toBe(0);
  });

  it('resizes crop rect when dragging a corner handle', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    asCropper(comp)._initCanvas();
    fixture.detectChanges();

    comp.effectiveAspectRatio.set('free');
    comp.imageLoaded.set(true);
    mockCanvas.getCropRect.mockReturnValue({ x: 0.2, y: 0.2, width: 0.6, height: 0.6 });

    const viewportRef = comp.viewportRef();
    if (!viewportRef) return;
    const viewportEl = viewportRef.nativeElement;
    vi.spyOn(viewportEl, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 400, height: 300 } as DOMRect);
    Object.defineProperty(viewportEl, 'setPointerCapture', { value: vi.fn(), writable: true });

    comp.onPointerDown({ clientX: 320, clientY: 240, pointerId: 1 } as PointerEvent);

    comp.onPointerMove({ clientX: 360, clientY: 270 } as PointerEvent);

    comp.onPointerUp();

    expect(mockCanvas.setCropRect).toHaveBeenCalledWith(
      expect.objectContaining({ width: 0.7, height: 0.7 })
    );
  });

  it('outputWidth default is 0', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    expect(comp.outputWidth()).toBe(0);
  });

  it('minCropWidth default is 20', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    expect(comp.minCropWidth()).toBe(20);
  });

  it('cropRectStyle returns default rect before init', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    const style = comp.cropRectStyle();
    expect(style).toBe('left:25%;top:25%;width:50%;height:50%');
  });

  it('cropRectStyle returns correct percentage values after init', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    asCropper(comp)._initCanvas();
    fixture.detectChanges();

    const style = comp.cropRectStyle();
    expect(style).toBe('left:25%;top:25%;width:50%;height:50%');
  });

  it('cropRectStyle updates after pointer move (overlay scaling regression)', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    asCropper(comp)._initCanvas();
    fixture.detectChanges();

    comp.effectiveAspectRatio.set('free');
    comp.imageLoaded.set(true);
    mockCanvas.getCropRect.mockReturnValue({ x: 0.2, y: 0.2, width: 0.6, height: 0.6 });

    const viewportRef = comp.viewportRef();
    if (!viewportRef) return;
    const viewportEl = viewportRef.nativeElement;
    vi.spyOn(viewportEl, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 400, height: 300 } as DOMRect);
    Object.defineProperty(viewportEl, 'setPointerCapture', { value: vi.fn(), writable: true });

    comp.onPointerDown({ clientX: 320, clientY: 240, pointerId: 1 } as PointerEvent);
    comp.onPointerMove({ clientX: 360, clientY: 270 } as PointerEvent);

    const style = comp.cropRectStyle();
    expect(style).toContain('width:');
    expect(style).not.toBe('left:25%;top:25%;width:50%;height:50%');
  });

  it('rotationAngle signal can be set directly', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;

    comp.rotationAngle.set(15);
    expect(comp.rotationAngle()).toBe(15);
  });

  it('toolbarPosition defaults to bottom', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    expect(comp.toolbarPosition()).toBe('bottom');
  });

  it('width input defaults to 100%', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    expect(comp.width()).toBe('100%');
  });

  it('widthStyle returns px for number values', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.componentRef.setInput('width', 800);
    fixture.detectChanges();
    expect(comp.widthStyle()).toBe('800px');
  });

  it('widthStyle returns string values as-is', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.componentRef.setInput('width', '100%');
    fixture.detectChanges();
    expect(comp.widthStyle()).toBe('100%');
  });

  it('liveRotationDragging starts as false', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    expect(comp.liveRotationDragging()).toBe(false);
  });

  it('onRotateSliderStart sets liveRotationDragging true', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    comp.onRotateSliderStart();
    expect(comp.liveRotationDragging()).toBe(true);
  });

  it('onRotateSliderEnd sets liveRotationDragging false and calls render once', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    asCropper(comp)._initCanvas();
    fixture.detectChanges();

    comp.imageLoaded.set(true);
    comp.onRotateSliderStart();
    mockCanvas.render.mockReset();
    mockCanvas.setRotation.mockReset();

    comp.onRotateSliderEnd();
    expect(comp.liveRotationDragging()).toBe(false);
    expect(mockCanvas.setRotation).toHaveBeenCalledTimes(1);
    expect(mockCanvas.render).toHaveBeenCalledTimes(1);
  });

  it('canvasTransform returns none when not dragging', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    expect(comp.canvasTransform()).toBe('none');
  });

  it('canvasTransform returns rotate string when dragging', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    comp.rotationAngle.set(30);
    comp.liveRotationDragging.set(true);
    fixture.detectChanges();
    expect(comp.canvasTransform()).toBe('rotate(30deg)');
  });

  it('canvasTransform uses delta during drag when rotation was baked', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    comp.rotationOffset.set(90);

    comp.onRotateSliderStart();
    fixture.detectChanges();

    expect(comp.canvasTransform()).toBe('none');

    comp.rotationAngle.set(5);
    fixture.detectChanges();
    expect(comp.canvasTransform()).toBe('rotate(5deg)');

    comp.rotationAngle.set(-3);
    fixture.detectChanges();
    expect(comp.canvasTransform()).toBe('rotate(-3deg)');
  });

  it('canvasTransform includes scale compensation during drag', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    asCropper(comp)._initCanvas();
    asCropper(comp)._canvasReady.set(true);
    fixture.detectChanges();

    mockCanvas.getRotationFitScale.mockReturnValue(1.414);
    comp.rotationOffset.set(45);
    comp.onRotateSliderStart();
    fixture.detectChanges();

    mockCanvas.getRotationFitScale.mockReturnValue(1.174);
    comp.rotationAngle.set(10);
    fixture.detectChanges();
    expect(comp.canvasTransform()).toContain('rotate(10deg)');
    expect(comp.canvasTransform()).toContain('scale(');
    expect(comp.canvasTransform()).toMatch(/scale\(0\.83\d{2}\)/);
  });

  it('rotation effect does NOT call render when liveRotationDragging is true', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    asCropper(comp)._initCanvas();
    asCropper(comp)._canvasReady.set(true);
    fixture.detectChanges();

    comp.liveRotationDragging.set(true);
    mockCanvas.render.mockReset();

    comp.rotationAngle.set(10);
    fixture.detectChanges();

    expect(mockCanvas.setRotation).toHaveBeenCalledWith(10);
    expect(mockCanvas.render).not.toHaveBeenCalled();
  });

  it('rotation effect DOES call render when liveRotationDragging is false', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    asCropper(comp)._initCanvas();
    asCropper(comp)._canvasReady.set(true);
    fixture.detectChanges();

    mockCanvas.render.mockReset();

    comp.rotationAngle.set(10);
    fixture.detectChanges();

    expect(mockCanvas.render).toHaveBeenCalled();
  });

  it('_constrainCropToImage clamps crop to image bounds', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    asCropper(comp)._initCanvas();
    fixture.detectChanges();

    comp.imageLoaded.set(true);
    comp.effectiveAspectRatio.set('free');
    mockCanvas.getDisplayWidth.mockReturnValue(800);
    mockCanvas.getDisplayHeight.mockReturnValue(600);
    mockCanvas.getImageBoundsInView.mockReturnValue({ left: 100, top: 0, right: 500, bottom: 600 });

    const constrained = (comp as unknown as Record<string, (...args: unknown[]) => unknown>)['_constrainCropToImage'](
      { x: 0, y: 0, width: 1, height: 1 },
    ) as RuiCropRect;

    expect(constrained.x).toBe(0.125);
    expect(constrained.y).toBe(0);
    expect(constrained.width).toBe(0.5);
    expect(constrained.height).toBe(1);
  });

  it('_constrainCropToImage passes through when image fills viewport', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    asCropper(comp)._initCanvas();
    fixture.detectChanges();

    comp.imageLoaded.set(true);
    comp.effectiveAspectRatio.set('free');
    mockCanvas.getDisplayWidth.mockReturnValue(800);
    mockCanvas.getDisplayHeight.mockReturnValue(600);
    mockCanvas.getImageBoundsInView.mockReturnValue({ left: 0, top: 0, right: 800, bottom: 600 });

    const constrained = (comp as unknown as Record<string, (...args: unknown[]) => unknown>)['_constrainCropToImage'](
      { x: 0.25, y: 0.25, width: 0.5, height: 0.5 },
    ) as RuiCropRect;

    expect(constrained.x).toBe(0.25);
    expect(constrained.y).toBe(0.25);
    expect(constrained.width).toBe(0.5);
    expect(constrained.height).toBe(0.5);
  });

  it('_constrainCropToImage returns rect unchanged when image is not loaded', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    asCropper(comp)._initCanvas();
    fixture.detectChanges();

    const constrained = (comp as unknown as Record<string, (...args: unknown[]) => unknown>)['_constrainCropToImage'](
      { x: 0, y: 0, width: 1, height: 1 },
    ) as RuiCropRect;

    expect(constrained.x).toBe(0);
    expect(constrained.width).toBe(1);
  });

  it('zoomIn calls _emitResult via debounce', async () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    asCropper(comp)._initCanvas();
    asCropper(comp)._canvasReady.set(true);
    comp.imageLoaded.set(true);
    fixture.detectChanges();

    const emitSpy = vi.spyOn(comp as unknown as { _emitResult: () => Promise<void> }, '_emitResult').mockResolvedValue(undefined);

    comp.zoomIn();

    await new Promise(resolve => setTimeout(resolve, 200));

    expect(emitSpy).toHaveBeenCalled();
    emitSpy.mockRestore();
  });

  it('zoomOut calls _emitResult via debounce', async () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    asCropper(comp)._initCanvas();
    asCropper(comp)._canvasReady.set(true);
    comp.imageLoaded.set(true);
    fixture.detectChanges();

    const emitSpy = vi.spyOn(comp as unknown as { _emitResult: () => Promise<void> }, '_emitResult').mockResolvedValue(undefined);

    comp.zoomOut();

    await new Promise(resolve => setTimeout(resolve, 200));

    expect(emitSpy).toHaveBeenCalled();
    emitSpy.mockRestore();
  });

  it('rotateStep calls _emitResult via debounce', async () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    asCropper(comp)._initCanvas();
    asCropper(comp)._canvasReady.set(true);
    comp.imageLoaded.set(true);
    fixture.detectChanges();

    const emitSpy = vi.spyOn(comp as unknown as { _emitResult: () => Promise<void> }, '_emitResult').mockResolvedValue(undefined);

    comp.rotateStep(90);

    await new Promise(resolve => setTimeout(resolve, 200));

    expect(emitSpy).toHaveBeenCalled();
    emitSpy.mockRestore();
  });

  it('emits cropChange when aspectRatio input changes externally', async () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    asCropper(comp)._initCanvas();
    asCropper(comp)._canvasReady.set(true);
    comp.imageLoaded.set(true);
    fixture.detectChanges();

    await new Promise(resolve => setTimeout(resolve, 200));

    mockCanvas.getOutput.mockReturnValue('data:image/png;base64,updated');

    const emitSpy = vi.fn();
    comp.cropChange.subscribe(emitSpy);

    fixture.componentRef.setInput('aspectRatio', '1:1');
    fixture.detectChanges();
    await new Promise(resolve => setTimeout(resolve, 200));
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalledTimes(1);
    expect(emitSpy.mock.calls[0][0].dataUrl).toBe('data:image/png;base64,updated');
    expect(comp.croppedImage()).toBe('data:image/png;base64,updated');
  });

  it('emits cropChange when rotationAngle set from outside', async () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    asCropper(comp)._initCanvas();
    asCropper(comp)._canvasReady.set(true);
    comp.imageLoaded.set(true);
    fixture.detectChanges();

    await new Promise(resolve => setTimeout(resolve, 200));

    mockCanvas.getOutput.mockReturnValue('data:image/png;base64,rotated');

    const emitSpy = vi.fn();
    comp.cropChange.subscribe(emitSpy);

    comp.rotationAngle.set(90);
    fixture.detectChanges();
    await new Promise(resolve => setTimeout(resolve, 200));
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalledTimes(1);
    expect(comp.croppedImage()).toBe('data:image/png;base64,rotated');
  });

  it('constraint is applied during onPointerMove', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    asCropper(comp)._initCanvas();
    fixture.detectChanges();

    comp.effectiveAspectRatio.set('free');
    comp.imageLoaded.set(true);
    mockCanvas.getCropRect.mockReturnValue({ x: 0.1, y: 0.1, width: 0.8, height: 0.8 });
    mockCanvas.getDisplayWidth.mockReturnValue(800);
    mockCanvas.getDisplayHeight.mockReturnValue(600);
    mockCanvas.getImageBoundsInView.mockReturnValue({ left: 100, top: 0, right: 500, bottom: 600 });

    const viewportRef = comp.viewportRef();
    if (!viewportRef) return;
    const viewportEl = viewportRef.nativeElement;
    vi.spyOn(viewportEl, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 400, height: 300 } as DOMRect);
    Object.defineProperty(viewportEl, 'setPointerCapture', { value: vi.fn(), writable: true });

    comp.onPointerDown({ clientX: 320, clientY: 240, pointerId: 1 } as PointerEvent);
    comp.onPointerMove({ clientX: 400, clientY: 300 } as PointerEvent);

    interface SetCropRectCall { x: number; y: number; width: number; height: number }
    const calls = (mockCanvas.setCropRect as unknown as { mock: { calls: Array<[SetCropRectCall]> } }).mock.calls;
    const lastCall = calls[calls.length - 1]?.[0];
    if (!lastCall) return;
    expect(lastCall.x).toBeGreaterThanOrEqual(0.125);
  });

  it('constrainToImage defaults to true', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    expect(comp.constrainToImage()).toBe(true);
  });

  it('_constrainCropToImage returns rect unchanged when constrainToImage is false', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    asCropper(comp)._initCanvas();
    fixture.detectChanges();

    comp.imageLoaded.set(true);
    mockCanvas.getImageBoundsInView.mockReturnValue({ left: 0, top: 0, right: 800, bottom: 600 });

    fixture.componentRef.setInput('constrainToImage', false);
    fixture.detectChanges();

    const constrained = (comp as unknown as Record<string, (...args: unknown[]) => unknown>)['_constrainCropToImage'](
      { x: -0.5, y: -0.5, width: 2, height: 2 },
    ) as RuiCropRect;

    expect(constrained.x).toBe(-0.5);
    expect(constrained.y).toBe(-0.5);
    expect(constrained.width).toBe(2);
    expect(constrained.height).toBe(2);
  });

  it('constraint applied after image load', async () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    asCropper(comp)._initCanvas();
    asCropper(comp)._canvasReady.set(true);
    fixture.detectChanges();

    comp.imageLoaded.set(false);
    mockCanvas.getImageBoundsInView.mockReturnValue({ left: 50, top: 50, right: 750, bottom: 550 });
    mockCanvas.setCropRect.mockReset();

    fixture.componentRef.setInput('src', 'https://example.com/img.jpg');

    await new Promise(resolve => setTimeout(resolve, 50));
    fixture.detectChanges();

    expect(mockCanvas.setCropRect).toHaveBeenCalled();
    const calls = (mockCanvas.setCropRect as unknown as { mock: { calls: Array<[RuiCropRect]> } }).mock.calls;
    const lastCall = calls[calls.length - 1]?.[0];
    if (!lastCall) return;
    expect(lastCall.x * 800).toBeGreaterThanOrEqual(50);
  });

  it('zoom effect re-constrains crop rect', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    asCropper(comp)._initCanvas();
    asCropper(comp)._canvasReady.set(true);
    comp.imageLoaded.set(true);
    fixture.detectChanges();

    mockCanvas.getCropRect.mockReturnValue({ x: 0, y: 0, width: 1, height: 1 });
    mockCanvas.getImageBoundsInView.mockReturnValue({ left: 100, top: 0, right: 700, bottom: 600 });
    mockCanvas.setCropRect.mockReset();

    comp.zoomOut();
    fixture.detectChanges();

    expect(mockCanvas.setZoom).toHaveBeenCalled();
    expect(mockCanvas.setCropRect).toHaveBeenCalled();
    const calls = (mockCanvas.setCropRect as unknown as { mock: { calls: Array<[RuiCropRect]> } }).mock.calls;
    const lastCall = calls[calls.length - 1]?.[0];
    if (!lastCall) return;
    expect(lastCall.x).toBeGreaterThanOrEqual(0.125);
    expect(lastCall.width).toBeLessThanOrEqual(0.75);
  });

  it('rotation effect re-constrains crop rect when not live-dragging', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    asCropper(comp)._initCanvas();
    asCropper(comp)._canvasReady.set(true);
    comp.imageLoaded.set(true);
    comp.liveRotationDragging.set(false);
    fixture.detectChanges();

    mockCanvas.setCropRect.mockReset();
    mockCanvas.render.mockReset();

    comp.rotationAngle.set(45);
    fixture.detectChanges();

    expect(mockCanvas.setCropRect).toHaveBeenCalled();
  });

  it('rotation effect does not constrain during live rotation drag', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    asCropper(comp)._initCanvas();
    asCropper(comp)._canvasReady.set(true);
    comp.imageLoaded.set(true);
    comp.liveRotationDragging.set(true);
    fixture.detectChanges();

    mockCanvas.setCropRect.mockReset();
    mockCanvas.render.mockReset();

    comp.rotationAngle.set(30);
    fixture.detectChanges();

    expect(mockCanvas.render).not.toHaveBeenCalled();
    expect(mockCanvas.setCropRect).not.toHaveBeenCalled();
  });

  it('rotation slider end constrains crop rect', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    asCropper(comp)._initCanvas();
    asCropper(comp)._canvasReady.set(true);
    comp.imageLoaded.set(true);
    comp.liveRotationDragging.set(true);
    fixture.detectChanges();

    comp.rotationAngle.set(30);
    fixture.detectChanges();

    mockCanvas.getCropRect.mockReturnValue({ x: 0, y: 0, width: 1, height: 1 });
    mockCanvas.getImageBoundsInView.mockReturnValue({ left: 50, top: 50, right: 750, bottom: 550 });
    mockCanvas.setCropRect.mockReset();
    mockCanvas.render.mockReset();

    comp.liveRotationDragging.set(false);
    fixture.detectChanges();

    expect(mockCanvas.render).toHaveBeenCalled();
    expect(mockCanvas.setCropRect).toHaveBeenCalled();
  });

  it('starts panning when clicking outside crop rect but inside image bounds', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    asCropper(comp)._initCanvas();
    comp.imageLoaded.set(true);
    mockCanvas.getDisplayWidth.mockReturnValue(800);
    mockCanvas.getDisplayHeight.mockReturnValue(600);
    mockCanvas.getImageBoundsInView.mockReturnValue({ left: 100, top: 50, right: 700, bottom: 550 });

    const viewportRef = comp.viewportRef();
    if (!viewportRef) return;
    const viewportEl = viewportRef.nativeElement;
    vi.spyOn(viewportEl, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 800, height: 600 } as DOMRect);
    Object.defineProperty(viewportEl, 'setPointerCapture', { value: vi.fn(), writable: true });

    comp.onPointerDown({ clientX: 150, clientY: 300, pointerId: 1 } as PointerEvent);

    const panning = (comp as unknown as { _panning: boolean })._panning;
    expect(panning).toBe(true);
  });

  it('updates canvas panX/panY during panning', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    asCropper(comp)._initCanvas();
    comp.imageLoaded.set(true);
    mockCanvas.getDisplayWidth.mockReturnValue(800);
    mockCanvas.getDisplayHeight.mockReturnValue(600);
    mockCanvas.getImageBoundsInView.mockReturnValue({ left: 100, top: 50, right: 700, bottom: 550 });
    mockCanvas.getRotation.mockReturnValue(0);

    const viewportRef = comp.viewportRef();
    if (!viewportRef) return;
    const viewportEl = viewportRef.nativeElement;
    vi.spyOn(viewportEl, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 800, height: 600 } as DOMRect);
    Object.defineProperty(viewportEl, 'setPointerCapture', { value: vi.fn(), writable: true });

    comp.onPointerDown({ clientX: 150, clientY: 200, pointerId: 1 } as PointerEvent);
    mockCanvas.render.mockReset();
    comp.onPointerMove({ clientX: 200, clientY: 300 } as PointerEvent);

    expect(mockCanvas.panX).toBe(50);
    expect(mockCanvas.panY).toBe(100);
    expect(mockCanvas.render).toHaveBeenCalled();
  });

  it('ends panning on pointer up and emits result', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    asCropper(comp)._initCanvas();
    comp.imageLoaded.set(true);
    mockCanvas.getDisplayWidth.mockReturnValue(800);
    mockCanvas.getDisplayHeight.mockReturnValue(600);
    mockCanvas.getImageBoundsInView.mockReturnValue({ left: 100, top: 50, right: 700, bottom: 550 });

    const viewportRef = comp.viewportRef();
    if (!viewportRef) return;
    const viewportEl = viewportRef.nativeElement;
    vi.spyOn(viewportEl, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 800, height: 600 } as DOMRect);
    Object.defineProperty(viewportEl, 'setPointerCapture', { value: vi.fn(), writable: true });

    comp.onPointerDown({ clientX: 150, clientY: 200, pointerId: 1 } as PointerEvent);

    const emitSpy = vi.spyOn(comp as unknown as { _emitResult: () => Promise<void> }, '_emitResult').mockResolvedValue(undefined);

    comp.onPointerUp();

    const panning = (comp as unknown as { _panning: boolean })._panning;
    expect(panning).toBe(false);
    expect(emitSpy).toHaveBeenCalled();
    emitSpy.mockRestore();
  });

  it('panning compensates for rotation', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    asCropper(comp)._initCanvas();
    comp.imageLoaded.set(true);
    mockCanvas.getDisplayWidth.mockReturnValue(800);
    mockCanvas.getDisplayHeight.mockReturnValue(600);
    mockCanvas.getImageBoundsInView.mockReturnValue({ left: 100, top: 50, right: 700, bottom: 550 });
    mockCanvas.getRotation.mockReturnValue(90);

    mockCanvas.panX = 100;
    mockCanvas.panY = 50;

    const viewportRef = comp.viewportRef();
    if (!viewportRef) return;
    const viewportEl = viewportRef.nativeElement;
    vi.spyOn(viewportEl, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 800, height: 600 } as DOMRect);
    Object.defineProperty(viewportEl, 'setPointerCapture', { value: vi.fn(), writable: true });

    comp.onPointerDown({ clientX: 150, clientY: 200, pointerId: 1 } as PointerEvent);
    comp.onPointerMove({ clientX: 250, clientY: 100 } as PointerEvent);

    expect(mockCanvas.panX).toBeCloseTo(0, 10);
    expect(mockCanvas.panY).toBeCloseTo(-50, 10);
  });

  it('does not start panning when clicking outside image bounds', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    asCropper(comp)._initCanvas();
    comp.imageLoaded.set(true);
    mockCanvas.getDisplayWidth.mockReturnValue(800);
    mockCanvas.getDisplayHeight.mockReturnValue(600);
    mockCanvas.getImageBoundsInView.mockReturnValue({ left: 200, top: 150, right: 600, bottom: 450 });

    const viewportRef = comp.viewportRef();
    if (!viewportRef) return;
    const viewportEl = viewportRef.nativeElement;
    vi.spyOn(viewportEl, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 800, height: 600 } as DOMRect);
    Object.defineProperty(viewportEl, 'setPointerCapture', { value: vi.fn(), writable: true });

    comp.onPointerDown({ clientX: 50, clientY: 50, pointerId: 1 } as PointerEvent);

    const panning = (comp as unknown as { _panning: boolean })._panning;
    expect(panning).toBe(false);
  });

  it('_constrainCropToImage enforces aspect ratio within image bounds', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    asCropper(comp)._initCanvas();
    fixture.detectChanges();
    comp.imageLoaded.set(true);
    comp.effectiveAspectRatio.set('1:1');
    mockCanvas.getDisplayWidth.mockReturnValue(800);
    mockCanvas.getDisplayHeight.mockReturnValue(600);
    mockCanvas.getImageBoundsInView.mockReturnValue({ left: 100, top: 0, right: 700, bottom: 600 });

    const constrained = (comp as unknown as Record<string, (...args: unknown[]) => unknown>)['_constrainCropToImage'](
      { x: 0, y: 0, width: 1, height: 1 },
    ) as RuiCropRect;

    expect(constrained.width).toBeLessThanOrEqual(0.75);
    expect(Math.abs(constrained.width / constrained.height - 0.75)).toBeLessThan(0.001);
  });

  it('resets panning on lostpointercapture event', () => {
    const fixture = TestBed.createComponent(RuiCropper);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    asCropper(comp)._initCanvas();
    comp.imageLoaded.set(true);
    mockCanvas.getDisplayWidth.mockReturnValue(800);
    mockCanvas.getDisplayHeight.mockReturnValue(600);
    mockCanvas.getImageBoundsInView.mockReturnValue({ left: 100, top: 50, right: 700, bottom: 550 });

    const viewportRef = comp.viewportRef();
    if (!viewportRef) return;
    const viewportEl = viewportRef.nativeElement;
    vi.spyOn(viewportEl, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 800, height: 600 } as DOMRect);
    Object.defineProperty(viewportEl, 'setPointerCapture', { value: vi.fn(), writable: true });

    comp.onPointerDown({ clientX: 150, clientY: 200, pointerId: 1 } as PointerEvent);

    const panningBefore = (comp as unknown as { _panning: boolean })._panning;
    expect(panningBefore).toBe(true);

    viewportEl.dispatchEvent(new Event('lostpointercapture'));

    const panningAfter = (comp as unknown as { _panning: boolean })._panning;
    expect(panningAfter).toBe(false);
  });

  describe('A11y', () => {
    it('supports keyboard zoom via + key', () => {
      const fixture = TestBed.createComponent(RuiCropper);
      const comp = fixture.componentInstance;
      fixture.detectChanges();

      asCropper(comp)._initCanvas();
      asCropper(comp)._canvasReady.set(true);
      comp.imageLoaded.set(true);
      fixture.detectChanges();

      comp.onKeydown(new KeyboardEvent('keydown', { key: '+' }));
      expect(comp.zoomLevel()).toBe(110);
    });

    it('supports keyboard zoom via - key', () => {
      const fixture = TestBed.createComponent(RuiCropper);
      const comp = fixture.componentInstance;
      fixture.detectChanges();

      asCropper(comp)._initCanvas();
      asCropper(comp)._canvasReady.set(true);
      comp.imageLoaded.set(true);
      fixture.detectChanges();

      comp.onKeydown(new KeyboardEvent('keydown', { key: '-' }));
      expect(comp.zoomLevel()).toBe(90);
    });

    it('supports keyboard rotation via r key (left)', () => {
      const fixture = TestBed.createComponent(RuiCropper);
      const comp = fixture.componentInstance;
      fixture.detectChanges();

      comp.onKeydown(new KeyboardEvent('keydown', { key: 'r' }));
      expect(comp.rotationOffset()).toBe(-90);
    });

    it('supports keyboard rotation via R key (right)', () => {
      const fixture = TestBed.createComponent(RuiCropper);
      const comp = fixture.componentInstance;
      fixture.detectChanges();

      comp.onKeydown(new KeyboardEvent('keydown', { key: 'R' }));
      expect(comp.rotationOffset()).toBe(90);
    });

    it('has correct aria-labels on toolbar buttons when image loaded', () => {
      const fixture = TestBed.createComponent(RuiCropper);
      const comp = fixture.componentInstance;
      fixture.detectChanges();
      comp.imageLoaded.set(true);
      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll('.rui-cropper-toolbar__btn');
      const labels = Array.from(buttons).map((b) => (b as HTMLElement).getAttribute('aria-label'));
      expect(labels).toContain('Zoom in');
      expect(labels).toContain('Zoom out');
      expect(labels).toContain('Rotate left 90°');
      expect(labels).toContain('Rotate right 90°');
    });

    it('rotation slider is accessible with aria-label', () => {
      const fixture = TestBed.createComponent(RuiCropper);
      const comp = fixture.componentInstance;
      fixture.detectChanges();
      comp.imageLoaded.set(true);
      fixture.detectChanges();

      const slider = fixture.nativeElement.querySelector('.rui-cropper-toolbar__slider') as HTMLInputElement;
      expect(slider).toBeTruthy();
      expect(slider.getAttribute('aria-label')).toBe('Fine rotation');
    });
  });
});
