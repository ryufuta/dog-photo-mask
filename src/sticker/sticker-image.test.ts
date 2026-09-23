import { createStickerLoader } from './sticker-image.ts';

describe('loadStickerImage', () => {
  test('loads a sticker image', async () => {
    const loadStickerImage = createStickerLoader();

    const image = await loadStickerImage();

    expect(image).toBeInstanceOf(HTMLImageElement);
    expect(image.complete).toBe(true);
    expect(image.naturalWidth).toBeGreaterThan(0);
    expect(image.naturalHeight).toBeGreaterThan(0);
  });

  test('returns the same image instance when called multiple times', async () => {
    const loadStickerImage = createStickerLoader();

    const promise1 = loadStickerImage();
    const promise2 = loadStickerImage();

    const [image1, image2] = await Promise.all([promise1, promise2]);

    expect(image1).toBe(image2);
  });

  test('rejects and clears cache when image loading fails', async () => {
    vi.spyOn(HTMLImageElement.prototype, 'decode').mockRejectedValueOnce(
      new DOMException('The source image cannot be decoded.', 'EncodingError'),
    );

    const loadStickerImage = createStickerLoader();

    await expect(loadStickerImage()).rejects.toThrow(
      'Failed to load sticker image',
    );

    const image = await loadStickerImage();
    expect(image).toBeInstanceOf(HTMLImageElement);
  });
});
