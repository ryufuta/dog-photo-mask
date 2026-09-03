type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function toCanvasStickerRect(stickerRect: Rect, imageScale: number) {
  return {
    x: stickerRect.x * imageScale,
    y: stickerRect.y * imageScale,
    width: stickerRect.width * imageScale,
    height: stickerRect.height * imageScale,
  };
}

export function toImageStickerPosition(
  canvasStickerPosition: { x: number; y: number },
  imageScale: number,
) {
  return {
    x: canvasStickerPosition.x / imageScale,
    y: canvasStickerPosition.y / imageScale,
  };
}

export function toImageStickerRect(
  canvasStickerRect: Rect,
  imageScale: number,
) {
  const position = toImageStickerPosition(
    { x: canvasStickerRect.x, y: canvasStickerRect.y },
    imageScale,
  );

  return {
    ...position,
    width: canvasStickerRect.width / imageScale,
    height: canvasStickerRect.height / imageScale,
  };
}
