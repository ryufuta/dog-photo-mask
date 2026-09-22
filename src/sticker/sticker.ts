import type { Rect } from '@/lib/coordinate.ts';

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

export function createFaceStickers(faceRects: Rect[]): Sticker[] {
  return faceRects.map(({ x, y, width, height }) => {
    // MediaPipe（BlazeFace）では顔の矩形は正方形だが、他のモデルにも対応するため長方形を想定する
    // スタンプは円形なのでスタンプの座標を顔の座標に設定すると以下の問題がある
    // - スタンプが顔の矩形に内接するよう配置されるためスタンプから顔がはみ出る
    // - 顔の矩形が長方形の場合にスタンプが楕円形に歪められる
    // 問題解決のためスタンプの座標を顔の矩形の外接円の座標にする
    const stickerSize = Math.round(Math.hypot(width, height));

    return {
      id: crypto.randomUUID(),
      x: x - Math.round((stickerSize - width) / 2),
      y: y - Math.round((stickerSize - height) / 2),
      width: stickerSize,
      height: stickerSize,
    };
  });
}
