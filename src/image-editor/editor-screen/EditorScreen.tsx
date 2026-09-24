import { useEffect, useEffectEvent, useState } from 'react';
import { Button } from '@/components/Button.tsx';
import type { Face } from '@/face-detection/face-detector.ts';
import type { Rect } from '@/lib/coordinate.ts';
import {
  createFaceStickers,
  createSticker,
  type Sticker,
} from '@/sticker/sticker.ts';
import { CanvasArea } from './CanvasArea.tsx';
import { copyCanvas, downloadCanvas } from './export-canvas.ts';
import { Toolbar } from './Toolbar.tsx';

type Props = {
  image: HTMLImageElement;
  stickerImage: HTMLImageElement;
  detectedFaces: Face[];
  onReset: () => void;
};

export function EditorScreen({
  image,
  stickerImage,
  detectedFaces,
  onReset,
}: Props) {
  const [stickers, setStickers] = useState<Sticker[]>(() =>
    createFaceStickers(detectedFaces),
  );
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

  async function handleCopy() {
    try {
      await copyCanvas(image, stickerImage, stickers);
      // TODO: コピー成功をUIに表示
    } catch (error) {
      // TODO: UIに表示するよう変更
      console.error(error);
    }
  }

  async function handleDownload() {
    try {
      await downloadCanvas(image, stickerImage, stickers);
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

  function handleStickerTransformEnd(id: string, rect: Rect) {
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
        <Button onClick={onReset}>リセット</Button>
      </Toolbar>
      <CanvasArea
        image={image}
        stickerImage={stickerImage}
        faces={detectedFaces}
        stickers={stickers}
        selectedStickerId={selectedStickerId}
        onSelectSticker={setSelectedStickerId}
        onStickerDragEnd={handleStickerDragEnd}
        onStickerTransformEnd={handleStickerTransformEnd}
      />
    </section>
  );
}
