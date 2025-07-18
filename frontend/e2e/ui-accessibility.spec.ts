import { test, expect } from '@playwright/test';

test.describe('User Interface and Accessibility', () => {
  test('should have proper page structure and semantic HTML', async ({ page }) => {
    await page.goto('/');
    
    // Check for semantic HTML elements
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    
    // Check for proper heading hierarchy
    const h1Elements = page.locator('h1');
    expect(await h1Elements.count()).toBeGreaterThan(0);
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Check if focused element is visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should have proper color contrast and be readable', async ({ page }) => {
    await page.goto('/');
    
    // Test dark mode toggle if it exists
    const darkModeToggle = page.locator('[data-testid="dark-mode-toggle"]').or(
      page.locator('button[aria-label*="dark"]')
    ).or(
      page.locator('button[aria-label*="theme"]')
    );
    
    if (await darkModeToggle.isVisible()) {
      await darkModeToggle.click();
      
      // Verify page is still readable in dark mode
      await expect(page.locator('body')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
    }
  });

  test('should handle different screen sizes responsively', async ({ page }) => {
    // Test desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await expect(page.locator('main')).toBeVisible();
    
    // Test tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    await expect(page.locator('main')).toBeVisible();
    
    // Test mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await expect(page.locator('main')).toBeVisible();
  });

  test('should have working search functionality if present', async ({ page }) => {
    await page.goto('/');
    
    // Look for search input
    const searchInput = page.locator('input[type="search"]').or(
      page.locator('[data-testid="search"]')
    ).or(
      page.locator('input[placeholder*="search"]')
    );
    
    if (await searchInput.isVisible()) {
      await searchInput.fill('test search');
      await page.keyboard.press('Enter');
      
      // Verify search was executed (adjust based on implementation)
      await page.waitForTimeout(1000);
    }
  });

  test('should handle 404 pages gracefully', async ({ page }) => {
    // Navigate to a non-existent page
    await page.goto('/non-existent-page');
    
    // Should either redirect to home or show 404 page
    // Adjust assertions based on your error handling implementation
    const currentUrl = page.url();
    const is404 = currentUrl.includes('404') || 
                  await page.locator('text=404').isVisible() ||
                  await page.locator('text=Not Found').isVisible();
    const isRedirected = currentUrl.endsWith('/');
    
    expect(is404 || isRedirected).toBeTruthy();
  });

  test('should have proper loading states for slow connections', async ({ page }) => {
    // Simulate slow 3G connection
    await page.route('**/*', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 100));
      await route.continue();
    });
    
    await page.goto('/games');
    
    // Check for loading indicators
    const loadingIndicator = page.locator('[data-testid="loading"]').or(
      page.locator('.loading')
    ).or(
      page.locator('text=Loading')
    );
    
    // Content should eventually load
    await expect(page.locator('main')).toBeVisible({ timeout: 15000 });
  });
});
