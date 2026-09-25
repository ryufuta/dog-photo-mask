import { useEffect, useRef } from 'react';
import { Layer, Transformer } from 'react-konva';
import Konva from 'konva';
import type { Rect } from '@/lib/coordinate.ts';
import type { Sticker } from '@/sticker/sticker.ts';
import { CanvasSticker } from './CanvasSticker.tsx';

type Props = {
  image: HTMLImageElement;
  stickers: Sticker[];
  imageScale: number;
  selectedStickerId: string | null;
  onSelectSticker: (id: string | null) => void;
  onStickerDragEnd: (id: string, position: { x: number; y: number }) => void;
  onStickerTransformEnd: (id: string, rect: Rect) => void;
};

export function StickersLayer({
  image,
  stickers,
  imageScale,
  selectedStickerId,
  onSelectSticker,
  onStickerDragEnd,
  onStickerTransformEnd,
}: Props) {
  const transformerRef = useRef<Konva.Transformer>(null);
  const stickersRef = useRef<Map<string, Konva.Image>>(new Map());

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
    <Layer>
      {stickers.map((sticker) => (
        <CanvasSticker
          key={sticker.id}
          ref={(node: Konva.Image) => {
            const map = stickersRef.current;
            map.set(sticker.id, node);

            return () => {
              map.delete(sticker.id);
            };
          }}
          image={image}
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
  );
}
