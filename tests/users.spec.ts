import { test, expect } from '@playwright/test';

test('create user via UI and see in list', async ({ page }) => {
  await page.goto('/users');

  await page.getByPlaceholder('Full name').fill('E2E User');
  await page.getByPlaceholder('CPF').fill('12345678901');
  await page.getByPlaceholder('Email').fill('e2e@example.com');
  await page.getByPlaceholder('Job title').fill('Tester');
  await page.getByPlaceholder('Username').fill('e2euser');
  await page.getByPlaceholder('Password').fill('secret123');
  await page.getByRole('button', { name: 'Create' }).click();

  await expect(page.getByText('E2E User')).toBeVisible();
});
