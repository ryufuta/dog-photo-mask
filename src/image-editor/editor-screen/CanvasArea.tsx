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
  onSelectSticker: (id: string | null) => void;
  onStickerDragEnd: (id: string, position: { x: number; y: number }) => void;
  onStickerTransformEnd: (
    id: string,
    rect: { x: number; y: number; width: number; height: number },
  ) => void;
};

export function CanvasArea({
  image,
  stickers,
  selectedStickerId,
  onSelectSticker,
  onStickerDragEnd,
  onStickerTransformEnd,
}: Props) {
  const transformerRef = useRef<Konva.Transformer>(null);
  const stickersRef = useRef<Map<string, Konva.Image>>(new Map());
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
    <div
      ref={setRef}
      className="bg-surface flex flex-1 items-center justify-center overflow-hidden"
    >
      <Stage
        width={displayImageWidth}
        height={displayImageHeight}
        onClick={(e) => {
          const target = e.target;
          if (
            target === target.getStage() ||
            target.name() === 'background-image'
          ) {
            onSelectSticker(null);
          }
        }}
      >
        <Layer>
          <KonvaImage
            name="background-image"
            image={image}
            x={0}
            y={0}
            width={displayImageWidth}
            height={displayImageHeight}
          />
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
              imageScale={imageScale}
              onSelect={onSelectSticker}
              onDragEnd={(position) => {
                onStickerDragEnd(sticker.id, position);
              }}
              onTransformEnd={(rect) => {
                onStickerTransformEnd(sticker.id, rect);
              }}
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
