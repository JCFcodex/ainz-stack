import { expect, test } from "@playwright/test";

test("homepage loads and Get Started navigates to signup", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("navigation")).toBeVisible();

  const getStartedLink = page
    .getByRole("link", { name: /get started/i })
    .first();
  await expect(getStartedLink).toBeVisible();

  await getStartedLink.click();
  await expect(page).toHaveURL(/\/signup$/);
});
