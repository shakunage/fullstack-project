import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/NHL Games/);
});

test('navigate to games page', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Games');
  await expect(page).toHaveURL('/games');
});
