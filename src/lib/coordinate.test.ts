import { toCanvasRect } from './coordinate.ts';

describe('toCanvasRect', () => {
  const stickerSize = {
    width: 100,
    height: 100,
  };

  describe('when the sticker is at the top-left corner of the image', () => {
    const stickerRect = {
      x: 0,
      y: 0,
      ...stickerSize,
    };

    test('keeps the sticker at the top-left corner when the image is enlarged', () => {
      expect(toCanvasRect(stickerRect, 2)).toEqual({
        x: 0,
        y: 0,
        width: 200,
        height: 200,
      });
    });

    test('keeps the sticker at the top-left corner when the image is reduced', () => {
      expect(toCanvasRect(stickerRect, 0.5)).toEqual({
        x: 0,
        y: 0,
        width: 50,
        height: 50,
      });
    });
  });

  describe('when the sticker is at the bottom-right corner of the image', () => {
    // 元画像は width: 800, height: 600 とする
    const stickerRect = {
      x: 700,
      y: 500,
      ...stickerSize,
    };

    test('keeps the sticker at the bottom-right corner when the image is enlarged', () => {
      expect(toCanvasRect(stickerRect, 2)).toEqual({
        x: 1400,
        y: 1000,
        width: 200,
        height: 200,
      });
    });

    test('keeps the sticker at the bottom-right corner when the image is reduced', () => {
      expect(toCanvasRect(stickerRect, 0.5)).toEqual({
        x: 350,
        y: 250,
        width: 50,
        height: 50,
      });
    });
  });
});
