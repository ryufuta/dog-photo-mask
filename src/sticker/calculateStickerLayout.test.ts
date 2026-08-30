import {
  toCanvasStickerRect,
  toImageStickerPosition,
  toImageStickerRect,
} from './calculateStickerLayout.ts';

describe('toCanvasStickerRect', () => {
  const stickerSize = {
    width: 100,
    height: 100,
  };

  const enlargedImageLayout = {
    x: 50,
    y: 0,
    scale: 2,
  };

  const reducedImageLayout = {
    x: 0,
    y: 50,
    scale: 0.5,
  };

  describe('when the sticker is at the top-left corner of the image', () => {
    const stickerRect = {
      x: 0,
      y: 0,
      ...stickerSize,
    };

    test('keeps the sticker at the top-left corner when the image is enlarged', () => {
      expect(toCanvasStickerRect(stickerRect, enlargedImageLayout)).toEqual({
        x: 50,
        y: 0,
        width: 200,
        height: 200,
      });
    });

    test('keeps the sticker at the top-left corner when the image is reduced', () => {
      expect(toCanvasStickerRect(stickerRect, reducedImageLayout)).toEqual({
        x: 0,
        y: 50,
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
      expect(toCanvasStickerRect(stickerRect, enlargedImageLayout)).toEqual({
        x: 1450,
        y: 1000,
        width: 200,
        height: 200,
      });
    });

    test('keeps the sticker at the bottom-right corner when the image is reduced', () => {
      expect(toCanvasStickerRect(stickerRect, reducedImageLayout)).toEqual({
        x: 350,
        y: 300,
        width: 50,
        height: 50,
      });
    });
  });
});

describe('toImageStickerPosition', () => {
  describe('when the sticker is at the top-left corner of the image on the canvas', () => {
    test('keeps the sticker at the top-left corner of the original smaller image', () => {
      const imageLayout = {
        x: 50,
        y: 0,
        scale: 2,
      };
      const canvasStickerPosition = {
        x: imageLayout.x,
        y: imageLayout.y,
      };

      expect(
        toImageStickerPosition(canvasStickerPosition, imageLayout),
      ).toEqual({
        x: 0,
        y: 0,
      });
    });

    test('keeps the sticker at the top-left corner of the original larger image', () => {
      const imageLayout = {
        x: 0,
        y: 50,
        scale: 0.5,
      };
      const canvasStickerPosition = {
        x: imageLayout.x,
        y: imageLayout.y,
      };

      expect(
        toImageStickerPosition(canvasStickerPosition, imageLayout),
      ).toEqual({
        x: 0,
        y: 0,
      });
    });
  });

  describe('when the sticker is at the bottom-right corner of the image on the canvas', () => {
    // 元画像は width: 800, height: 600
    // 元画像上のスタンプは width: 100, height: 100 とする
    test('keeps the sticker at the bottom-right corner of the original smaller image', () => {
      const imageLayout = {
        x: 50,
        y: 0,
        scale: 2,
      };
      const canvasStickerPosition = {
        x: 1400 + imageLayout.x,
        y: 1000 + imageLayout.y,
      };

      expect(
        toImageStickerPosition(canvasStickerPosition, imageLayout),
      ).toEqual({
        x: 700,
        y: 500,
      });
    });

    test('keeps the sticker at the bottom-right corner of the original larger image', () => {
      const imageLayout = {
        x: 0,
        y: 50,
        scale: 0.5,
      };
      const canvasStickerPosition = {
        x: 350 + imageLayout.x,
        y: 250 + imageLayout.y,
      };

      expect(
        toImageStickerPosition(canvasStickerPosition, imageLayout),
      ).toEqual({
        x: 700,
        y: 500,
      });
    });
  });
});

describe('toImageStickerRect', () => {
  test('keeps the relative position and size of the sticker to the image when the image is enlarged on the canvas', () => {
    const imageLayout = {
      x: 50,
      y: 0,
      scale: 2,
    };
    const canvasStickerRect = {
      x: imageLayout.x,
      y: imageLayout.y,
      width: 200,
      height: 200,
    };

    expect(toImageStickerRect(canvasStickerRect, imageLayout)).toEqual({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    });
  });

  test('keeps the relative position and size of the sticker to the image when the image is reduced on the canvas', () => {
    const imageLayout = {
      x: 0,
      y: 50,
      scale: 0.5,
    };
    const canvasStickerRect = {
      x: imageLayout.x,
      y: imageLayout.y,
      width: 100,
      height: 100,
    };

    expect(toImageStickerRect(canvasStickerRect, imageLayout)).toEqual({
      x: 0,
      y: 0,
      width: 200,
      height: 200,
    });
  });
});
