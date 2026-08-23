import { createSticker } from './sticker.ts';

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
