import { Stage } from 'react-konva';
import { X } from 'lucide-react';
import type { Face } from '@/face-detection/face-detector.ts';
import type { Rect } from '@/lib/coordinate.ts';
import type { Sticker } from '@/sticker/sticker.ts';
import { BackgroundLayer } from './BackgroundLayer.tsx';
import { calculateImageLayout } from './calculateImageLayout.ts';
import { DebugOverlay } from './DebugOverlay.tsx';
import { StickersLayer } from './StickersLayer.tsx';
import { useElementSize } from './useElementSize.ts';

type Props = {
  image: HTMLImageElement;
  stickerImage: HTMLImageElement;
  faces: Face[];
  stickers: Sticker[];
  selectedStickerId: string | null;
  onSelectSticker: (id: string | null) => void;
  onStickerDragEnd: (id: string, position: { x: number; y: number }) => void;
  onStickerTransformEnd: (id: string, rect: Rect) => void;
  showHelp: boolean;
  onDismissHelp: () => void;
};

export function CanvasArea({
  image,
  stickerImage,
  faces,
  stickers,
  selectedStickerId,
  onSelectSticker,
  onStickerDragEnd,
  onStickerTransformEnd,
  showHelp,
  onDismissHelp,
}: Props) {
  const [setRef, size] = useElementSize<HTMLDivElement>();

  const containerWidth = size.width;
  const containerHeight = size.height;
  const imageWidth = image.naturalWidth;
  const imageHeight = image.naturalHeight;

  const imageLayout = calculateImageLayout({
    containerWidth,
    containerHeight,
    imageWidth,
    imageHeight,
  });
  const displayImageWidth = imageLayout.width;
  const displayImageHeight = imageLayout.height;
  const imageScale = imageLayout.scale;

  return (
    <div
      ref={setRef}
      className="mt-2 mb-1 flex w-full shrink-0 items-center justify-center"
      style={{
        aspectRatio: `${imageWidth} / ${imageHeight}`,
        maxHeight: 'min(56svh, 560px)',
      }}
    >
      <div
        className="relative"
        style={{ width: displayImageWidth, height: displayImageHeight }}
      >
        <Stage
          width={displayImageWidth}
          height={displayImageHeight}
          onClick={(e) => {
            if (e.target === e.target.getStage()) {
              onSelectSticker(null);
            }
          }}
        >
          <BackgroundLayer
            image={image}
            width={displayImageWidth}
            height={displayImageHeight}
          />
          <StickersLayer
            image={stickerImage}
            stickers={stickers}
            imageScale={imageScale}
            selectedStickerId={selectedStickerId}
            onSelectSticker={onSelectSticker}
            onStickerDragEnd={onStickerDragEnd}
            onStickerTransformEnd={onStickerTransformEnd}
          />

          {import.meta.env.DEV && (
            <DebugOverlay faces={faces} imageScale={imageScale} />
          )}
        </Stage>
        {showHelp && (
          <div className="pointer-events-none absolute right-2 bottom-2 left-2 rounded-lg border border-[#d7c3a5] bg-[#fffaf0]/80 px-9 py-2 text-center text-xs leading-5 text-[#513b2c] shadow-sm">
            <p>
              <span className="inline-block">
                スタンプを選んでドラッグで移動、
              </span>
              <span className="inline-block">四隅でサイズを調整できます。</span>
            </p>
            <button
              type="button"
              aria-label="スタンプの操作説明を閉じる"
              onClick={onDismissHelp}
              className="pointer-events-auto absolute top-1 right-1 flex size-8 items-center justify-center rounded-md hover:bg-[#f5e6cc] focus-visible:outline-2 focus-visible:outline-[#513b2c]"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
