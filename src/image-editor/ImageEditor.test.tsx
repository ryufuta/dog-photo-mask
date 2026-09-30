import { toast, Toaster } from 'sonner';
import { render } from 'vitest-browser-react';
import { detectFaces } from '@/face-detection/face-detector.ts';
import { ImageLoadError, loadImage } from '@/lib/utils.ts';
import { ImageEditor } from './ImageEditor.tsx';

vi.mock(import('../lib/utils.ts'), async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    loadImage: vi.fn(),
  };
});
vi.mock(import('../face-detection/face-detector.ts'), () => ({
  detectFaces: vi.fn(),
}));

const mockedLoadImage = vi.mocked(loadImage);
const mockedDetectFaces = vi.mocked(detectFaces);

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

test('shows the face detection screen after the image is loaded', async () => {
  mockedLoadImage.mockResolvedValue(createTestImage());
  mockedDetectFaces.mockReturnValue(new Promise(() => {}));

  const screen = await render(<ImageEditor />);

  const file = new File([], 'dummy.png', { type: 'image/png' });

  await screen.getByRole('button').upload(file);

  await expect.element(screen.getByText('顔検出中...')).toBeVisible();
});

test('shows the editor screen after face detection is completed', async () => {
  mockedLoadImage.mockResolvedValue(createTestImage());
  mockedDetectFaces.mockResolvedValue([
    { x: 0, y: 0, width: 10, height: 10, score: 0.9 },
  ]);

  const screen = await render(
    <>
      <Toaster position="top-right" />
      <ImageEditor />
    </>,
  );

  const file = new File([], 'dummy.png', { type: 'image/png' });

  await screen.getByRole('button').upload(file);

  await expect.element(screen.getByText('スタンプ追加')).toBeVisible();
  await expect
    .element(screen.getByText('顔を検出できませんでした'))
    .not.toBeInTheDocument();

  toast.dismiss();
});

test('shows the editor screen with a warning message when no face is detected', async () => {
  mockedLoadImage.mockResolvedValue(createTestImage());
  mockedDetectFaces.mockResolvedValue([]);

  const screen = await render(
    <>
      <Toaster position="top-right" />
      <ImageEditor />
    </>,
  );

  const file = new File([], 'dummy.png', { type: 'image/png' });

  await screen.getByRole('button').upload(file);

  await expect.element(screen.getByText('スタンプ追加')).toBeVisible();
  await expect
    .element(screen.getByText('顔を検出できませんでした'))
    .toBeVisible();

  toast.dismiss();
});

test('returns to the upload screen when the reset button is clicked', async () => {
  mockedLoadImage.mockResolvedValue(createTestImage());
  mockedDetectFaces.mockResolvedValue([
    { x: 0, y: 0, width: 10, height: 10, score: 0.9 },
  ]);

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
  mockedLoadImage.mockRejectedValue(new ImageLoadError('dummy.png'));

  const screen = await render(
    <>
      <Toaster position="top-right" />
      <ImageEditor />
    </>,
  );

  const file = new File([], 'dummy.png', { type: 'image/png' });

  await screen.getByRole('button').upload(file);

  await expect
    .element(
      screen.getByText(
        'ここにファイルをドラッグ&ドロップするか, クリックしてファイルを選択してください',
      ),
    )
    .toBeVisible();
  await expect
    .element(screen.getByText('画像を読み込めませんでした'))
    .toBeVisible();

  toast.dismiss();
});

test('returns to the upload screen when face detection fails', async () => {
  mockedLoadImage.mockResolvedValue(createTestImage());
  mockedDetectFaces.mockRejectedValue(
    new Error('Failed to initialize FaceDetector'),
  );

  const screen = await render(
    <>
      <Toaster position="top-right" />
      <ImageEditor />
    </>,
  );

  const file = new File([], 'dummy.png', { type: 'image/png' });

  await screen.getByRole('button').upload(file);

  await expect
    .element(
      screen.getByText(
        'ここにファイルをドラッグ&ドロップするか, クリックしてファイルを選択してください',
      ),
    )
    .toBeVisible();
  await expect
    .element(screen.getByText('アプリに問題が発生しました'))
    .toBeVisible();

  toast.dismiss();
});

function createTestImage() {
  const image = new Image();

  Object.defineProperties(image, {
    naturalWidth: { value: 100 },
    naturalHeight: { value: 100 },
  });

  return image;
}
