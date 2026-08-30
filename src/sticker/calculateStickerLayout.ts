type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};
type ImageLayout = {
  x: number;
  y: number;
  scale: number;
};

export function toCanvasStickerRect(
  stickerRect: Rect,
  imageLayout: ImageLayout,
) {
  return {
    x: imageLayout.x + stickerRect.x * imageLayout.scale,
    y: imageLayout.y + stickerRect.y * imageLayout.scale,
    width: stickerRect.width * imageLayout.scale,
    height: stickerRect.height * imageLayout.scale,
  };
}

export function toImageStickerPosition(
  canvasStickerPosition: { x: number; y: number },
  imageLayout: ImageLayout,
) {
  return {
    x: (canvasStickerPosition.x - imageLayout.x) / imageLayout.scale,
    y: (canvasStickerPosition.y - imageLayout.y) / imageLayout.scale,
  };
}

export function toImageStickerRect(
  canvasStickerRect: Rect,
  imageLayout: ImageLayout,
) {
  const position = toImageStickerPosition(
    { x: canvasStickerRect.x, y: canvasStickerRect.y },
    imageLayout,
  );

  return {
    ...position,
    width: canvasStickerRect.width / imageLayout.scale,
    height: canvasStickerRect.height / imageLayout.scale,
  };
}
