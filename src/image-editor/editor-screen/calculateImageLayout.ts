type sizes = {
  containerWidth: number;
  containerHeight: number;
  imageWidth: number;
  imageHeight: number;
};

export function calculateImageLayout({
  containerWidth,
  containerHeight,
  imageWidth,
  imageHeight,
}: sizes) {
  const scale = Math.min(
    containerWidth / imageWidth,
    containerHeight / imageHeight,
  );

  return { width: imageWidth * scale, height: imageHeight * scale, scale };
}
