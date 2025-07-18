import { test, expect } from '@playwright/test';

test.describe('Games Page', () => {
  test('should load games page and display content', async ({ page }) => {
    await page.goto('/games');
    
    // Check page loads correctly
    await expect(page).toHaveTitle(/NHL Games/);
    
    // Wait for content to load (adjust timeout as needed)
    await page.waitForLoadState('networkidle');
    
    // Check for common elements that should be present
    // (adjust selectors based on your actual implementation)
    const gamesContainer = page.locator('[data-testid="games-container"]').or(
      page.locator('.games-list')
    ).or(
      page.locator('main')
    );
    await expect(gamesContainer).toBeVisible();
  });

  test('should navigate to specific date games', async ({ page }) => {
    await page.goto('/games');
    
    // Test date navigation if date picker exists
    const datePicker = page.locator('input[type="date"]').or(
      page.locator('[data-testid="date-picker"]')
    );
    
    if (await datePicker.isVisible()) {
      await datePicker.fill('2024-01-15');
      await expect(page).toHaveURL(/\/games\/2024-01-15/);
    }
  });

  test('should display favorite games page', async ({ page }) => {
    await page.goto('/games/favoritegames');
    
    await expect(page).toHaveTitle(/NHL Games/);
    
    // Check for favorite games content
    const favoritesContainer = page.locator('[data-testid="favorites-container"]').or(
      page.locator('main')
    );
    await expect(favoritesContainer).toBeVisible();
  });

  test('should handle individual game page navigation', async ({ page }) => {
    await page.goto('/games');
    
    // Look for game links (adjust selector based on your implementation)
    const gameLinks = page.locator('a[href*="/game/"]');
    const gameCount = await gameLinks.count();
    
    if (gameCount > 0) {
      // Click on first game link
      const firstGameLink = gameLinks.first();
      const href = await firstGameLink.getAttribute('href');
      await firstGameLink.click();
      
      if (href) {
        await expect(page).toHaveURL(href);
        // Verify game details page loaded
        await expect(page.locator('main')).toBeVisible();
      }
    }
  });

  test('should handle loading states gracefully', async ({ page }) => {
    await page.goto('/games');
    
    // Check for loading indicators (adjust based on your implementation)
    const loadingIndicator = page.locator('[data-testid="loading"]').or(
      page.locator('.loading')
    ).or(
      page.locator('text=Loading')
    );
    
    // If loading indicator exists, wait for it to disappear
    if (await loadingIndicator.isVisible({ timeout: 1000 }).catch(() => false)) {
      await expect(loadingIndicator).not.toBeVisible({ timeout: 10000 });
    }
    
    // Ensure main content is visible after loading
    await expect(page.locator('main')).toBeVisible();
  });
});
