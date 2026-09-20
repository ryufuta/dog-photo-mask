type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function toCanvasRect(imageRect: Rect, imageScale: number): Rect {
  return {
    x: imageRect.x * imageScale,
    y: imageRect.y * imageScale,
    width: imageRect.width * imageScale,
    height: imageRect.height * imageScale,
  };
}

export function toImagePosition(
  canvasPosition: { x: number; y: number },
  imageScale: number,
) {
  return {
    x: canvasPosition.x / imageScale,
    y: canvasPosition.y / imageScale,
  };
}

export function toImageRect(canvasRect: Rect, imageScale: number): Rect {
  const position = toImagePosition(
    { x: canvasRect.x, y: canvasRect.y },
    imageScale,
  );

  return {
    ...position,
    width: canvasRect.width / imageScale,
    height: canvasRect.height / imageScale,
  };
}
