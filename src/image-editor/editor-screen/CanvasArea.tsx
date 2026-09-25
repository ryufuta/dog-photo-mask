import { Stage } from 'react-konva';
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
      className="bg-surface flex flex-1 items-center justify-center overflow-hidden"
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
    </div>
  );
}
