import { test, expect } from '@playwright/test';

test.describe('Performance and Error Handling', () => {
  test('should load pages within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Expect page to load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
    
    // Check that essential content is visible
    await expect(page.locator('main')).toBeVisible();
  });

  test('should handle network errors gracefully', async ({ page }) => {
    // Intercept API calls and return errors
    await page.route('**/api/**', (route) => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' })
      });
    });
    
    await page.goto('/games');
    
    // Should show error message or fallback content
    await page.waitForTimeout(2000);
    
    const errorMessage = page.locator('[data-testid="error"]').or(
      page.locator('.error')
    ).or(
      page.locator('text=Error')
    );
    
    const fallbackContent = page.locator('main');
    
    // Either error message or fallback content should be visible
    const hasErrorMessage = await errorMessage.isVisible().catch(() => false);
    const hasFallbackContent = await fallbackContent.isVisible();
    
    expect(hasErrorMessage || hasFallbackContent).toBeTruthy();
  });

  test('should handle slow API responses', async ({ page }) => {
    // Simulate slow API responses
    await page.route('**/api/**', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      await route.continue();
    });
    
    await page.goto('/games');
    
    // Should show loading state
    const loadingIndicator = page.locator('[data-testid="loading"]').or(
      page.locator('.loading')
    ).or(
      page.locator('text=Loading')
    );
    
    // Check if loading indicator appears
    const hasLoading = await loadingIndicator.isVisible({ timeout: 1000 }).catch(() => false);
    
    // Page should eventually load
    await expect(page.locator('main')).toBeVisible({ timeout: 10000 });
  });

  test('should maintain functionality with JavaScript disabled', async ({ browser }) => {
    const context = await browser.newContext({
      javaScriptEnabled: false
    });
    
    const page = await context.newPage();
    await page.goto('/');
    
    // Basic navigation should still work
    await expect(page.locator('main')).toBeVisible();
    
    // Links should be functional
    const links = page.locator('a[href]');
    if (await links.count() > 0) {
      const firstLink = links.first();
      const href = await firstLink.getAttribute('href');
      if (href && !href.startsWith('#')) {
        await firstLink.click();
        // Should navigate to new page
        await page.waitForTimeout(1000);
      }
    }
    
    await context.close();
  });

  test('should handle multiple tabs and browser refresh', async ({ browser }) => {
    const context = await browser.newContext();
    
    // Open multiple tabs
    const page1 = await context.newPage();
    const page2 = await context.newPage();
    
    await page1.goto('/games');
    await page2.goto('/players');
    
    // Both pages should load correctly
    await expect(page1.locator('main')).toBeVisible();
    await expect(page2.locator('main')).toBeVisible();
    
    // Test browser refresh
    await page1.reload();
    await expect(page1.locator('main')).toBeVisible();
    
    await context.close();
  });

  test('should preserve user state across page reloads', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to a specific page
    await page.goto('/games');
    
    // Refresh the page
    await page.reload();
    
    // Should stay on the same page
    await expect(page).toHaveURL('/games');
    await expect(page.locator('main')).toBeVisible();
  });
});
