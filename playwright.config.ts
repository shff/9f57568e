import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://localhost:4173/",
    trace: "on",
  },
  webServer: {
    command: "yarn preview",
    url: "http://localhost:4173/",
  },
});
