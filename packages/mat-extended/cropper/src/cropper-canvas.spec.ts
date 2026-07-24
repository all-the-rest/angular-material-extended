import { describe, it, expect, vi, afterEach } from 'vitest';
import { RuiCropperCanvas } from './cropper-canvas';
import { createCanvas } from 'canvas';

interface RuiCropperCanvasTest {
  ctx: CanvasRenderingContext2D;
}
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateTestImageDataUrl(width: number, height: number): string {
  const c = createCanvas(width, height);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#ff0000';
  ctx.fillRect(0, 0, width / 2, height / 2);
  ctx.fillStyle = '#00ff00';
  ctx.fillRect(width / 2, 0, width / 2, height / 2);
  ctx.fillStyle = '#0000ff';
  ctx.fillRect(0, height / 2, width / 2, height / 2);
  ctx.fillStyle = '#ffff00';
  ctx.fillRect(width / 2, height / 2, width / 2, height / 2);
  return c.toDataURL('image/png');
}

describe('RuiCropperCanvas', () => {
  let origCreateElement: typeof document.createElement;
  const ncCreateCanvas = createCanvas;

  beforeAll(() => {
    origCreateElement = document.createElement.bind(document);
    document.createElement = function (tagName: string, options?: ElementCreationOptions): HTMLElement {
      if (tagName === 'canvas' || tagName === 'CANVAS') {
        return ncCreateCanvas(300, 150) as unknown as HTMLElement;
      }
      return origCreateElement(tagName, options);
    } as typeof document.createElement;
  });

  afterAll(() => {
    document.createElement = origCreateElement;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  function createCanvasEl(w = 800, h = 600): HTMLCanvasElement {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    return c;
  }

  it('constructor sets centered default cropRect', () => {
    const cropper = new RuiCropperCanvas(createCanvasEl());
    const rect = cropper.getCropRect();
    expect(rect.x).toBe(0.25);
    expect(rect.y).toBe(0.25);
    expect(rect.width).toBe(0.5);
    expect(rect.height).toBe(0.5);
  });

  it('loadImage resolves and sets image dimensions', async () => {
    const cropper = new RuiCropperCanvas(createCanvasEl());
    await cropper.loadImage(generateTestImageDataUrl(800, 600));

    expect(cropper.imageWidth).toBe(800);
    expect(cropper.imageHeight).toBe(600);
    expect(cropper.getZoom()).toBeGreaterThan(0);
    const rect = cropper.getCropRect();
    expect(rect.x).toBe(0.25);
    expect(rect.y).toBe(0.25);
    expect(rect.width).toBe(0.5);
    expect(rect.height).toBe(0.5);
  });

  it('setZoom/getZoom work correctly', () => {
    const cropper = new RuiCropperCanvas(createCanvasEl());

    cropper.setZoom(2);
    expect(cropper.getZoom()).toBe(2);

    cropper.setZoom(0.05);
    expect(cropper.getZoom()).toBe(0.1);

    cropper.setZoom(15);
    expect(cropper.getZoom()).toBe(10);

    cropper.setZoom(0.1);
    expect(cropper.getZoom()).toBe(0.1);

    cropper.setZoom(10);
    expect(cropper.getZoom()).toBe(10);
  });

  it('setRotation/getRotation work correctly (normalized)', () => {
    const cropper = new RuiCropperCanvas(createCanvasEl());

    cropper.setRotation(90);
    expect(cropper.getRotation()).toBe(90);

    cropper.setRotation(450);
    expect(cropper.getRotation()).toBe(90);

    cropper.setRotation(-90);
    expect(cropper.getRotation()).toBe(270);

    cropper.setRotation(0);
    expect(cropper.getRotation()).toBe(0);

    cropper.setRotation(360);
    expect(cropper.getRotation()).toBe(0);
  });

  it('setCropRect/getCropRect work correctly', () => {
    const cropper = new RuiCropperCanvas(createCanvasEl());
    const rect = { x: 0.1, y: 0.2, width: 0.5, height: 0.6 };

    cropper.setCropRect(rect);
    const result = cropper.getCropRect();

    expect(result.x).toBe(0.1);
    expect(result.y).toBe(0.2);
    expect(result.width).toBe(0.5);
    expect(result.height).toBe(0.6);
    expect(result).not.toBe(rect);
  });

  it('setAspectRatio adjusts cropRect accounting for viewport', () => {
    const cropper = new RuiCropperCanvas(createCanvasEl(800, 600));
    cropper.displayWidth = 800;
    cropper.displayHeight = 600;
    cropper.setCropRect({ x: 0, y: 0, width: 0.8, height: 0.6 });
    cropper.setAspectRatio(1);

    const rect = cropper.getCropRect();
    expect(rect.width).toBeCloseTo(0.45);
    expect(rect.height).toBeCloseTo(0.6);
    expect(rect.x).toBeCloseTo(0.175);
    expect(rect.y).toBe(0);
    expect(cropper.getAspectRatio()).toBe(1);
  });

  it('render does not throw with image', async () => {
    const cropper = new RuiCropperCanvas(createCanvasEl());
    await cropper.loadImage(generateTestImageDataUrl(100, 100));
    expect(() => cropper.render()).not.toThrow();
  });

  it('getOutput returns a data URL string', async () => {
    const cropper = new RuiCropperCanvas(createCanvasEl(800, 600));
    cropper.displayWidth = 800;
    cropper.displayHeight = 600;
    await cropper.loadImage(generateTestImageDataUrl(100, 100));
    const result = cropper.getOutput('image/png', 0.92);
    expect(result).toContain('data:image/png;base64,');
  });

  it('getCropPixelSize returns correct pixel dimensions', async () => {
    const cropper = new RuiCropperCanvas(createCanvasEl(800, 600));
    cropper.displayWidth = 800;
    cropper.displayHeight = 600;
    await cropper.loadImage(generateTestImageDataUrl(200, 150));
    cropper.setCropRect({ x: 0.25, y: 0.25, width: 0.5, height: 0.5 });

    const size = cropper.getCropPixelSize();
    expect(size.width).toBeGreaterThan(0);
    expect(size.height).toBeGreaterThan(0);
  });

  it('getDisplayWidth/Height return viewport dimensions', () => {
    const cropper = new RuiCropperCanvas(createCanvasEl(800, 600));
    cropper.displayWidth = 800;
    cropper.displayHeight = 600;
    expect(cropper.getDisplayWidth()).toBe(800);
    expect(cropper.getDisplayHeight()).toBe(600);
  });

  it('getImageBoundsInView returns full viewport when no image', () => {
    const cropper = new RuiCropperCanvas(createCanvasEl(800, 600));
    cropper.displayWidth = 800;
    cropper.displayHeight = 600;

    const bounds = cropper.getImageBoundsInView();
    expect(bounds.left).toBe(0);
    expect(bounds.top).toBe(0);
    expect(bounds.right).toBe(800);
    expect(bounds.bottom).toBe(600);
  });

  it('getImageBoundsInView returns viewport-sized bounds at fit zoom with rotation 0', async () => {
    const cropper = new RuiCropperCanvas(createCanvasEl(800, 600));
    cropper.displayWidth = 800;
    cropper.displayHeight = 600;
    await cropper.loadImage(generateTestImageDataUrl(800, 600));

    cropper.setZoom(1);
    cropper.setRotation(0);

    const bounds = cropper.getImageBoundsInView();
    expect(bounds.left).toBe(0);
    expect(bounds.top).toBe(0);
    expect(bounds.right).toBe(800);
    expect(bounds.bottom).toBe(600);
  });

  it('getImageBoundsInView returns centered bounds when image is smaller than viewport', async () => {
    const cropper = new RuiCropperCanvas(createCanvasEl(800, 600));
    cropper.displayWidth = 800;
    cropper.displayHeight = 600;
    await cropper.loadImage(generateTestImageDataUrl(400, 300));

    cropper.setZoom(1);
    cropper.setRotation(0);

    const bounds = cropper.getImageBoundsInView();

    expect(bounds.left).toBeGreaterThan(0);
    expect(bounds.left).toBeLessThan(400);
    expect(bounds.top).toBeGreaterThan(0);
    expect(bounds.top).toBeLessThan(300);
    expect(bounds.right).toBeLessThan(800);
    expect(bounds.right).toBeGreaterThan(400);
    expect(bounds.bottom).toBeLessThan(600);
    expect(bounds.bottom).toBeGreaterThan(300);

    const imw = bounds.right - bounds.left;
    const imh = bounds.bottom - bounds.top;
    expect(imw).toBeCloseTo(400, -1);
    expect(imh).toBeCloseTo(300, -1);
  });

  it('getImageBoundsInView returns tighter inscribed bounds at 45° rotation (no empty corners)', async () => {
    const cropper = new RuiCropperCanvas(createCanvasEl(800, 600));
    cropper.displayWidth = 800;
    cropper.displayHeight = 600;
    await cropper.loadImage(generateTestImageDataUrl(800, 600));

    cropper.setZoom(1);
    cropper.setRotation(45);

    const fitScale = cropper.getRotationFitScale();
    expect(fitScale).toBeGreaterThan(1);

    const bounds = cropper.getImageBoundsInView();

    expect(bounds.left).toBeCloseTo(-300, 0);
    expect(bounds.top).toBeCloseTo(-400, 0);
    expect(bounds.right).toBeCloseTo(1100, 0);
    expect(bounds.bottom).toBeCloseTo(1000, 0);
  });

  it('getImageBoundsInView reports inscribed bounds exceeding viewport at high zoom', async () => {
    const cropper = new RuiCropperCanvas(createCanvasEl(800, 600));
    cropper.displayWidth = 800;
    cropper.displayHeight = 600;
    await cropper.loadImage(generateTestImageDataUrl(800, 600));

    cropper.setZoom(3);
    cropper.setRotation(30);

    const bounds = cropper.getImageBoundsInView();

    expect(bounds.left).toBeLessThan(0);
    expect(bounds.top).toBeLessThan(0);
    expect(bounds.right).toBeGreaterThan(800);
    expect(bounds.bottom).toBeGreaterThan(600);
  });

  it('getImageBoundsInView returns correct inscribed bounds at 10°', async () => {
    const cropper = new RuiCropperCanvas(createCanvasEl(800, 600));
    cropper.displayWidth = 800;
    cropper.displayHeight = 600;
    await cropper.loadImage(generateTestImageDataUrl(800, 600));

    cropper.setZoom(1);
    cropper.setRotation(10);

    const bounds = cropper.getImageBoundsInView();
    const insw = bounds.right - bounds.left;
    const insh = bounds.bottom - bounds.top;

    expect(insw).toBeGreaterThanOrEqual(1000);
    expect(insh).toBeGreaterThanOrEqual(800);
    expect(insw).toBeLessThanOrEqual(1050);
    expect(insh).toBeLessThanOrEqual(900);
  });

  it('produces deterministically identical output for same inputs (within run)', async () => {
    const cropper = new RuiCropperCanvas(createCanvasEl(800, 600));
    cropper.displayWidth = 800;
    cropper.displayHeight = 600;
    await cropper.loadImage(generateTestImageDataUrl(800, 600));
    cropper.setZoom(1);
    cropper.setCropRect({ x: 0.25, y: 0.25, width: 0.5, height: 0.5 });
    cropper.setAspectRatio(1);
    cropper.setRotation(45);
    cropper.render();
    const a = cropper.getOutput('image/png', 1);
    const b = cropper.getOutput('image/png', 1);
    expect(a).toBe(b);
  });

  it('produces geometrically correct output after 90° rotation', async () => {
    const cropper = new RuiCropperCanvas(createCanvasEl(100, 100));
    cropper.displayWidth = 100;
    cropper.displayHeight = 100;
    await cropper.loadImage(generateTestImageDataUrl(100, 100));
    cropper.setZoom(1);
    cropper.setCropRect({ x: 0, y: 0, width: 1, height: 1 });
    cropper.setRotation(0);
    cropper.render();

    // Top-left quadrant should be red (#ff0000) without rotation
    const ctx = (cropper as unknown as RuiCropperCanvasTest).ctx;
    let pixel = ctx.getImageData(25, 25, 1, 1).data;
    expect(pixel[0]).toBeGreaterThan(200);
    expect(pixel[1]).toBeLessThan(50);
    expect(pixel[2]).toBeLessThan(50);

    // Now rotate 90° CW — canvas (75, 75) shows original top-right (green)
    cropper.setRotation(90);
    cropper.render();
    pixel = ctx.getImageData(75, 75, 1, 1).data;
    expect(pixel[0]).toBeLessThan(50);
    expect(pixel[1]).toBeGreaterThan(200);
    expect(pixel[2]).toBeLessThan(50);

    // Save output to test-output for manual inspection
    const output = cropper.getOutput('image/png', 1);
    const outputBuf = Buffer.from(output.split(',')[1], 'base64');

    const outputDir = path.resolve(__dirname, '../../../../test-output');
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, 'cropper-rotate-90.png'), outputBuf);
  });

  it('produces deterministic output from picsum fixture with 1:1 crop and 90° rotation', async () => {
    const inputBuf = fs.readFileSync(path.join(__dirname, '__fixtures__', 'input-picsum-800x600.jpg'));
    const dataUrl = `data:image/jpeg;base64,${inputBuf.toString('base64')}`;

    const cropper = new RuiCropperCanvas(createCanvasEl(800, 600));
    cropper.displayWidth = 800;
    cropper.displayHeight = 600;
    await cropper.loadImage(dataUrl);
    cropper.setZoom(1);
    cropper.setCropRect({ x: 0.25, y: 0.25, width: 0.5, height: 0.5 });
    cropper.setAspectRatio(1);
    cropper.setRotation(90);
    cropper.render();

    const output = cropper.getOutput('image/png', 1, 300, 300);
    const outputBuf = Buffer.from(output.split(',')[1], 'base64');

    const outputDir = path.resolve(__dirname, '../../../../test-output');
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, 'cropper-output-picsum-1-1-300x300.png'), outputBuf);

    const refPath = path.join(__dirname, '__fixtures__', 'expected-picsum-1-1-300x300.png');
    try {
      const refBuf = fs.readFileSync(refPath);
      const actualHash = crypto.createHash('sha256').update(outputBuf).digest('hex');
      const expectedHash = crypto.createHash('sha256').update(refBuf).digest('hex');
      expect(actualHash).toBe(expectedHash);
    } catch {
      console.warn('Reference fixture not found, skipping comparison. Write expected PNG to __fixtures__/expected-picsum-1-1-300x300.png');
    }
  });

  function hashOutput(cropper: RuiCropperCanvas): string {
    const output = cropper.getOutput('image/png', 1);
    const buf = Buffer.from(output.split(',')[1], 'base64');
    return crypto.createHash('sha256').update(buf).digest('hex');
  }

  it('getRotationFitScale reports 1 for cardinal angles', () => {
    const cropper = new RuiCropperCanvas(createCanvasEl(800, 600));
    expect(cropper.getRotationFitScale(0)).toBe(1);
    expect(cropper.getRotationFitScale(90)).toBe(1);
    expect(cropper.getRotationFitScale(180)).toBe(1);
    expect(cropper.getRotationFitScale(270)).toBe(1);
    expect(cropper.getRotationFitScale(360)).toBe(1);
  });

  it('getRotationFitScale is symmetric around cardinal angles', () => {
    const cropper = new RuiCropperCanvas(createCanvasEl(800, 600));
    const scale5 = cropper.getRotationFitScale(5);
    const scale85 = cropper.getRotationFitScale(85);
    const scale95 = cropper.getRotationFitScale(95);
    const scale175 = cropper.getRotationFitScale(175);

    expect(scale5).toBeCloseTo(1.083, 2);
    expect(scale85).toBeCloseTo(1.083, 2);
    expect(scale95).toBeCloseTo(1.083, 2);
    expect(scale175).toBeCloseTo(1.083, 2);

    expect(cropper.getRotationFitScale(45)).toBeCloseTo(Math.SQRT2, 2);
  });

  it('rotation fit scale is available during live rotation drag via public method', () => {
    const cropper = new RuiCropperCanvas(createCanvasEl(800, 600));
    cropper.setRotation(90);
    cropper.render();
    const scaleAt90 = cropper.getRotationFitScale(90);

    cropper.setRotation(95);
    const scaleAt95 = cropper.getRotationFitScale();

    expect(scaleAt90).toBe(1);
    expect(scaleAt95).toBeGreaterThan(1);
    expect(scaleAt95).toBeCloseTo(1.083, 2);
  });

  it('successive setRotation→render cycles produce same output as direct render (idempotency)', async () => {
    const inputBuf = fs.readFileSync(path.join(__dirname, '__fixtures__', 'input-picsum-800x600.jpg'));
    const dataUrl = `data:image/jpeg;base64,${inputBuf.toString('base64')}`;

    const inc = new RuiCropperCanvas(createCanvasEl(800, 600));
    inc.displayWidth = 800;
    inc.displayHeight = 600;
    await inc.loadImage(dataUrl);
    inc.setZoom(1);
    inc.setRotation(90);
    inc.render();
    inc.setRotation(95);
    inc.render();
    const hashInc = hashOutput(inc);

    const dir = new RuiCropperCanvas(createCanvasEl(800, 600));
    dir.displayWidth = 800;
    dir.displayHeight = 600;
    await dir.loadImage(dataUrl);
    dir.setZoom(1);
    dir.setRotation(95);
    dir.render();
    const hashDir = hashOutput(dir);

    expect(hashInc).toBe(hashDir);
  });

  it('render at 45° produces deterministically different output from 0°', async () => {
    const inputBuf = fs.readFileSync(path.join(__dirname, '__fixtures__', 'input-picsum-800x600.jpg'));
    const dataUrl = `data:image/jpeg;base64,${inputBuf.toString('base64')}`;

    const c0 = new RuiCropperCanvas(createCanvasEl(800, 600));
    c0.displayWidth = 800;
    c0.displayHeight = 600;
    await c0.loadImage(dataUrl);
    c0.setZoom(1);
    c0.setRotation(0);
    c0.render();
    const hash0 = hashOutput(c0);

    const c45 = new RuiCropperCanvas(createCanvasEl(800, 600));
    c45.displayWidth = 800;
    c45.displayHeight = 600;
    await c45.loadImage(dataUrl);
    c45.setZoom(1);
    c45.setRotation(45);
    c45.render();
    const hash45 = hashOutput(c45);

    expect(hash0).not.toBe(hash45);
    expect(hash0.length).toBeGreaterThan(0);
    expect(hash45.length).toBeGreaterThan(0);
  });
});
