import { toast, Toaster } from 'sonner';
import { render } from 'vitest-browser-react';
import { createTestImage } from '@/image-editor/test-utils.ts';
import { EditorScreen } from './EditorScreen.tsx';
import { copyCanvas, downloadCanvas } from './export-canvas.ts';

vi.mock(import('./export-canvas.ts'), () => ({
  copyCanvas: vi.fn(),
  downloadCanvas: vi.fn(),
}));

test('dismissed sticker instructions stay closed when another sticker is added', async () => {
  const screen = await render(
    <EditorScreen
      image={createTestImage()}
      stickerImage={createTestImage()}
      detectedFaces={[{ x: 0, y: 0, width: 10, height: 10, score: 0.9 }]}
      onReset={() => {}}
    />,
  );

  await expect
    .element(screen.getByText('スタンプを選んでドラッグで移動、'))
    .toBeVisible();
  await screen
    .getByRole('button', { name: 'スタンプの操作説明を閉じる' })
    .click();
  await expect
    .element(screen.getByText('スタンプを選んでドラッグで移動、'))
    .not.toBeInTheDocument();
  await screen.getByRole('button', { name: 'スタンプを追加' }).click();
  await expect
    .element(screen.getByText('スタンプを選んでドラッグで移動、'))
    .not.toBeInTheDocument();
});

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

  await screen.getByRole('button', { name: '画像をコピー' }).click();

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

  await screen.getByRole('button', { name: '画像を保存' }).click();

  await expect
    .element(screen.getByText('画像のダウンロードに失敗しました'))
    .toBeVisible();

  toast.dismiss();
});
