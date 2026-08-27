import { useEffect, useState } from 'react';
import { Image as KonvaImage } from 'react-konva';
import Konva from 'konva';
import smileImageUrl from '@/assets/stickers/smile.png';
import {
  toCanvasStickerRect,
  toImageStickerPosition,
} from './calculateStickerLayout.ts';
import type { Sticker } from './sticker.ts';

type Props = {
  ref: (node: Konva.Image) => () => void;
  sticker: Sticker;
  imageLayout: {
    x: number;
    y: number;
    scale: number;
  };
  onSelect: (id: string) => void;
  onStickerDragEnd: (position: { x: number; y: number }) => void;
};

export function CanvasSticker({
  ref,
  sticker,
  imageLayout,
  onSelect,
  onStickerDragEnd,
}: Props) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImage(img);
    };
    img.src = smileImageUrl;
  }, []);

  const { x, y, width, height } = toCanvasStickerRect(sticker, imageLayout);

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
          onStickerDragEnd(
            toImageStickerPosition(e.target.position(), imageLayout),
          );
        }}
      />
    )
  );
}
