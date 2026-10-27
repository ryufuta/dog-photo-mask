import {
  toCanvasRect,
  toImagePosition,
  toImageTransformedRect,
} from './coordinate.ts';

describe('toCanvasRect', () => {
  const stickerRect = { x: 700, y: 500, width: 100, height: 100 };

  test('scales the sticker rectangle on an enlarged canvas', () => {
    expect(toCanvasRect(stickerRect, 2)).toEqual({
      x: 1400,
      y: 1000,
      width: 200,
      height: 200,
    });
  });

  test('scales the sticker rectangle on a reduced canvas', () => {
    expect(toCanvasRect(stickerRect, 0.5)).toEqual({
      x: 350,
      y: 250,
      width: 50,
      height: 50,
    });
  });
});

describe('toImagePosition', () => {
  test('converts a position from an enlarged canvas to image coordinates', () => {
    expect(toImagePosition({ x: 1400, y: 1000 }, 2)).toEqual({
      x: 700,
      y: 500,
    });
  });

  test('converts a position from a reduced canvas to image coordinates', () => {
    expect(toImagePosition({ x: 350, y: 250 }, 0.5)).toEqual({
      x: 700,
      y: 500,
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
