import { useState } from 'react';
import { createSticker, type Sticker } from '@/sticker/sticker.ts';
import { AddStickerButton } from './AddStickerButton.tsx';
import { CanvasArea } from './CanvasArea.tsx';
import { Toolbar } from './Toolbar.tsx';

type Props = {
  image: HTMLImageElement;
};

export function EditorScreen({ image }: Props) {
  const [stickers, setStickers] = useState<Sticker[]>([]);

  function handleAddSticker() {
    const imageWidth = image.naturalWidth;
    const imageHeight = image.naturalHeight;
    setStickers((stickers) => [
      ...stickers,
      createSticker({ imageWidth, imageHeight }),
    ]);
  }

  return (
    <section className="flex min-h-svh flex-col p-5">
      <Toolbar>
        <AddStickerButton onAddSticker={handleAddSticker} />
      </Toolbar>
      <CanvasArea image={image} stickers={stickers} />
    </section>
  );
}
