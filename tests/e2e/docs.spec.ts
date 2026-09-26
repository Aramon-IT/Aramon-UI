import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";

mkdirSync(".impeccable/review", { recursive: true });

const viewports = [{ name: "mobile", width: 390, height: 844 }, { name: "tablet", width: 768, height: 1024 }, { name: "desktop", width: 1440, height: 1000 }] as const;

for (const viewport of viewports) {
  test(`${viewport.name} homepage supports light, dark, and RTL`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Interfaces with a material memory." })).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("data-aramon-theme", "dark");
    if (viewport.name === "mobile" || viewport.name === "desktop") {
      await page.screenshot({ path: `.impeccable/review/${viewport.name}.png`, fullPage: true });
    }
    await page.getByRole("button", { name: "Use light theme" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-aramon-theme", "light");
    await page.locator("[data-locale-control]").click();
    await page.locator("[data-locale-control]").click();
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.locator("#main-content")).toHaveAttribute("lang", "ar");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    await page.screenshot({ path: `.impeccable/review/home-${viewport.name}-dark-rtl.png`, fullPage: true });
  });
}

test("component detail, interaction, and recipes remain accessible", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/components/animated-list/");
  await expect(page.getByRole("heading", { name: "Animated List", level: 1 })).toBeVisible();
  const before = await page.getByRole("listitem").count();
  await page.getByRole("button", { name: "Add item" }).click();
  await expect(page.getByRole("listitem")).toHaveCount(before + 1);
  await page.waitForTimeout(500);
  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations).toEqual([]);
  await page.goto("/patterns/identity-entry/");
  await expect(page.getByRole("heading", { name: "Identity Entry" })).toBeVisible();
  await page.goto("/patterns/classroom-presence/");
  await expect(page.getByRole("heading", { name: "Classroom Presence" })).toBeVisible();
});

test("mobile navigation and installation path are complete", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByText("Menu", { exact: true }).click();
  await expect(page.getByRole("navigation", { name: "Documentation" }).last()).toBeVisible();
  await page.getByRole("link", { name: "Installation" }).last().click();
  await expect(page.getByRole("heading", { name: "Installation", level: 1 })).toBeVisible();
  await page.goto("/");
  await page.getByRole("link", { name: "Open installation" }).click();
  await expect(page).toHaveURL(/\/installation\/$/);
});

test("translated chrome does not mislabel English technical articles", async ({ page }) => {
  await page.goto("/components/button/");
  await page.locator("[data-locale-control]").click();
  await page.locator("[data-locale-control]").click();
  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await expect(page.locator("#main-content")).toHaveAttribute("lang", "en");
  await expect(page.locator("#main-content")).toHaveAttribute("dir", "ltr");
});

test("the documentation reflows at 200% zoom and keeps touch controls usable", async ({ page }) => {
  // A 390 CSS-pixel viewport exercises the same reflow breakpoint as a
  // 780px-wide browser at 200% zoom, without relying on browser chrome APIs.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  const themeControl = await page.getByRole("button", { name: "Use light theme" }).boundingBox();
  expect(themeControl?.height).toBeGreaterThanOrEqual(44);
});

test("reduced motion uses the material poster", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".material-home img")).toBeVisible();
  await expect(page.locator(".material-home video")).toHaveCount(0);
});

test("Save Data uses the material poster", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "connection", { configurable: true, value: { saveData: true } });
  });
  await page.goto("/");
  await expect(page.locator(".material-home img")).toBeVisible();
  await expect(page.locator(".material-home video")).toHaveCount(0);
});

test("the local documentation build stays inside the web-vital budgets", async ({ page }) => {
  await page.addInitScript(() => {
    const metrics = { cls: 0, lcp: 0 };
    Object.defineProperty(window, "__aramonMetrics", { value: metrics });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const shift = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
        if (!shift.hadRecentInput) metrics.cls += shift.value ?? 0;
      }
    }).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((list) => {
      metrics.lcp = list.getEntries().at(-1)?.startTime ?? metrics.lcp;
    }).observe({ type: "largest-contentful-paint", buffered: true });
  });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Use light theme" }).click();
  const interactionMs = await page.evaluate(() => new Promise<number>((resolve) => {
    const started = performance.now();
    requestAnimationFrame(() => requestAnimationFrame(() => resolve(performance.now() - started)));
  }));
  const metrics = await page.evaluate(() => (window as typeof window & { __aramonMetrics: { cls: number; lcp: number } }).__aramonMetrics);
  expect(metrics.lcp).toBeGreaterThan(0);
  expect(metrics.lcp).toBeLessThan(2_500);
  expect(metrics.cls).toBeLessThan(0.1);
  expect(interactionMs).toBeLessThan(200);
});
