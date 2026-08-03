import { calculateImageLayout } from '@/calculateImageLayout.ts';

describe('calculating image layout within a canvas', () => {
  test('fits and centers a landscape image', () => {
    const sizes = {
      canvasWidth: 1000,
      canvasHeight: 1000,
      imageWidth: 3000,
      imageHeight: 2400,
    };

    const { x, y, scale } = calculateImageLayout(sizes);

    expect(x).toBeCloseTo(0);
    expect(y).toBeCloseTo(100);
    expect(scale).toBeCloseTo(0.333);
  });

  test('fits and centers a portrait image', () => {
    const sizes = {
      canvasWidth: 1000,
      canvasHeight: 1000,
      imageWidth: 1000,
      imageHeight: 2000,
    };

    const { x, y, scale } = calculateImageLayout(sizes);

    expect(x).toBeCloseTo(250);
    expect(y).toBeCloseTo(0);
    expect(scale).toBeCloseTo(0.5);
  });

  test('fits an image without margins when aspect ratios match', () => {
    const sizes = {
      canvasWidth: 1000,
      canvasHeight: 1000,
      imageWidth: 2000,
      imageHeight: 2000,
    };

    const { x, y, scale } = calculateImageLayout(sizes);

    expect(x).toBeCloseTo(0);
    expect(y).toBeCloseTo(0);
    expect(scale).toBeCloseTo(0.5);
  });

  test('scales up a smaller image', () => {
    const sizes = {
      canvasWidth: 1000,
      canvasHeight: 1000,
      imageWidth: 500,
      imageHeight: 400,
    };

    const { x, y, scale } = calculateImageLayout(sizes);

    expect(x).toBe(0);
    expect(y).toBe(100);
    expect(scale).toBe(2);
  });
});
