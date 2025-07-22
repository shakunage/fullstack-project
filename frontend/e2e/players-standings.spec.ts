import { test, expect } from '@playwright/test';

test.describe('Players and Standings', () => {
  test('should load players page with skaters and goalies navigation', async ({ page }) => {
    await page.goto('/players');
    
    await expect(page).toHaveTitle(/NHL Games/);
    await page.waitForLoadState('networkidle');
    
    // Check main content is visible
    await expect(page.locator('main')).toBeVisible();
    
    // Hover over the "Players" link to reveal the dropdown
    await page.locator('a:has-text("Players")').hover();
    
    // Wait for the "Skaters" link to be visible and then click it
    const skatersLink = page.locator('a:has-text("Skaters")');
    await skatersLink.waitFor({ state: 'visible' });
    await skatersLink.click();
    
    // Verify the URL
    await expect(page).toHaveURL('/players/skaters/');
  });

  test('should navigate to goalies page', async ({ page }) => {
    await page.goto('/players/goalies');
    
    await expect(page).toHaveTitle(/NHL Games/);
    await page.waitForLoadState('networkidle');
    
    // Verify goalies page content
    await expect(page.locator('main')).toBeVisible();
  });

  test('should load standings page', async ({ page }) => {
    await page.goto('/standings');
    
    await expect(page).toHaveTitle(/NHL Games/);
    await page.waitForLoadState('networkidle');
    
    // Check for standings content
    await expect(page.locator('main')).toBeVisible();
    
    // Look for typical standings elements (adjust based on implementation)
    const standingsTable = page.locator('table').or(
      page.locator('[data-testid="standings-table"]')
    ).or(
      page.locator('.standings')
    );
    
    // Wait a bit for data to potentially load
    await page.waitForTimeout(2000);
  });

  test('should handle standings by date', async ({ page }) => {
    await page.goto('/standings');
    
    // Test date navigation if available
    const datePicker = page.locator('input[type="date"]').or(
      page.locator('[data-testid="date-picker"]')
    );
    
    if (await datePicker.isVisible()) {
      await datePicker.fill('2024-01-15');
      await expect(page).toHaveURL(/\/standings\/2024-01-15/);
    }
  });

  test('should handle data loading and error states', async ({ page }) => {
    // Test players page error handling
    await page.goto('/players');
    
    // Check for error messages or empty states
    const errorMessage = page.locator('[data-testid="error"]').or(
      page.locator('.error')
    ).or(
      page.locator('text=Error')
    );
    
    const emptyState = page.locator('[data-testid="empty"]').or(
      page.locator('.empty')
    ).or(
      page.locator('text=No data')
    );
    
    // Wait for page to settle
    await page.waitForTimeout(3000);
    
    // Verify that either content loaded or appropriate message is shown
    const hasContent = await page.locator('main').isVisible();
    const hasError = await errorMessage.isVisible().catch(() => false);
    const hasEmptyState = await emptyState.isVisible().catch(() => false);
    
    expect(hasContent || hasError || hasEmptyState).toBeTruthy();
  });
});
