import { expect, test } from '@playwright/test';

test('downloads the edited image when the download button is clicked', async ({
  page,
}) => {
  await page.goto('/');

  await page
    .locator('input[type="file"]')
    .setInputFiles('e2e/fixtures/dog.jpg');

  await expect(
    page.getByRole('button', { name: 'ダウンロード' }),
  ).toBeVisible();

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'ダウンロード' }).click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toBe('dog-photo-mask.png');
});

test('copies the edited image to the clipboard when the copy button is clicked', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);

  await page.goto('/');

  await page
    .locator('input[type="file"]')
    .setInputFiles('e2e/fixtures/dog.jpg');

  await expect(page.getByRole('button', { name: 'コピー' })).toBeVisible();

  await page.getByRole('button', { name: 'コピー' }).click();

  await expect
    .poll(async () =>
      page.evaluate(async () => {
        const [item] = await navigator.clipboard.read();
        return item?.types.includes('image/png') ?? false;
      }),
    )
    .toBe(true);
});
