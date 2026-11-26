import { defineConfig } from "@playwright/test"

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 60000,
  expect: { timeout: 10000 },
  workers: 2,
  reporter: "list",
  use: {
    baseURL: process.env.TING_TEST_URL ?? "http://localhost:4317",
    channel: "chrome",
    viewport: { width: 390, height: 844 },
    launchOptions: {
      args: [
        "--use-fake-device-for-media-stream",
        "--use-fake-ui-for-media-stream",
      ],
    },
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: process.env.TING_TEST_URL
    ? undefined
    : {
        command: "npm run start -- -p 4317",
        url: "http://localhost:4317",
        reuseExistingServer: false,
        timeout: 30000,
      },
})
