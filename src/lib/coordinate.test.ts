import {
  toCanvasRect,
  toImagePosition,
  toImageTransformedRect,
} from './coordinate.ts';

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

describe('toImagePosition', () => {
  describe('when the sticker is at the top-left corner of the image on the canvas', () => {
    const canvasStickerPosition = { x: 0, y: 0 };
    test('keeps the sticker at the top-left corner of the original smaller image', () => {
      expect(toImagePosition(canvasStickerPosition, 2)).toEqual({
        x: 0,
        y: 0,
      });
    });

    test('keeps the sticker at the top-left corner of the original larger image', () => {
      expect(toImagePosition(canvasStickerPosition, 0.5)).toEqual({
        x: 0,
        y: 0,
      });
    });
  });

  describe('when the sticker is at the bottom-right corner of the image on the canvas', () => {
    // 元画像は width: 800, height: 600
    // 元画像上のスタンプは width: 100, height: 100 とする
    test('keeps the sticker at the bottom-right corner of the original smaller image', () => {
      const canvasStickerPosition = {
        x: 1400,
        y: 1000,
      };

      expect(toImagePosition(canvasStickerPosition, 2)).toEqual({
        x: 700,
        y: 500,
      });
    });

    test('keeps the sticker at the bottom-right corner of the original larger image', () => {
      const canvasStickerPosition = {
        x: 350,
        y: 250,
      };

      expect(toImagePosition(canvasStickerPosition, 0.5)).toEqual({
        x: 700,
        y: 500,
      });
    });
  });
});

describe('toImageTransformedRect', () => {
  // アスペクト比を固定しているため"width = height かつ scaleX = scaleY"
  const transform = {
    x: 100,
    y: 100,
    width: 50,
    height: 50,
    scaleX: 2,
    scaleY: 2,
  };

  test('converts the transformed rectangle from an enlarged canvas to image coordinates', () => {
    expect(toImageTransformedRect(transform, 2)).toEqual({
      x: 50,
      y: 50,
      width: 50,
      height: 50,
    });
  });

  test('converts the transformed rectangle from a reduced canvas to image coordinates', () => {
    expect(toImageTransformedRect(transform, 0.5)).toEqual({
      x: 200,
      y: 200,
      width: 200,
      height: 200,
    });
  });
});
