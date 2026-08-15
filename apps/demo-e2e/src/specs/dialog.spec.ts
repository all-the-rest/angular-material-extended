import { test, expect } from '@playwright/test';
import { DEMO_URLS } from '../fixtures/test-data';

test.describe('Dialog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(DEMO_URLS.dialog);
    await page.waitForLoadState('networkidle');
  });

  test('should display the dialog demo', async ({ page }) => {
    await expect(page.locator('h1').filter({ hasText: /Dialog/ })).toBeVisible();
  });

  test('should open and close md dialog', async ({ page }) => {
    await page.getByRole('button', { name: 'Open md Dialog' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('should open all sizes sequentially', async ({ page }) => {
    for (const size of ['sm', 'md', 'lg', 'xl']) {
      await page.getByLabel('Dialog size').getByText(size, { exact: true }).click();
      await page.getByRole('button', { name: `Open ${size} Dialog` }).click();
      await expect(page.getByRole('dialog')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.getByRole('dialog')).not.toBeVisible();
    }
  });

  test('should open custom dialog with custom title', async ({ page }) => {
    await page.keyboard.press('Escape');
    const customCard = page.locator('h2#dialog-custom ~ mat-card').first();
    await customCard.getByLabel('Title').fill('Custom E2E Title');
    await customCard.getByRole('button', { name: 'Open Custom' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Custom E2E Title')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('should open fullscreen dialog', async ({ page }) => {
    await page.getByRole('button', { name: 'Fullscreen' }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Fullscreen Dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('should open non-dismissible dialog (cannot close by escape/backdrop)', async ({ page }) => {
    await page.getByRole('button', { name: 'Non-dismissible' }).first().click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).toBeVisible();
    await page.getByRole('button', { name: 'Confirm & Close' }).click();
    await expect(dialog).not.toBeVisible();
  });

  test('should close dialog on escape key', async ({ page }) => {
    await page.getByRole('button', { name: 'Open md Dialog' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });
});
