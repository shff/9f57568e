/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        theme_color: "#000000",
        scope: "/",
        start_url: "/",
        name: "Comments App",
      },
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ["**/*"],
      },
      includeAssets: ["**/*"],
    }),
  ],
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.spec.{ts,tsx}"],
    coverage: {
      include: ["src/**/*", "!**/types.ts"],
    },
  },
});
