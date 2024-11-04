import { test, expect } from '@playwright/test';
import dayjs from 'dayjs';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
  });
  await page.goto('/');
});
test('go to next month', async ({ page }) => {
  const nav = page.locator('nav');
  const currentMonthText = await nav.locator('[aria-label="current-month"]').innerText();

  const currentDate = dayjs(`${currentMonthText}-01`, 'YYYY.MM-DD');
  const expectedDate = currentDate.add(1, 'month').format('YYYY.MM');

  await nav.locator('button[aria-label="next-month-button"]').click();

  await expect(nav.locator('[aria-label="current-month"]')).toHaveText(expectedDate);
});

test('go to prev month', async ({ page }) => {
  const nav = page.locator('nav');
  const currentMonthText = await nav.locator('[aria-label="current-month"]').innerText();

  const currentDate = dayjs(`${currentMonthText}-01`, 'YYYY.MM-DD');
  const expectedDate = currentDate.subtract(1, 'month').format('YYYY.MM');

  await nav.locator('button[aria-label="prev-month-button"]').click();

  await expect(nav.locator('[aria-label="current-month"]')).toHaveText(expectedDate);
});
