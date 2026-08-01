import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env['CI'];

export default defineConfig({
  testDir: './src/specs',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 4 : 8,
  reporter: isCI
    ? [
        ['github'],
        ['html', { outputFolder: 'playwright-report' }],
        ['json', { outputFile: 'e2e-results.json' }],
      ]
    : [['html', { outputFolder: 'playwright-report' }]],
  use: {
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'chromium-mobile',
      use: { ...devices['Pixel 5'] },
    },
  ],
  ...(isCI ? {
    webServer: {
      command: 'node src/serve-spa.mjs',
      url: 'http://localhost:4200',
      reuseExistingServer: false,
      timeout: 30000,
    },
  } : {}),
});
