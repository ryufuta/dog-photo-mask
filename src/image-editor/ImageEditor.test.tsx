import { render } from 'vitest-browser-react';
import { loadImage } from '@/lib/utils.ts';
import { ImageEditor } from './ImageEditor.tsx';

vi.mock(import('@/lib/utils.ts'), () => ({
  loadImage: vi.fn(),
}));

const mockedLoadImage = vi.mocked(loadImage);

beforeEach(() => {
  mockedLoadImage.mockReset();
});

test('shows the upload screen initially', async () => {
  const screen = await render(<ImageEditor />);

  await expect
    .element(
      screen.getByText(
        'ここにファイルをドラッグ&ドロップするか, クリックしてファイルを選択してください',
      ),
    )
    .toBeVisible();
});

test('shows the loading screen after an image is uploaded', async () => {
  // 画像アップロード後にローディング画面を表示し続けることでテストを安定化させる
  // そのために画像読み込み処理を永久にpendingにする
  mockedLoadImage.mockReturnValue(new Promise(() => {}));

  const screen = await render(<ImageEditor />);

  const file = new File([], 'dummy.png', { type: 'image/png' });

  await screen.getByRole('button').upload(file);

  await expect.element(screen.getByText('画像読み込み中...')).toBeVisible();
});

test('shows the editor screen after the image is loaded', async () => {
  mockedLoadImage.mockResolvedValue(createTestImage());

  const screen = await render(<ImageEditor />);

  const file = new File([], 'dummy.png', { type: 'image/png' });

  await screen.getByRole('button').upload(file);

  await expect.element(screen.getByText('スタンプ追加')).toBeVisible();
});

test('returns to the upload screen when the reset button is clicked', async () => {
  mockedLoadImage.mockResolvedValue(createTestImage());

  const screen = await render(<ImageEditor />);

  const file = new File([], 'dummy.png', { type: 'image/png' });

  await screen.getByRole('button').upload(file);
  await screen.getByRole('button', { name: 'リセット' }).click();

  await expect
    .element(
      screen.getByText(
        'ここにファイルをドラッグ&ドロップするか, クリックしてファイルを選択してください',
      ),
    )
    .toBeVisible();
});

test('returns to the upload screen when image loading fails', async () => {
  mockedLoadImage.mockRejectedValue(new Error('Failed to load image'));

  const screen = await render(<ImageEditor />);

  const file = new File([], 'dummy.png', { type: 'image/png' });

  await screen.getByRole('button').upload(file);

  // TODO: エラーメッセージをUIに表示する機能を追加時にそのメッセージの表示も検証する
  await expect
    .element(
      screen.getByText(
        'ここにファイルをドラッグ&ドロップするか, クリックしてファイルを選択してください',
      ),
    )
    .toBeVisible();
});

function createTestImage() {
  const image = new Image();

  Object.defineProperties(image, {
    naturalWidth: { value: 100 },
    naturalHeight: { value: 100 },
  });

  return image;
}
