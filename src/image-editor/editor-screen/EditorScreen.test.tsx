import { Toaster } from 'sonner';
import { render } from 'vitest-browser-react';
import { EditorScreen } from './EditorScreen.tsx';
import { copyCanvas } from './export-canvas.ts';

vi.mock(import('./export-canvas.ts'), () => ({
  copyCanvas: vi.fn(),
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
});

function createTestImage() {
  const image = new Image();

  Object.defineProperties(image, {
    naturalWidth: { value: 100 },
    naturalHeight: { value: 100 },
  });

  return image;
}
