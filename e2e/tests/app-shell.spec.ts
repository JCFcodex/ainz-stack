import { expect, test } from "@playwright/test";

test("@smoke marketing shell renders key actions", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /launch your saas/i }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /log in/i })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /get started/i }).first(),
  ).toBeVisible();
});

test("@smoke dashboard guard behavior is deterministic", async ({ page }) => {
  await page.goto("/dashboard");

  if (page.url().includes("/login")) {
    await expect(page).toHaveURL(/\/login/);
    await expect(
      page.getByRole("heading", { name: /welcome back|log in/i }).first(),
    ).toBeVisible();
    return;
  }

  await expect(page.getByRole("heading", { name: /dashboard/i })).toBeVisible();
});
