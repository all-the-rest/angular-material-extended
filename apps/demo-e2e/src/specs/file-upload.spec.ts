import { test, expect } from '@playwright/test';
import { DEMO_URLS } from '../fixtures/test-data';

test.describe('File Upload', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(DEMO_URLS.fileUpload);
    const basicSection = page.locator('section').filter({ has: page.locator('h2#basic') });
    await expect(basicSection.locator('rui-file-upload')).toBeVisible();
  });

  test('should display the file upload component', async ({ page }) => {
    const basicSection = page.locator('section').filter({ has: page.locator('h2#basic') });
    await expect(basicSection.locator('rui-file-upload')).toBeVisible();
  });

  test('should have drop zone with text', async ({ page }) => {
    const basicSection = page.locator('section').filter({ has: page.locator('h2#basic') });
    await expect(basicSection.locator('rui-file-upload').getByText(/drag.*files/i)).toBeVisible();
  });

  test('should show multiple toggle', async ({ page }) => {
    const basicSection = page.locator('section').filter({ has: page.locator('h2#basic') });
    await expect(basicSection.locator('mat-slide-toggle').filter({ hasText: 'Multiple files' })).toBeVisible();
  });

  test('should open file picker on click', async ({ page }) => {
    const basicSection = page.locator('section').filter({ has: page.locator('h2#basic') });
    const fileUpload = basicSection.locator('rui-file-upload');
    const fileInput = fileUpload.locator('input[type="file"]');
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser', { timeout: 5000 }),
      fileInput.dispatchEvent('click'),
    ]);
    expect(fileChooser).not.toBeNull();
  });

  test('should accept file upload and show file in list', async ({ page }) => {
    const basicSection = page.locator('section').filter({ has: page.locator('h2#basic') });
    const fileUpload = basicSection.locator('rui-file-upload');
    const fileInput = fileUpload.locator('input[type="file"]');
    await fileInput.setInputFiles([__filename]);
    await expect(fileUpload.getByRole('button', { name: /upload starten/i })).toBeVisible({ timeout: 3000 });
  });

  test('should start upload and show progress', async ({ page }) => {
    const basicSection = page.locator('section').filter({ has: page.locator('h2#basic') });
    const fileUpload = basicSection.locator('rui-file-upload');
    const fileInput = fileUpload.locator('input[type="file"]');
    await fileInput.setInputFiles([__filename]);
    await expect(fileUpload.getByRole('button', { name: /upload starten/i })).toBeVisible({ timeout: 3000 });
    await fileUpload.getByRole('button', { name: /upload starten/i }).click();
    await expect(fileUpload.getByText(/Uploading/)).toBeVisible({ timeout: 3000 });
    await expect(fileUpload.getByText('✓')).toBeVisible({ timeout: 5000 });
  });

  test('should show file in file list after upload', async ({ page }) => {
    const basicSection = page.locator('section').filter({ has: page.locator('h2#basic') });
    const fileUpload = basicSection.locator('rui-file-upload');
    const fileInput = fileUpload.locator('input[type="file"]');
    await fileInput.setInputFiles([__filename]);
    await expect(fileUpload).toContainText('Upload', { timeout: 3000 });
  });

  test('should remove file when remove button clicked', async ({ page }) => {
    const basicSection = page.locator('section').filter({ has: page.locator('h2#basic') });
    const fileUpload = basicSection.locator('rui-file-upload');
    const fileInput = fileUpload.locator('input[type="file"]');
    await fileInput.setInputFiles([__filename]);
    await expect(fileUpload.getByRole('button', { name: /upload starten/i })).toBeVisible({ timeout: 3000 });
    await fileUpload.getByRole('button', { name: /remove/i }).click();
    await expect(fileUpload.getByRole('button', { name: /upload starten/i })).not.toBeVisible();
  });

  test('should accept multiple files when multiple mode is on', async ({ page }) => {
    const basicSection = page.locator('section').filter({ has: page.locator('h2#basic') });
    const fileUpload = basicSection.locator('rui-file-upload');
    const fileInput = fileUpload.locator('input[type="file"]');
    await fileInput.setInputFiles([__filename, __filename]);
    await expect(fileUpload.getByRole('button', { name: /2 Dateien/i })).toBeVisible({ timeout: 3000 });
  });
});
