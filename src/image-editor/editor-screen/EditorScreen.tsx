import { useEffect, useEffectEvent, useState } from 'react';
import { Copy, CornerDownLeft, Download, Smile, X } from 'lucide-react';
import { notify as toast } from '@/components/notify';
import { Button } from '@/components/ui/button.tsx';
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

const secondaryButtonClassName =
  'border-[#d7c3a5] bg-[#f5e6cc] text-[#513b2c] hover:bg-[#ecd6b3] hover:text-[#513b2c]';

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
  const [isHelpDismissed, setIsHelpDismissed] = useState(false);

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
      toast.success('画像をコピーしました');
    } catch {
      toast.error('画像のコピーに失敗しました');
    }
  }

  async function handleDownload() {
    try {
      await downloadCanvas(image, stickerImage, stickers);
    } catch {
      toast.error('画像のダウンロードに失敗しました');
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

  function handleDeleteSticker() {
    if (selectedStickerId === null) return;

    setStickers((stickers) =>
      stickers.filter((sticker) => sticker.id !== selectedStickerId),
    );
    setSelectedStickerId(null);
  }

  const handleDeleteKey = useEffectEvent((e: KeyboardEvent) => {
    if (e.key !== 'Delete' && e.key !== 'Backspace') return;
    handleDeleteSticker();
  });

  useEffect(() => {
    window.addEventListener('keydown', handleDeleteKey);

    return () => {
      window.removeEventListener('keydown', handleDeleteKey);
    };
  }, []);

  return (
    <div className="-mt-6 flex flex-1 flex-col">
      <Toolbar label="スタンプの編集">
        <Button
          type="button"
          variant="outline"
          className={secondaryButtonClassName}
          onClick={handleAddSticker}
        >
          <Smile aria-hidden="true" />
          スタンプを追加
        </Button>
        <Button
          type="button"
          variant="outline"
          className={secondaryButtonClassName}
          onClick={handleDeleteSticker}
          disabled={selectedStickerId === null}
        >
          <X aria-hidden="true" />
          スタンプを削除
        </Button>
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
        showHelp={stickers.length > 0 && !isHelpDismissed}
        onDismissHelp={() => setIsHelpDismissed(true)}
      />
      <div>
        <Toolbar label="画像の保存">
          <Button
            type="button"
            variant="outline"
            className={secondaryButtonClassName}
            onClick={() => {
              void handleCopy();
            }}
          >
            <Copy aria-hidden="true" />
            画像をコピー
          </Button>
          <Button
            type="button"
            className="bg-[#513b2c] hover:bg-[#6a4e39]"
            onClick={() => {
              void handleDownload();
            }}
          >
            <Download aria-hidden="true" />
            画像を保存
          </Button>
        </Toolbar>
      </div>
      <div className="mt-5 text-center">
        <Button type="button" variant="link" onClick={onReset}>
          <CornerDownLeft aria-hidden="true" />
          別の写真を選ぶ
        </Button>
      </div>
    </div>
  );
}
