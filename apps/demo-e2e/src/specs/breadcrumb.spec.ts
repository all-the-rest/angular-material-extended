import { test, expect } from '@playwright/test';
import { DEMO_URLS } from '../fixtures/test-data';

test.describe('Breadcrumb', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(DEMO_URLS.breadcrumb);
  });

  test('should display the breadcrumb demo page', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Breadcrumb');
  });

  test('should render breadcrumb in auto mode (from route data)', async ({ page }) => {
    const autoSection = page.locator('section:has(> h2#auto-mode)');
    await expect(autoSection.locator('rui-breadcrumb')).toBeVisible();
  });

  test('should render breadcrumb in manual mode with items', async ({ page }) => {
    const manualSection = page.locator('section:has(> h2#manual-mode)');
    await expect(manualSection.locator('rui-breadcrumb')).toContainText('Home');
    await expect(manualSection.locator('rui-breadcrumb')).toContainText('Products');
    await expect(manualSection.locator('rui-breadcrumb')).toContainText('Electronics');
  });

  test('should show custom separator when specified', async ({ page }) => {
    const sepSection = page.locator('section:has(> h2#custom-separator)');
    await expect(sepSection.locator('rui-breadcrumb')).toContainText('Dashboard');
    await expect(sepSection.locator('rui-breadcrumb')).toContainText('Settings');
    await expect(sepSection.locator('rui-breadcrumb')).toContainText('Profile');
  });

  test('should render single crumb without separator', async ({ page }) => {
    const singleSection = page.locator('section:has(> h2#single-crumb)');
    await expect(singleSection.locator('rui-breadcrumb')).toContainText('Home');
  });

  test('should have aria-current="page" on single crumb', async ({ page }) => {
    const singleSection = page.locator('section:has(> h2#single-crumb)');
    await expect(singleSection.locator('[aria-current="page"]')).toBeVisible();
    await expect(singleSection.locator('[aria-current="page"]')).toContainText('Home');
  });

  test('should have clickable links in breadcrumb items', async ({ page }) => {
    const links = page.locator('rui-breadcrumb nav a');
    await expect(links.first()).toBeVisible();
  });

  test('should display configuration code block', async ({ page }) => {
    const configSection = page.locator('section:has(> h2#configuration)');
    await expect(configSection.locator('pre')).toBeVisible();
    await expect(configSection.locator('pre')).toContainText('RUI_BREADCRUMB_DEFAULT_OPTIONS');
  });

  test('should display multiple breadcrumbs on the page', async ({ page }) => {
    const breadcrumbs = page.locator('rui-breadcrumb');
    await expect(breadcrumbs.first()).toBeVisible();
    expect(await breadcrumbs.count()).toBeGreaterThanOrEqual(4);
  });
});
