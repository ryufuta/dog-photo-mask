import {
  calculateStickerLayout,
  toImageStickerPosition,
} from './calculateStickerLayout.ts';

describe('calculateStickerLayout', () => {
  const sticker = {
    id: 'id',
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
    const stickerAtTopLeft = {
      ...sticker,
      x: 0,
      y: 0,
    };

    test('keeps the sticker at the top-left corner when the image is enlarged', () => {
      expect(
        calculateStickerLayout(stickerAtTopLeft, enlargedImageLayout),
      ).toEqual({
        x: 50,
        y: 0,
        width: 200,
        height: 200,
      });
    });

    test('keeps the sticker at the top-left corner when the image is reduced', () => {
      expect(
        calculateStickerLayout(stickerAtTopLeft, reducedImageLayout),
      ).toEqual({
        x: 0,
        y: 50,
        width: 50,
        height: 50,
      });
    });
  });

  describe('when the sticker is at the bottom-right corner of the image', () => {
    // 元画像は width: 800, height: 600 とする
    const stickerAtBottomRight = {
      ...sticker,
      x: 700,
      y: 500,
    };

    test('keeps the sticker at the bottom-right corner when the image is enlarged', () => {
      expect(
        calculateStickerLayout(stickerAtBottomRight, enlargedImageLayout),
      ).toEqual({
        x: 1450,
        y: 1000,
        width: 200,
        height: 200,
      });
    });

    test('keeps the sticker at the bottom-right corner when the image is reduced', () => {
      expect(
        calculateStickerLayout(stickerAtBottomRight, reducedImageLayout),
      ).toEqual({
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
