import { createFaceStickers, createSticker } from './sticker.ts';

describe('createSticker', () => {
  test('the sticker size is 20% of the shorter side of the image', () => {
    const sticker = createSticker({
      imageWidth: 500,
      imageHeight: 400,
    });

    expect(sticker.width).toBe(80);
    expect(sticker.height).toBe(80);
  });

  test('places the sticker within the image', () => {
    const sticker = createSticker({
      imageWidth: 500,
      imageHeight: 400,
    });

    expect(sticker.x).toBeGreaterThanOrEqual(0);
    expect(sticker.y).toBeGreaterThanOrEqual(0);
    expect(sticker.x + sticker.width).toBeLessThanOrEqual(500);
    expect(sticker.y + sticker.height).toBeLessThanOrEqual(400);
  });
});

describe('createFaceStickers', () => {
  test('creates a sticker that circumscribes the face bounding box', () => {
    const faces = [{ x: 100, y: 50, width: 90, height: 120 }];

    const [sticker] = createFaceStickers(faces);

    expect(sticker.x).toBe(70);
    expect(sticker.y).toBe(35);
    expect(sticker.width).toBe(150);
    expect(sticker.height).toBe(150);
  });

  test('creates a sticker for each face bounding box', () => {
    const faces = [
      { x: 0, y: 0, width: 80, height: 80 },
      { x: 100, y: 50, width: 90, height: 120 },
    ];

    expect(createFaceStickers(faces)).toHaveLength(2);
  });

  test('returns an empty array when there are no faces', () => {
    expect(createFaceStickers([])).toEqual([]);
  });
});
