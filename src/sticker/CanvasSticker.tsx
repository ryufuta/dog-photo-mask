import { useEffect, useState } from 'react';
import { Image as KonvaImage } from 'react-konva';
import Konva from 'konva';
import smileImageUrl from '@/assets/stickers/smile.png';
import {
  toCanvasStickerRect,
  toImageStickerPosition,
  toImageStickerRect,
} from './calculateStickerLayout.ts';
import type { Sticker } from './sticker.ts';

type Props = {
  ref: (node: Konva.Image) => () => void;
  sticker: Sticker;
  imageScale: number;
  onSelect: (id: string) => void;
  onDragEnd: (position: { x: number; y: number }) => void;
  onTransformEnd: (rect: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => void;
};

export function CanvasSticker({
  ref,
  sticker,
  imageScale,
  onSelect,
  onDragEnd,
  onTransformEnd,
}: Props) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const stickerRect = {
    x: sticker.x,
    y: sticker.y,
    width: sticker.width,
    height: sticker.height,
  };
  const { x, y, width, height } = toCanvasStickerRect(stickerRect, imageScale);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImage(img);
    };
    img.src = smileImageUrl;
  }, []);

  return (
    image && (
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
          onDragEnd(toImageStickerPosition(e.target.position(), imageScale));
        }}
        onTransformEnd={(e) => {
          const node = e.target;
          const canvasStickerRect = {
            x: node.x(),
            y: node.y(),
            width: node.width() * node.scaleX(),
            height: node.height() * node.scaleY(),
          };
          onTransformEnd(toImageStickerRect(canvasStickerRect, imageScale));

          node.scaleX(1);
          node.scaleY(1);
        }}
      />
    )
  );
}
