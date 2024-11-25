import { test, expect } from "@playwright/test";

test("creates nested comments that persist", async ({ page }) => {
  await page.goto("/");

  await page.click("text=💬");
  await page.fill("textarea", "Hello, World!");
  await page.click("text=Add Comment");

  await expect(page.locator("text=Hello, World!")).toBeVisible();

  await page.click("text=↩️");
  await page.fill('textarea[placeholder="Add a reply..."]', "Hello, Reply!");
  await page.click("text=Add Reply");

  await expect(page.locator("text=Hello, Reply!")).toBeVisible();

  await page.reload();

  await page.click("text=💬");
  await expect(page.locator("text=Hello, World!")).toBeVisible();
  await expect(page.locator("text=Hello, Reply!")).toBeVisible();
});

test("it syncs comments between tabs", async ({ page, context }) => {
  const page1 = await context.newPage();
  const page2 = await context.newPage();

  await page1.goto("/");
  await page2.goto("/");

  await page2.click("text=💬");

  await page1.click("text=💬");
  await page1.fill("textarea", "Hello, World!");
  await page1.click("text=Add Comment");

  await page2.waitForSelector("text=Hello, World!");

  await page1.click("text=↩️");
  await page1.fill('textarea[placeholder="Add a reply..."]', "Hello, Reply!");
  await page1.click("text=Add Reply");

  await page2.waitForSelector("text=Hello, Reply!");
});
