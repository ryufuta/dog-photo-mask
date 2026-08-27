import { Image as KonvaImage, Layer, Stage } from 'react-konva';
import { CanvasSticker } from '@/sticker/CanvasSticker.tsx';
import type { Sticker } from '@/sticker/sticker.ts';
import { calculateImageLayout } from './calculateImageLayout.ts';
import { useElementSize } from './useElementSize.ts';

type Props = {
  image: HTMLImageElement;
  stickers: Sticker[];
  onSelectSticker: (id: string) => void;
  onStickerDragEnd: (id: string, position: { x: number; y: number }) => void;
};

export function CanvasArea({
  image,
  stickers,
  onSelectSticker,
  onStickerDragEnd,
}: Props) {
  const [setRef, size] = useElementSize<HTMLDivElement>();
  const canvasWidth = size.width;
  const canvasHeight = size.height;
  const imageWidth = image.naturalWidth;
  const imageHeight = image.naturalHeight;

  const { x, y, scale } = calculateImageLayout({
    canvasWidth,
    canvasHeight,
    imageWidth,
    imageHeight,
  });

  return (
    <div ref={setRef} className="bg-surface flex-1 overflow-hidden">
      <Stage width={canvasWidth} height={canvasHeight}>
        <Layer>
          <KonvaImage image={image} x={x} y={y} scaleX={scale} scaleY={scale} />
          {stickers.map((sticker) => (
            <CanvasSticker
              key={sticker.id}
              sticker={sticker}
              imageLayout={{ x, y, scale }}
              onSelect={onSelectSticker}
              onStickerDragEnd={(position) =>
                onStickerDragEnd(sticker.id, position)
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
