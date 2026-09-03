import { calculateImageLayout } from './calculateImageLayout.ts';

test('fits a landscape image within the container', () => {
  const sizes = {
    containerWidth: 1000,
    containerHeight: 1000,
    imageWidth: 3000,
    imageHeight: 2400,
  };

  const { scale, ...canvasSize } = calculateImageLayout(sizes);

  expect(canvasSize).toEqual({
    width: 1000,
    height: 800,
  });
  expect(scale).toBeCloseTo(0.333);
});

test('fits a portrait image within the container', () => {
  const sizes = {
    containerWidth: 1000,
    containerHeight: 1000,
    imageWidth: 1000,
    imageHeight: 2000,
  };

  expect(calculateImageLayout(sizes)).toEqual({
    width: 500,
    height: 1000,
    scale: 0.5,
  });
});

test('fits an image without margins when aspect ratios match', () => {
  const sizes = {
    containerWidth: 1000,
    containerHeight: 1000,
    imageWidth: 2000,
    imageHeight: 2000,
  };

  expect(calculateImageLayout(sizes)).toEqual({
    width: 1000,
    height: 1000,
    scale: 0.5,
  });
});

test('scales up a smaller image', () => {
  const sizes = {
    containerWidth: 1000,
    containerHeight: 1000,
    imageWidth: 500,
    imageHeight: 400,
  };

  expect(calculateImageLayout(sizes)).toEqual({
    width: 1000,
    height: 800,
    scale: 2,
  });
});
