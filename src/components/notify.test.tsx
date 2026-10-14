import { toast } from 'sonner';
import { render } from 'vitest-browser-react';
import { notify } from './notify';
import { Toaster } from './ui/sonner';

test('clicking a notification dismisses only that notification', async () => {
  const screen = await render(<Toaster theme="light" expand />);
  notify.warning('顔を検出できませんでした', { duration: Infinity });
  notify.error('画像をコピーできませんでした', { duration: Infinity });

  await screen
    .getByRole('button', { name: '通知を閉じる：顔を検出できませんでした' })
    .click();

  await expect
    .element(screen.getByText('顔を検出できませんでした'))
    .not.toBeInTheDocument();
  await expect
    .element(screen.getByText('画像をコピーできませんでした'))
    .toBeVisible();

  await screen
    .getByRole('button', { name: '通知を閉じる：画像をコピーできませんでした' })
    .click();
  await expect
    .element(screen.getByText('画像をコピーできませんでした'))
    .not.toBeInTheDocument();
  toast.dismiss();
});
