import { expect, test } from "@playwright/test";

test("@smoke navbar hash links resolve to sections", async ({ page }) => {
  await page.goto("/");

  const navbar = page.getByRole("navigation");

  const featuresLink = navbar.getByRole("link", { name: "Features" });
  const playgroundLink = navbar.getByRole("link", { name: "Playground" });
  const pricingLink = navbar.getByRole("link", { name: "Pricing" });

  await expect(featuresLink).toHaveAttribute("href", "/#features");
  await expect(playgroundLink).toHaveAttribute("href", "/#playground");
  await expect(pricingLink).toHaveAttribute("href", "/#pricing");

  await expect(page.locator("#features")).toHaveCount(1);
  await expect(page.locator("#playground")).toHaveCount(1);
  await expect(page.locator("#pricing")).toHaveCount(1);
});

test("@smoke no dead footer links and legal pages load", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("footer a[href='#']")).toHaveCount(0);

  await page.goto("/privacy");
  await expect(
    page.getByRole("heading", { name: /privacy policy/i }),
  ).toBeVisible();

  await page.goto("/terms");
  await expect(
    page.getByRole("heading", { name: /terms of service/i }),
  ).toBeVisible();
});
