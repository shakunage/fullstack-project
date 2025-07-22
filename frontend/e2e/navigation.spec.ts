import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to all main pages from home', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation to Games
    await page.click('text=Games');
    await expect(page).toHaveURL('/games');
    await page.goBack();
    
    // Test navigation to Standings
    await page.click('text=Standings');
    await expect(page).toHaveURL('/standings');
    await page.goBack();
    
    // Test navigation to Skaters
    await page.click('text=Players');
    await page.click('text=Skaters');
    await expect(page).toHaveURL('/players/skaters');
    await page.goBack();

    // Test navigation to Goalies
    await page.click('text=Players');
    await page.click('text=Goalies');
    await expect(page).toHaveURL('/players/goalies');
    await page.goBack();
    
    // Test navigation to Standings
    await page.click('text=Standings');
    await expect(page).toHaveURL('/standings');
    await page.goBack();
    
  });

  test('should have working footer navigation', async ({ page }) => {
    await page.goto('/');
    
    // Test About page
    const aboutLink = page.locator('a[href="/about"]');
    if (await aboutLink.isVisible()) {
      await aboutLink.click();
      await expect(page).toHaveURL('/about');
      await page.goBack();
    }
    
    // Test Contact page
    const contactLink = page.locator('a[href="/contact"]');
    if (await contactLink.isVisible()) {
      await contactLink.click();
      await expect(page).toHaveURL('/contact');
    }
  });

  test('should handle browser back and forward navigation', async ({ page }) => {
    await page.goto('/');
    
    // Navigate through several pages
    await page.click('text=Games');
    await expect(page).toHaveURL('/games');
    
    await page.click('text=Players');
    await page.click('text=Skaters');
    await expect(page).toHaveURL('/players/skaters');
    
    // Test browser back button
    await page.goBack();
    await expect(page).toHaveURL('/games');
    
    await page.goBack();
    await expect(page).toHaveURL('/');
    
    // Test browser forward button
    await page.goForward();
    await expect(page).toHaveURL('/games');
  });

  test('should have responsive navigation menu', async ({ page }) => {
    // Test on mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check if mobile menu toggle exists (adjust selector based on your implementation)
    const mobileMenuButton = page.locator('[data-testid="mobile-menu-button"]').or(
      page.locator('button[aria-label*="menu"]')
    );
    
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      // Verify menu items are visible
      await expect(page.locator('text=Games')).toBeVisible();
      await expect(page.locator('text=Players')).toBeVisible();
      await expect(page.locator('text=Standings')).toBeVisible();
    }
  });
});
