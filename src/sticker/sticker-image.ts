import smileImageUrl from '@/assets/stickers/smile.png';

export function createStickerLoader() {
  let imagePromise: Promise<HTMLImageElement> | undefined;

  return function loadStickerImage() {
    if (!imagePromise) {
      imagePromise = (async () => {
        try {
          const image = new Image();
          image.src = smileImageUrl;
          await image.decode();
          return image;
        } catch {
          imagePromise = undefined;
          throw new Error('Failed to load sticker image');
        }
      })();
    }

    return imagePromise;
  };
}

export const loadStickerImage = createStickerLoader();
