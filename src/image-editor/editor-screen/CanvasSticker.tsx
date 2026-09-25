import { Image as KonvaImage } from 'react-konva';
import Konva from 'konva';
import {
  type Rect,
  toCanvasRect,
  toImagePosition,
  toImageRect,
} from '@/lib/coordinate.ts';
import type { Sticker } from '@/sticker/sticker.ts';

type Props = {
  ref: (node: Konva.Image) => () => void;
  image: HTMLImageElement;
  sticker: Sticker;
  imageScale: number;
  onSelect: (id: string) => void;
  onDragEnd: (position: { x: number; y: number }) => void;
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
      onClick={() => {
        onSelect(sticker.id);
      }}
      onDragEnd={(e) => {
        onDragEnd(toImagePosition(e.target.position(), imageScale));
      }}
      onTransformEnd={(e) => {
        const node = e.target;
        const canvasStickerRect = {
          x: node.x(),
          y: node.y(),
          width: node.width() * node.scaleX(),
          height: node.height() * node.scaleY(),
        };
        onTransformEnd(toImageRect(canvasStickerRect, imageScale));

        node.scaleX(1);
        node.scaleY(1);
      }}
    />
  );
}
