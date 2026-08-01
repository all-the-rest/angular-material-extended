import { test, expect } from '@playwright/test';
import { DEMO_URLS } from '../fixtures/test-data';

test.describe('Date Input', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(DEMO_URLS.dateInput);
  });

  test('should display the date input demo page', async ({ page }) => {
    await expect(page.getByText('Date Input Demo (MatDatepicker)')).toBeVisible();
  });

  test('should show basic date input with YYYY-MM-dd format', async ({ page }) => {
    await expect(page.locator('#basic')).toBeVisible();
    await expect(page.getByLabel('Date (YYYY-MM-dd)')).toBeVisible();
  });

  test('should show format override section with three different format fields', async ({ page }) => {
    await expect(page.locator('#format-override')).toBeVisible();
    const formatCard = page.locator('h2#format-override ~ mat-card').first();
    await expect(formatCard).toContainText('dd.MM.YYYY');
    await expect(formatCard).toContainText('MM/dd/YYYY');
    await expect(formatCard).toContainText('YYYY/MM/dd');
  });

  test('should show reactive forms section with date input', async ({ page }) => {
    await expect(page.locator('#reactive-forms')).toBeVisible();
  });

  test('should display Enable/Disable button in reactive forms section', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Enable|Disable/ }).first()).toBeVisible();
  });

  test('should display "Set to 2026-12-24" button in reactive forms section', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Set to 2026-12-24' })).toBeVisible();
  });

  test('should show signal form section', async ({ page }) => {
    await expect(page.locator('#signal-form')).toBeVisible();
  });

  test('should show global config section with default format', async ({ page }) => {
    await expect(page.locator('#global-config')).toBeVisible();
  });

  test('should type a date in the basic YYYY-MM-dd field and see value displayed', async ({ page }) => {
    const input = page.getByLabel('Date (YYYY-MM-dd)');
    await input.fill('20260722');
    const basicSection = page.locator('section').filter({ has: page.locator('#basic') });
    await expect(basicSection.getByText('Value:')).toBeVisible({ timeout: 5000 });
  });

  test('should show datepicker toggle buttons on date inputs', async ({ page }) => {
    const toggles = page.locator('mat-datepicker-toggle');
    await expect(toggles.first()).toBeVisible();
    const count = await toggles.count();
    expect(count).toBeGreaterThanOrEqual(6);
  });
});
