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
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(
    null,
  );

  function handleAddSticker() {
    const imageWidth = image.naturalWidth;
    const imageHeight = image.naturalHeight;
    setStickers((stickers) => [
      ...stickers,
      createSticker({ imageWidth, imageHeight }),
    ]);
  }

  function handleStickerDragEnd(
    id: string,
    position: { x: number; y: number },
  ) {
    setStickers((stickers) =>
      stickers.map((sticker) =>
        sticker.id === id ? { ...sticker, ...position } : sticker,
      ),
    );
  }

  return (
    <section className="flex min-h-svh flex-col p-5">
      <Toolbar>
        <AddStickerButton onAddSticker={handleAddSticker} />
      </Toolbar>
      <CanvasArea
        image={image}
        stickers={stickers}
        selectedStickerId={selectedStickerId}
        onSelectSticker={setSelectedStickerId}
        onStickerDragEnd={handleStickerDragEnd}
      />
    </section>
  );
}
