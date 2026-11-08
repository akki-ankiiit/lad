import { test, expect } from "@playwright/test";

async function openPage(page, path = "/") {
  await page.addInitScript(() => {
    sessionStorage.setItem("hasVisited", "true");
    localStorage.setItem("cookies", "accepted");
  });
  await page.goto(path);
  await expect(page.locator("[data-experience-ready]")).toBeAttached();
  await expect(page.locator("[data-preloader]")).toBeHidden();
}

test("homepage renders the Antonovich brand, scrolls and loads images", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await openPage(page);
  await expect(page).toHaveTitle(/Luxury Antonovich Design/);
  await expect(page.locator(".hero-s h1")).toHaveText(/Luxury\s*Antonovich/i);
  await expect
    .poll(() =>
      page
        .locator(".hero-img")
        .first()
        .evaluate((image) => image.complete && image.naturalWidth > 0),
    )
    .toBe(true);
  await expect(page.locator(".header-logo .brand-mark")).toBeAttached();
  expect(await page.content()).not.toMatch(/azure interiors/i);
  const overflowing = await page.evaluate(
    () => document.documentElement.scrollWidth > innerWidth + 1,
  );
  expect(overflowing).toBe(false);
  await page.mouse.wheel(0, 1600);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(300);
  expect(errors).toEqual([]);
});

test("interior/exterior scene control crossfades the hero", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "The original design hides the scene control on mobile.");
  await openPage(page);
  await page.locator('[data-tab-trigger="night"]').click();
  await expect(page.locator('[data-tab-trigger="night"]')).toHaveClass(
    /is-active/,
  );
  await expect(page.locator('[data-tab-content="night"]')).toHaveCSS(
    "opacity",
    "1",
  );
});

test("portfolio filtering honors deep links and reset", async ({ page }) => {
  await openPage(page, "/projects?type=hospitality");
  const state = () =>
    page.evaluate(() => {
      const items = [...document.querySelectorAll("[data-filter-item]")];
      const visible = items.filter(
        (el) => getComputedStyle(el).display !== "none",
      );
      return {
        total: items.length,
        visible: visible.length,
        types: visible
          .map((el) => el.querySelector("[data-type]")?.dataset.type)
          .filter(Boolean),
      };
    });

  await expect
    .poll(async () => {
      const { total, visible, types } = await state();
      return (
        visible > 0 &&
        visible < total &&
        types.length > 0 &&
        types.every((type) => type === "hospitality")
      );
    })
    .toBe(true);

  await page.locator("[data-reset]").click();
  await expect
    .poll(async () => {
      const { total, visible, types } = await state();
      return total > 0 && visible === total && types.includes("residential");
    })
    .toBe(true);
});

test("inquiry form offers project fields and an email fallback", async ({
  page,
  isMobile,
}) => {
  await openPage(page, "/contact");
  if (isMobile) {
    await page.locator("[data-modal-menu-btn]").click();
    await page.locator("[data-modal-menu] [data-modal-cta-btn]").click();
  } else await page.locator(".header-nav [data-modal-cta-btn]").click();
  const form = page.locator("[data-modal-cta] form");
  await expect(form).toBeVisible();
  await form.locator('input[name="name"]').fill("Alex Morgan");
  await form.locator('input[type="email"]').fill("alex@example.com");
  await form.locator('input[type="tel"]').fill("+971500000000");
  await form.locator('select[name="project_type"]').selectOption("Residential");
  await form
    .locator('select[name="services"]')
    .selectOption(["Interior Design", "Architecture"]);
  await form.locator("textarea").fill("A private villa interior.");
  await form.locator("[data-form-btn]").click();
  await expect(form.locator("[data-form-status]")).toContainText(
    "info@antonovich-design.com",
  );
});

test("regional offices stay separate on the contact page", async ({ page }) => {
  await openPage(page, "/contact");
  const offices = page.locator(".contact-s_loc .loc-cms_list_item");
  await expect(offices).toHaveCount(4);
  await expect(offices.nth(0)).toContainText("Doral, Florida");
  await expect(offices.nth(1)).toContainText("Boulevard Plaza");
  await expect(offices.nth(3)).toContainText("Riyadh");
});

test("client navigation, project pages and browser back remain functional", async ({
  page,
  isMobile,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await openPage(page, "/projects");
  const first = page.locator("[data-filter-item] a").first();
  const href = await first.getAttribute("href");
  await first.click();
  await expect(page).toHaveURL(new RegExp(`${href}$`));
  await expect(page.locator(".lot-w h1")).toBeVisible();
  await expect(page.locator("[data-experience-ready]")).toBeAttached();
  await page.goBack();
  await expect(page).toHaveURL(/\/projects$/);
  if (isMobile) {
    await page.locator("[data-modal-menu-btn]").click();
    await page.locator('[data-modal-menu] a[href="/contact"]').click();
  } else await page.locator('.header-nav a[href="/contact"]').click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.locator("main h1").first()).toHaveText(/Contact us/i);
  expect(errors).toEqual([]);
});

test("section links scroll to homepage sections", async ({ page }) => {
  await openPage(page, "/#services");
  await expect
    .poll(() =>
      page.evaluate(() =>
        Math.abs(document.getElementById("services").getBoundingClientRect().top),
      ),
    )
    .toBeLessThan(5);
});

test("reduced motion skips the opening loader", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("[data-experience-ready]")).toBeAttached();
  await expect(page.locator("[data-preloader]")).toBeHidden();
  await expect(page.locator(".hero-s h1")).toBeVisible();
});
