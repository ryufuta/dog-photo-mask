import { useEffect, useRef } from 'react';
import { Image as KonvaImage, Layer, Stage, Transformer } from 'react-konva';
import Konva from 'konva';
import { CanvasSticker } from '@/sticker/CanvasSticker.tsx';
import type { Sticker } from '@/sticker/sticker.ts';
import { calculateImageLayout } from './calculateImageLayout.ts';
import { useElementSize } from './useElementSize.ts';

type Props = {
  image: HTMLImageElement;
  stickers: Sticker[];
  selectedStickerId: string | null;
  onSelectSticker: (id: string) => void;
  onStickerDragEnd: (id: string, position: { x: number; y: number }) => void;
};

export function CanvasArea({
  image,
  stickers,
  selectedStickerId,
  onSelectSticker,
  onStickerDragEnd,
}: Props) {
  const transformerRef = useRef<Konva.Transformer>(null);
  const stickersRef = useRef<Map<string, Konva.Image>>(new Map());
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

  function updateTransformer(nodes: Konva.Image[]) {
    const transformer = transformerRef.current;
    if (!transformer) return;

    transformer.nodes(nodes);
  }

  useEffect(() => {
    const map = stickersRef.current;
    let nodes: Konva.Image[] = [];
    if (selectedStickerId) {
      const node = map.get(selectedStickerId);
      if (node) {
        nodes = [node];
      }
    }
    updateTransformer(nodes);
  }, [selectedStickerId]);

  return (
    <div ref={setRef} className="bg-surface flex-1 overflow-hidden">
      <Stage width={canvasWidth} height={canvasHeight}>
        <Layer>
          <KonvaImage image={image} x={x} y={y} scaleX={scale} scaleY={scale} />
          {stickers.map((sticker) => (
            <CanvasSticker
              key={sticker.id}
              ref={(node: Konva.Image) => {
                const map = stickersRef.current;
                map.set(sticker.id, node);

                if (sticker.id === selectedStickerId) {
                  updateTransformer([node]);
                }

                return () => {
                  map.delete(sticker.id);
                };
              }}
              sticker={sticker}
              imageLayout={{ x, y, scale }}
              onSelect={onSelectSticker}
              onStickerDragEnd={(position) =>
                onStickerDragEnd(sticker.id, position)
              }
            />
          ))}
          <Transformer
            ref={transformerRef}
            rotateEnabled={false}
            anchorSize={8}
            keepRatio
            enabledAnchors={[
              'top-left',
              'top-right',
              'bottom-left',
              'bottom-right',
            ]}
          />
        </Layer>
      </Stage>
    </div>
  );
}
