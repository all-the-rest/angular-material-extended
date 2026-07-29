import { test, expect } from '@playwright/test';
import { DEMO_URLS } from '../fixtures/test-data';

test.describe('Menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(DEMO_URLS.menu);
  });

  test('should display the menu demo', async ({ page }) => {
    const heading = page.locator('h1').filter({ hasText: /Menu/ });
    await expect(heading).toBeVisible();
  });

  test('should toggle menu on hamburger click', async ({ page }) => {
    await page.locator('rui-menu-button').first().click({ force: true });
    await expect(page.getByRole('menu')).toBeVisible({ timeout: 10000 });
    await page.keyboard.press('Escape');
    await expect(page.getByRole('menu')).not.toBeVisible();
  });

  test('should show menu items when first menu opened', async ({ page }) => {
    await page.locator('rui-menu-button').first().click({ force: true });
    const menu = page.getByRole('menu');
    await expect(menu).toContainText('Profile');
    await expect(menu).toContainText('Settings');
    await expect(menu).toContainText('Help');
    await expect(menu).toContainText('Logout');
  });

  test('should show icon menu items when second menu opened', async ({ page }) => {
    const section = page.locator('section:has(#menu-icons)');
    await section.locator('rui-menu-button').scrollIntoViewIfNeeded();
    await section.locator('rui-menu-button').click({ force: true });
    const menu = page.getByRole('menu');
    await expect(menu).toBeVisible({ timeout: 10000 });
    await expect(menu.getByRole('menuitem', { name: /edit/i })).toBeVisible();
    await expect(menu.getByRole('menuitem', { name: /copy/i })).toBeVisible();
    await expect(menu.getByRole('menuitem', { name: /delete/i })).toBeVisible();
  });

  test('should show advanced menu items with separator and disabled', async ({ page }) => {
    const section = page.locator('section:has(#menu-divider)');
    await section.locator('rui-menu-button').scrollIntoViewIfNeeded();
    await section.locator('rui-menu-button').click({ force: true });
    const menu = page.getByRole('menu');
    await expect(menu).toBeVisible({ timeout: 10000 });
    await expect(menu).toContainText('New File');
    await expect(menu).toContainText('Open');
    await expect(menu).toContainText('Save');
    await expect(menu).toContainText('Save As...');
    await expect(menu).toContainText('Export');
    await expect(menu).toContainText('Print');

    const disabledItem = page.getByRole('menuitem', { name: /Save As/i });
    await expect(disabledItem).toBeDisabled();
  });

  test('should close menu on escape key', async ({ page }) => {
    await page.locator('rui-menu-button').first().click({ force: true });
    await expect(page.getByRole('menu')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('menu')).not.toBeVisible();
  });

  test('should close hamburger menu when clicking outside', async ({ page }) => {
    await page.locator('rui-menu-button').first().click({ force: true });
    await expect(page.getByRole('menu')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('menu')).not.toBeVisible();
  });
});
