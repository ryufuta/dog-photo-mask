import { loadImage } from './utils.ts';

describe('loadImage', () => {
  test('loads an image file', async () => {
    const file = await createImageFile();

    const image = await loadImage(file);

    expect(image).toBeInstanceOf(HTMLImageElement);
  });

  test('rejects when image loading fails', async () => {
    const file = new File([], 'invalid.png', { type: 'image/png' });

    await expect(loadImage(file)).rejects.toThrow(
      'Failed to load image: invalid.png',
    );
  });
});

async function createImageFile() {
  // 1x1の透明な画像を生成する
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;

  const blob = await new Promise<Blob>((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob!);
    }, 'image/png');
  });

  return new File([blob], 'test.png', { type: 'image/png' });
}
