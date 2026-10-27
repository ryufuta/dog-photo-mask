import { expect, test } from '@playwright/test';

test('opens the editor when an image is uploaded', async ({ page }) => {
  await page.goto('/');

  await page
    .locator('input[type="file"]')
    .setInputFiles('src/test-fixtures/00_no_person_one_dog.jpg');

  await expect(
    page.getByRole('button', { name: 'スタンプを追加' }),
  ).toBeVisible();
});

test('opens the editor when an image is selected through the bottom button', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');

  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.getByRole('button', { name: '写真を選ぶ' }).click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles('src/test-fixtures/00_no_person_one_dog.jpg');

  await expect(
    page.getByRole('button', { name: 'スタンプを追加' }),
  ).toBeVisible();
});
