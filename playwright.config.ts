import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  reporter: 'list',
  globalSetup: './tests/global-setup.ts',
  webServer: [
    {
      command: 'bash -lc "cd ../prova-A3 && PROJMAN_PORT=18080 ./dev-test-db"',
      port: 18080,
      reuseExistingServer: false,
      timeout: 60_000,
    },
    {
      command: 'bash -lc "VITE_API_URL=http://localhost:18080 npm run dev"',
      port: 5173,
      reuseExistingServer: false,
      timeout: 60_000,
    },
  ],
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    trace: 'off',
    video: 'off',
    screenshot: 'off',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
