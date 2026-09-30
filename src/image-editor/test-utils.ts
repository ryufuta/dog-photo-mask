export function createTestImage(width: number = 100, height: number = 100) {
  const image = new Image();

  Object.defineProperties(image, {
    naturalWidth: { value: width },
    naturalHeight: { value: height },
  });

  return image;
}
