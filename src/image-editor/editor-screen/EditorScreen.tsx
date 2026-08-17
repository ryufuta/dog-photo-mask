import { useState } from 'react';
import type { Sticker } from '@/sticker/sticker.ts';
import { AddStickerButton } from './AddStickerButton.tsx';
import { CanvasArea } from './CanvasArea.tsx';
import { Toolbar } from './Toolbar.tsx';

export function EditorScreen({ image }: { image: HTMLImageElement }) {
  const [stickers, setStickers] = useState<Sticker[]>([]);

  function handleAddSticker() {
    const newSticker: Sticker = {
      id: crypto.randomUUID(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      width: 100,
      height: 100,
    };
    setStickers((stickers) => [...stickers, newSticker]);
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
