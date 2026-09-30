import { toast, Toaster } from 'sonner';
import { render } from 'vitest-browser-react';
import { createTestImage } from '@/image-editor/test-utils.ts';
import { EditorScreen } from './EditorScreen.tsx';
import { copyCanvas, downloadCanvas } from './export-canvas.ts';

vi.mock(import('./export-canvas.ts'), () => ({
  copyCanvas: vi.fn(),
  downloadCanvas: vi.fn(),
}));

test('shows an error message when copying the canvas to the clipboard fails', async () => {
  vi.mocked(copyCanvas).mockRejectedValue(
    new Error('Konva: toBlob() failed, the canvas was not encoded'),
  );

  const image = createTestImage();
  const stickerImage = createTestImage();

  const screen = await render(
    <>
      <Toaster position="top-right" />
      <EditorScreen
        image={image}
        stickerImage={stickerImage}
        detectedFaces={[]}
        onReset={() => {}}
      />
    </>,
  );

  await screen.getByRole('button', { name: 'コピー' }).click();

  await expect
    .element(screen.getByText('画像のコピーに失敗しました'))
    .toBeVisible();

  // トーストが次のテストまで残るのを防ぐ
  toast.dismiss();
});

test('shows an error message when the canvas download fails', async () => {
  vi.mocked(downloadCanvas).mockRejectedValue(
    new Error('Konva: toBlob() failed, the canvas was not encoded'),
  );

  const image = createTestImage();
  const stickerImage = createTestImage();

  const screen = await render(
    <>
      <Toaster position="top-right" />
      <EditorScreen
        image={image}
        stickerImage={stickerImage}
        detectedFaces={[]}
        onReset={() => {}}
      />
    </>,
  );

  await screen.getByRole('button', { name: 'ダウンロード' }).click();

  await expect
    .element(screen.getByText('画像のダウンロードに失敗しました'))
    .toBeVisible();

  toast.dismiss();
});
