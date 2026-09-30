import { createTestImage } from '@/image-editor/test-utils.ts';
import { exportCanvasAsBlob } from './export-canvas.ts';

test('generates a Blob with the same dimensions as the original image', async () => {
  const image = createTestImage(80, 60);
  const stickerImage = createTestImage(10, 10);
  const stickers = [{ id: '1', x: 10, y: 10, width: 15, height: 15 }];

  const blob = await exportCanvasAsBlob(image, stickerImage, stickers);

  expect(blob).toBeInstanceOf(Blob);

  const outputImage = await loadImageFromBlob(blob);

  expect(outputImage.naturalWidth).toBe(image.naturalWidth);
  expect(outputImage.naturalHeight).toBe(image.naturalHeight);
});

async function loadImageFromBlob(blob: Blob) {
  const image = new Image();
  const url = URL.createObjectURL(blob);
  image.src = url;
  await image.decode();
  URL.revokeObjectURL(url);

  return image;
}
