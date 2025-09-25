import { test, expect } from '@playwright/test';

test('create task and move across columns', async ({ page }) => {
  await page.goto('/board');

  await page.getByPlaceholder('New task title').fill('E2E Task');
  await page.getByRole('button', { name: 'Add Task' }).click();
  await expect(page.getByText('E2E Task')).toBeVisible();

  await page.getByRole('button', { name: 'Move to In Progress' }).first().click();
  await page.getByRole('button', { name: 'Move to Done' }).first().click();

  await expect(page.getByText('E2E Task')).toBeVisible();
});
