import { useEffect, useRef } from 'react';
import { Layer, Transformer } from 'react-konva';
import Konva from 'konva';
import type { Position, Rect } from '@/lib/coordinate.ts';
import type { Sticker } from '@/sticker/sticker.ts';
import { CanvasSticker } from './CanvasSticker.tsx';

type Props = {
  image: HTMLImageElement;
  stickers: Sticker[];
  imageScale: number;
  selectedStickerId: string | null;
  onSelectSticker: (id: string | null) => void;
  onStickerDragEnd: (id: string, position: Position) => void;
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
  const stickerNodesRef = useRef<Map<string, Konva.Image>>(new Map());

  useEffect(() => {
    const transformer = transformerRef.current;
    if (!transformer) return;

    const selectedNode =
      selectedStickerId === null
        ? undefined
        : stickerNodesRef.current.get(selectedStickerId);
    transformer.nodes(selectedNode ? [selectedNode] : []);
  }, [selectedStickerId]);

  return (
    <Layer>
      {stickers.map((sticker) => (
        <CanvasSticker
          key={sticker.id}
          ref={(node: Konva.Image) => {
            const map = stickerNodesRef.current;
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
        flipEnabled={false}
        anchorSize={16}
        anchorCornerRadius={4}
        anchorStyleFunc={(anchor) => {
          // Enlarge the invisible hit area to 44px.
          anchor.hitStrokeWidth(28);
        }}
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
