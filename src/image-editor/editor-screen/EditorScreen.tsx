import { useEffect, useEffectEvent, useRef, useState } from 'react';
import Konva from 'konva';
import { createSticker, type Sticker } from '@/sticker/sticker.ts';
import { AddStickerButton } from './AddStickerButton.tsx';
import { CanvasArea } from './CanvasArea.tsx';
import { CopyButton } from './CopyButton.tsx';
import { Toolbar } from './Toolbar.tsx';

type Props = {
  image: HTMLImageElement;
};

export function EditorScreen({ image }: Props) {
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(
    null,
  );
  const canvasRef = useRef<Konva.Stage>(null);

  function handleAddSticker() {
    const imageWidth = image.naturalWidth;
    const imageHeight = image.naturalHeight;
    const newSticker = createSticker({ imageWidth, imageHeight });
    setStickers((stickers) => [...stickers, newSticker]);
    setSelectedStickerId(newSticker.id);
  }

  async function handleCopy() {
    if (!canvasRef.current) return;

    try {
      // KonvaのNode#toBlobの型注釈の不備でunknownになっているようなので型アサーションを使用
      const blob = (await canvasRef.current.toBlob()) as Blob;
      const data = [new ClipboardItem({ [blob.type]: blob })];
      await navigator.clipboard.write(data);
    } catch (error) {
      // TODO: UIに表示するよう変更
      console.error(error);
    }
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
        <CopyButton
          onCopy={() => {
            void handleCopy();
          }}
        />
      </Toolbar>
      <CanvasArea
        ref={canvasRef}
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
