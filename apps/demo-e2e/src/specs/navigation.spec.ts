import { test, expect } from '@playwright/test';
import { DEMO_URLS } from '../fixtures/test-data';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(DEMO_URLS.navigation);
  });

  test('should display the navigation demo page', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Navigation');
  });

  test('should render breadcrumb overview section', async ({ page }) => {
    const section = page.locator('section:has(> h2#breadcrumb-overview)');
    await expect(section).toBeVisible();
    await expect(section.locator('rui-breadcrumb')).toBeVisible();
  });

  test('should render on-this-page section', async ({ page }) => {
    const section = page.locator('section:has(> h2#on-this-page)');
    await expect(section).toBeVisible();
  });

  test('should show configuration code block', async ({ page }) => {
    const section = page.locator('section:has(> h2#on-this-page-config)');
    await expect(section.locator('pre')).toBeVisible();
  });

  test('should have link to full breadcrumb demo', async ({ page }) => {
    const link = page.locator('a[routerLink="/breadcrumb"]');
    await expect(link).toBeVisible();
    await expect(link).toContainText('full Breadcrumb demo');
  });
});
