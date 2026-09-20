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
