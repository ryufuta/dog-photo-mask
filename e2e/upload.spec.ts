import { expect, test } from '@playwright/test';

test('opens the editor when an image is uploaded', async ({ page }) => {
  await page.goto('/');

  await page
    .locator('input[type="file"]')
    .setInputFiles('e2e/fixtures/dog.jpg');

  await expect(
    page.getByRole('button', { name: 'スタンプ追加' }),
  ).toBeVisible();
});
