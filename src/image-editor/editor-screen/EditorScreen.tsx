import { useEffect, useEffectEvent, useState } from 'react';
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
    const newSticker = createSticker({ imageWidth, imageHeight });
    setStickers((stickers) => [...stickers, newSticker]);
    setSelectedStickerId(newSticker.id);
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

  function handleStickerTransformEnd(
    id: string,
    rect: { x: number; y: number; width: number; height: number },
  ) {
    setStickers((stickers) =>
      stickers.map((sticker) =>
        sticker.id === id ? { ...sticker, ...rect } : sticker,
      ),
    );
  }

  const handleDeleteSticker = useEffectEvent((e: KeyboardEvent) => {
    if (e.key !== 'Delete' && e.key !== 'Backspace') return;
    if (selectedStickerId === null) return;

    setStickers((stickers) =>
      stickers.filter((sticker) => sticker.id !== selectedStickerId),
    );
    setSelectedStickerId(null);
  });

  useEffect(() => {
    window.addEventListener('keydown', handleDeleteSticker);

    return () => {
      window.removeEventListener('keydown', handleDeleteSticker);
    };
  }, []);

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
        onStickerTransformEnd={handleStickerTransformEnd}
      />
    </section>
  );
}
