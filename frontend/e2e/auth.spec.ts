import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should display login form with proper fields', async ({ page }) => {
    await page.goto('/login');
    
    // Check page title and heading
    await expect(page).toHaveTitle(/NHL Games/);
    await expect(page.locator('h1')).toContainText('Login');
    
    // Verify form fields are present
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    
    // Check for proper labels/placeholders
    await expect(page.locator('label')).toContainText(['E-mail', 'Password']);
  });

  test('should display signup form with proper fields', async ({ page }) => {
    await page.goto('/signup');
    
    // Check page title and heading
    await expect(page).toHaveTitle(/NHL Games/);
    await expect(page.locator('h1')).toContainText('Signup');
    
    // Verify form fields are present
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should show validation errors for empty login form', async ({ page }) => {
    await page.goto('/login');
    
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Wait for the validation message to appear
    await page.waitForSelector('div:has-text("required")');
    
    // Check for validation messages
    await expect(page.locator('div:has-text("required")').first()).toBeVisible();
  });

  test('should show validation errors for empty signup form', async ({ page }) => {
    await page.goto('/signup');
    
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Wait for the validation message to appear
    await page.waitForSelector('div:has-text("required")');
    
    // Check for validation messages
    await expect(page.locator('div:has-text("required")').first()).toBeVisible();
  });

  test('should navigate between login and signup pages', async ({ page }) => {
    await page.goto('/login');
    
    // Look for link to signup (adjust selector based on your implementation)
    const signupLink = page.locator('a[href="/signup"]');
    if (await signupLink.isVisible()) {
      await signupLink.click();
      await expect(page).toHaveURL('/signup');
      await expect(page.locator('h1')).toContainText('Signup');
    }
  });
});
