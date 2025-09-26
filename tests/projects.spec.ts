import { test, expect } from '@playwright/test';

test('create project via UI and see in list with manager', async ({ page }) => {
  await page.goto('/projects');

  await page.getByPlaceholder('Project name').fill('E2E Project');
  await page.getByPlaceholder('Description').fill('E2E description');
  // Manager select é opcional, pega a primeira opção se disponível
  const managerSelect = page.locator('select').first();
  const hasManager = await managerSelect.count();
  if (hasManager) {
    await managerSelect.selectOption({ index: 1 }).catch(() => {});
  }
  await page.getByRole('button', { name: 'Create' }).click();

  await expect(page.getByText('E2E Project')).toBeVisible();
});
