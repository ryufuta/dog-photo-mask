import Konva from 'konva';
import type { Sticker } from '@/sticker/sticker.ts';

export async function copyCanvas(
  image: HTMLImageElement,
  stickerImage: HTMLImageElement,
  stickers: Sticker[],
) {
  const blob = await exportCanvasAsBlob(image, stickerImage, stickers);
  const data = [new ClipboardItem({ [blob.type]: blob })];
  await navigator.clipboard.write(data);
}

export async function downloadCanvas(
  image: HTMLImageElement,
  stickerImage: HTMLImageElement,
  stickers: Sticker[],
) {
  const blob = await exportCanvasAsBlob(image, stickerImage, stickers);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'dog-photo-mask.png';
  a.click();

  URL.revokeObjectURL(url);
}

export async function exportCanvasAsBlob(
  image: HTMLImageElement,
  stickerImage: HTMLImageElement,
  stickers: Sticker[],
) {
  const stage = new Konva.Stage({
    width: image.naturalWidth,
    height: image.naturalHeight,
    container: document.createElement('div'),
  });

  try {
    const layer = new Konva.Layer({ listening: false });
    stage.add(layer);

    const imageNode = new Konva.Image({
      image,
      x: 0,
      y: 0,
      width: image.naturalWidth,
      height: image.naturalHeight,
    });

    const stickerNodes = stickers.map(
      (sticker) =>
        new Konva.Image({
          image: stickerImage,
          x: sticker.x,
          y: sticker.y,
          width: sticker.width,
          height: sticker.height,
        }),
    );

    layer.add(imageNode, ...stickerNodes);
    layer.draw();

    const blob = await stage.toBlob();

    return blob;
  } finally {
    stage.destroy();
  }
}
