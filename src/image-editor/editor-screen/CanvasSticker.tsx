import { Image as KonvaImage } from 'react-konva';
import Konva from 'konva';
import {
  type Position,
  type Rect,
  toCanvasRect,
  toImagePosition,
  toImageTransformedRect,
} from '@/lib/coordinate.ts';
import type { Sticker } from '@/sticker/sticker.ts';

type Props = {
  ref: (node: Konva.Image) => () => void;
  image: HTMLImageElement;
  sticker: Sticker;
  imageScale: number;
  onSelect: (id: string) => void;
  onDragEnd: (position: Position) => void;
  onTransformEnd: (rect: Rect) => void;
};

export function CanvasSticker({
  ref,
  image,
  sticker,
  imageScale,
  onSelect,
  onDragEnd,
  onTransformEnd,
}: Props) {
  const { x, y, width, height } = toCanvasRect(sticker, imageScale);

  return (
    <KonvaImage
      ref={ref}
      image={image}
      x={x}
      y={y}
      width={width}
      height={height}
      draggable
      onMouseEnter={(e) => {
        const stage = e.target.getStage();
        if (stage) stage.container().style.cursor = 'pointer';
      }}
      onMouseLeave={(e) => {
        const stage = e.target.getStage();
        if (stage) stage.container().style.cursor = 'default';
      }}
      onPointerClick={() => {
        onSelect(sticker.id);
      }}
      onDragEnd={(e) => {
        onDragEnd(toImagePosition(e.target.position(), imageScale));
      }}
      onTransformEnd={(e) => {
        const node = e.target;
        onTransformEnd(
          toImageTransformedRect(
            {
              x: node.x(),
              y: node.y(),
              width: node.width(),
              height: node.height(),
              scaleX: node.scaleX(),
              scaleY: node.scaleY(),
            },
            imageScale,
          ),
        );

        node.scaleX(1);
        node.scaleY(1);
      }}
    />
  );
}
