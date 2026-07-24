import { test, expect } from '@playwright/test';
import { DEMO_URLS } from '../fixtures/test-data';

test.describe('Cropper', () => {
  test.use({ actionTimeout: 15000 });

  test.beforeEach(async ({ page }) => {
    await page.goto(DEMO_URLS.cropper);
  });

  test('should display the cropper component', async ({ page }) => {
    await expect(page.locator('section:has(#basic-cropper) rui-cropper')).toBeAttached();
  });

  test('should have zoom controls with default zoom level', async ({ page }) => {
    await page.waitForSelector('section:has(#basic-cropper) canvas', { timeout: 15000 });
    await expect(page.locator('section:has(#basic-cropper) [aria-label="Zoom in"]')).toBeVisible();
    await expect(page.locator('section:has(#basic-cropper) [aria-label="Zoom out"]')).toBeVisible();
    const zoomText = page.locator('section:has(#basic-cropper) rui-cropper').locator('text=/\\d+%/');
    await expect(zoomText).toBeVisible();
  });

  test('should have rotate controls', async ({ page }) => {
    await page.waitForSelector('section:has(#basic-cropper) canvas', { timeout: 15000 });
    await expect(page.locator('section:has(#basic-cropper) [aria-label="Rotate left 90°"]')).toBeVisible();
    await expect(page.locator('section:has(#basic-cropper) [aria-label="Rotate right 90°"]')).toBeVisible();
    await expect(page.locator('section:has(#basic-cropper) [aria-label="Fine rotation"]')).toBeVisible();
  });

  test('should have aspect ratio selector', async ({ page }) => {
    await page.waitForSelector('section:has(#free-aspect) canvas', { timeout: 15000 });
    await expect(page.locator('section:has(#free-aspect)').getByLabel('Aspect ratio')).toBeVisible();
  });

  test('should display cropped output after image loads', async ({ page }) => {
    await expect(page.locator('rui-cropper').first()).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(2000);
    await expect(page.locator('rui-cropper canvas').first()).toBeAttached({ timeout: 10000 });
  });

  test('should show error message on invalid image URL', async ({ page }) => {
    await page.locator('section:has(#error-state)').getByRole('button', { name: 'Invalid Image' }).click();
    const errorText = page.locator('section:has(#error-state)').getByText('Failed to load image');
    await expect(errorText).toBeVisible({ timeout: 10000 });
  });

  test('should change zoom level on zoom in click', async ({ page }) => {
    await page.waitForSelector('section:has(#basic-cropper) canvas', { timeout: 15000 });
    const zoomDisplay = page.locator('section:has(#basic-cropper) rui-cropper').locator('text=/\\d+%/');
    const initialText = await zoomDisplay.textContent();
    const initialZoom = parseInt(initialText ?? '100', 10);

    await page.locator('section:has(#basic-cropper) [aria-label="Zoom in"]').click();
    await page.waitForTimeout(300);
    const afterText = await zoomDisplay.textContent();
    const afterZoom = parseInt(afterText ?? '100', 10);
    expect(afterZoom).toBeGreaterThan(initialZoom);
  });

  test('should change zoom level on zoom out click', async ({ page }) => {
    await page.waitForSelector('section:has(#basic-cropper) canvas', { timeout: 15000 });
    const zoomDisplay = page.locator('section:has(#basic-cropper) rui-cropper').locator('text=/\\d+%/');
    const initialText = await zoomDisplay.textContent();
    const initialZoom = parseInt(initialText ?? '100', 10);

    await page.locator('section:has(#basic-cropper) [aria-label="Zoom out"]').click();
    await page.waitForTimeout(300);
    const afterText = await zoomDisplay.textContent();
    const afterZoom = parseInt(afterText ?? '100', 10);
    expect(afterZoom).toBeLessThan(initialZoom);
  });

  test('should change rotation on rotate right click', async ({ page }) => {
    await page.waitForSelector('section:has(#basic-cropper) canvas', { timeout: 15000 });
    const cropper = page.locator('section:has(#basic-cropper) rui-cropper');
    const rotationText = cropper.locator('span').filter({ hasText: /\/ \d+°/ });
    await expect(rotationText).toBeAttached();
    const initialText = await rotationText.textContent();
    const initialRotation = parseInt(initialText?.replace('/ ', '').replace('°', '') ?? '0', 10);

    await page.locator('section:has(#basic-cropper) [aria-label="Rotate right 90°"]').click();
    await page.waitForTimeout(300);

    const afterText = await rotationText.textContent();
    const afterRotation = parseInt(afterText?.replace('/ ', '').replace('°', '') ?? '0', 10);
    expect(afterRotation).toBe((initialRotation + 90) % 360);
  });

  test('should change rotation on rotate left click', async ({ page }) => {
    await page.waitForSelector('section:has(#basic-cropper) canvas', { timeout: 15000 });
    const cropper = page.locator('section:has(#basic-cropper) rui-cropper');
    const rotationText = cropper.locator('span').filter({ hasText: /\/ \d+°/ });
    await expect(rotationText).toBeAttached();
    const initialText = await rotationText.textContent();
    const initialRotation = parseInt(initialText?.replace('/ ', '').replace('°', '') ?? '0', 10);

    await page.locator('section:has(#basic-cropper) [aria-label="Rotate left 90°"]').click();
    await page.waitForTimeout(300);

    const afterText = await rotationText.textContent();
    const afterRotation = parseInt(afterText?.replace('/ ', '').replace('°', '') ?? '0', 10);
    expect(afterRotation).toBe((initialRotation - 90 + 360) % 360);
  });

  test('should change aspect ratio via select dropdown', async ({ page }) => {
    await page.waitForSelector('section:has(#free-aspect) canvas', { timeout: 15000 });
    const aspectSelect = page.locator('section:has(#free-aspect)').getByLabel('Aspect ratio');
    await expect(aspectSelect).toBeAttached();
    await aspectSelect.selectOption('16:9');
    await expect(aspectSelect).toHaveValue('16:9');
    await aspectSelect.selectOption('4:3');
    await expect(aspectSelect).toHaveValue('4:3');
    await aspectSelect.selectOption('1:1');
    await expect(aspectSelect).toHaveValue('1:1');
    await aspectSelect.selectOption('free');
    await expect(aspectSelect).toHaveValue('free');
  });

  test('should still show cropped output after aspect ratio change', async ({ page }) => {
    await page.waitForSelector('section:has(#free-aspect) canvas', { timeout: 15000 });
    const aspectSelect = page.locator('section:has(#free-aspect)').getByLabel('Aspect ratio');
    await expect(aspectSelect).toBeAttached();
    await aspectSelect.selectOption('4:3');
    await page.waitForTimeout(300);
    const croppedImg = page.locator('section:has(#free-aspect) img[alt="Free crop output"]');
    await expect(croppedImg).toBeVisible({ timeout: 5000 });
  });

  test('should support keyboard navigation for crop movement', async ({ page }) => {
    await page.waitForSelector('section:has(#basic-cropper) canvas', { timeout: 15000 });
    await page.locator('section:has(#basic-cropper) rui-cropper').focus();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowUp');
    const croppedImg = page.locator('section:has(#basic-cropper) img[alt="Cropped preview"]');
    await expect(croppedImg).toBeVisible({ timeout: 5000 });
  });

});
