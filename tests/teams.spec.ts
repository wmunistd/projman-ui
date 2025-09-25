import { test, expect } from '@playwright/test';

test('create team via UI and see in list', async ({ page }) => {
  await page.goto('/teams');

  await page.getByPlaceholder('Team name').fill('E2E Team');
  await page.getByPlaceholder('Description').fill('Test team');
  await page.getByRole('button', { name: 'Create' }).click();

  await expect(page.getByText('E2E Team')).toBeVisible();
});
