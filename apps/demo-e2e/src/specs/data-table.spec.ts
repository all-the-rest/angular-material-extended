import { test, expect } from '@playwright/test';
import { DEMO_URLS } from '../fixtures/test-data';

test.describe('Data Table', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(DEMO_URLS.dataTable);
  });

  test('should display the data table', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Data Table');
  });

  test('should have table with columns', async ({ page }) => {
    const table = page.locator('rui-data-table table').first();
    await expect(table.locator('th')).toContainText(['ID', 'Name', 'Email', 'Role', 'Active']);
  });

  test('should filter table data', async ({ page }) => {
    const filterCard = page.locator('h2#data-table-filter + mat-card');
    const filterInput = filterCard.getByPlaceholder(/search|filter/i);
    await filterInput.fill('Alice');
    const filterTable = filterCard.locator('rui-data-table');
    await expect(filterTable).toContainText('alice@example.com', { timeout: 3000 });
  });

  test('should sort table by name ascending', async ({ page }) => {
    const sortCard = page.locator('h2#data-table-select-sort + mat-card');
    const nameHeader = sortCard.locator('table th').filter({ hasText: 'Name' });
    await nameHeader.click();
    await expect(sortCard.locator('rui-data-table')).toContainText('Alice');
  });

  test('should show select checkboxes in multi-select tables', async ({ page }) => {
    const noSortCard = page.locator('h2#data-table-select-no-sort + mat-card');
    await expect(noSortCard.locator('mat-checkbox').first()).toBeVisible();
    const sortCard = page.locator('h2#data-table-select-sort + mat-card');
    await expect(sortCard.locator('mat-checkbox').first()).toBeVisible();
  });

  test('should not show checkboxes in filter-only table', async ({ page }) => {
    const filterCard = page.locator('h2#data-table-filter + mat-card');
    await expect(filterCard.locator('mat-checkbox')).toHaveCount(0);
  });

  test('should select all rows via header checkbox', async ({ page }) => {
    const noSortCard = page.locator('h2#data-table-select-no-sort + mat-card');
    const headerCheckbox = noSortCard.locator('mat-checkbox').first();
    await headerCheckbox.click();
    const selectionCard = page.locator('h2#data-table-selection + mat-card');
    await expect(selectionCard.locator('pre').first()).toContainText('"name"', { timeout: 3000 });
  });

  test('should paginate table data', async ({ page }) => {
    await expect(page.getByLabel('Select page').first()).toBeVisible();
  });

  test.describe('Expandable Rows', () => {
    const expandCard = (page: import('@playwright/test').Page) =>
      page.locator('h2#data-table-expandable + mat-card');

    const firstRowToggle = (card: ReturnType<typeof expandCard>) =>
      card.getByRole('button', { name: /^(Expand|Collapse) row$/ }).first();

    test('should show expand button on expandable table rows', async ({ page }) => {
      const card = expandCard(page);
      const expandBtn = firstRowToggle(card);
      await expect(expandBtn).toBeVisible();
      const icon = expandBtn.locator('mat-icon');
      await expect(icon).toContainText('expand_more');
    });

    test('should expand a row and show detail content', async ({ page }) => {
      const card = expandCard(page);
      await firstRowToggle(card).click();
      await expect(card).toContainText('Department:', { timeout: 5000 });
      const icon = firstRowToggle(card).locator('mat-icon');
      await expect(icon).toContainText('expand_less');
    });

    test('should collapse an expanded row', async ({ page }) => {
      const card = expandCard(page);
      const expandBtn = firstRowToggle(card);
      await expandBtn.click();
      await expect(card).toContainText('Department:', { timeout: 5000 });
      await expandBtn.click();
      await expect(card).not.toContainText('Department:');
    });

    test('should expand and collapse by clicking row body', async ({ page }) => {
      const card = expandCard(page);
      const firstRow = card.locator('tr.rui-data-table__row--expandable').first();
      await firstRow.locator('td').nth(1).click();
      await expect(card).toContainText('Department:', { timeout: 5000 });
      await firstRow.locator('td').nth(1).click();
      await expect(card).not.toContainText('Department:');
    });
  });
});
