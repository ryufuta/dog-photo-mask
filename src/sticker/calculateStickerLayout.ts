import type { Sticker } from './sticker';

type ImageLayout = {
  x: number;
  y: number;
  scale: number;
};

export function toCanvasStickerRect(
  sticker: Sticker,
  imageLayout: ImageLayout,
) {
  return {
    x: imageLayout.x + sticker.x * imageLayout.scale,
    y: imageLayout.y + sticker.y * imageLayout.scale,
    width: sticker.width * imageLayout.scale,
    height: sticker.height * imageLayout.scale,
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
