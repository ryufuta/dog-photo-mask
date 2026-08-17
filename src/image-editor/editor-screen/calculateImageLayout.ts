type sizes = {
  canvasWidth: number;
  canvasHeight: number;
  imageWidth: number;
  imageHeight: number;
};

export function calculateImageLayout({
  canvasWidth,
  canvasHeight,
  imageWidth,
  imageHeight,
}: sizes) {
  const scale = Math.min(canvasWidth / imageWidth, canvasHeight / imageHeight);
  const x = (canvasWidth - imageWidth * scale) / 2;
  const y = (canvasHeight - imageHeight * scale) / 2;

  return { x, y, scale };
}
