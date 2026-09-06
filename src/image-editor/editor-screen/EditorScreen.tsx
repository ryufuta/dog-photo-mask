import { useEffect, useEffectEvent, useRef, useState } from 'react';
import { Button } from '@/components/Button.tsx';
import { createSticker, type Sticker } from '@/sticker/sticker.ts';
import { CanvasArea, type CanvasAreaHandle } from './CanvasArea.tsx';
import { Toolbar } from './Toolbar.tsx';

type Props = {
  image: HTMLImageElement;
};

export function EditorScreen({ image }: Props) {
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(
    null,
  );
  const canvasAreaRef = useRef<CanvasAreaHandle>(null);

  function handleAddSticker() {
    const imageWidth = image.naturalWidth;
    const imageHeight = image.naturalHeight;
    const newSticker = createSticker({ imageWidth, imageHeight });
    setStickers((stickers) => [...stickers, newSticker]);
    setSelectedStickerId(newSticker.id);
  }

  async function handleCopy() {
    if (!canvasAreaRef.current) return;

    try {
      const blob = await canvasAreaRef.current.exportAsBlob();
      if (!blob) return;

      const data = [new ClipboardItem({ [blob.type]: blob })];
      await navigator.clipboard.write(data);
    } catch (error) {
      // TODO: UIに表示するよう変更
      console.error(error);
    }
  }

  async function handleDownload() {
    if (!canvasAreaRef.current) return;

    try {
      const blob = await canvasAreaRef.current.exportAsBlob();
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'dog-photo-mask.png';
      a.click();

      URL.revokeObjectURL(url);
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
        <Button onClick={handleAddSticker}>スタンプ追加</Button>
        <Button
          onClick={() => {
            void handleCopy();
          }}
        >
          コピー
        </Button>
        <Button
          onClick={() => {
            void handleDownload();
          }}
        >
          ダウンロード
        </Button>
      </Toolbar>
      <CanvasArea
        ref={canvasAreaRef}
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
