// アップロードされた元画像を基準とする座標
export type Sticker = {
  id: string; // UUID
  x: number;
  y: number;
  width: number;
  height: number;
};

type ImageSize = {
  imageWidth: number;
  imageHeight: number;
};

export function createSticker(imageSize: ImageSize): Sticker {
  const { imageWidth, imageHeight } = imageSize;
  const stickerSize = Math.min(imageWidth, imageHeight) * 0.2;

  return {
    id: crypto.randomUUID(),
    x: Math.random() * (imageWidth - stickerSize),
    y: Math.random() * (imageHeight - stickerSize),
    width: stickerSize,
    height: stickerSize,
  };
}
