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

test('generates a Blob with stickers drawn at specified positions on the background image', async () => {
  const image = await createSolidImage(40, 30, '#ff0000');
  const stickerImage = await createSolidImage(4, 4, '#0000ff');
  const stickers = [{ id: '1', x: 10, y: 8, width: 10, height: 10 }];

  const blob = await exportCanvasAsBlob(image, stickerImage, stickers);

  const bitmap = await createImageBitmap(blob);
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Expected a 2D canvas context');
  }
  context.drawImage(bitmap, 0, 0);

  const pixelAt = (x: number, y: number) =>
    Array.from(context.getImageData(x, y, 1, 1).data);
  const pixelAtBackground = pixelAt(2, 2);
  const pixelAtStickerCenter = pixelAt(15, 13);

  expect(pixelAtBackground).toEqual([255, 0, 0, 255]);
  expect(pixelAtStickerCenter).toEqual([0, 0, 255, 255]);

  bitmap.close();
});

async function loadImageFromBlob(blob: Blob) {
  const image = new Image();
  const url = URL.createObjectURL(blob);
  image.src = url;
  await image.decode();
  URL.revokeObjectURL(url);

  return image;
}

async function createSolidImage(width: number, height: number, color: string) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Expected a 2D canvas context');
  }

  context.fillStyle = color;
  context.fillRect(0, 0, width, height);

  const image = new Image();
  image.src = canvas.toDataURL('image/png');
  await image.decode();

  return image;
}
