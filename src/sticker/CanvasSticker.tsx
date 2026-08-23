import { useEffect, useState } from 'react';
import { Image as KonvaImage } from 'react-konva';
import smileImageUrl from '@/assets/stickers/smile.png';
import { calculateStickerLayout } from './calculateStickerLayout.ts';
import type { Sticker } from './sticker.ts';

type Props = {
  sticker: Sticker;
  imageLayout: {
    x: number;
    y: number;
    scale: number;
  };
};

export function CanvasSticker({ sticker, imageLayout }: Props) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImage(img);
    };
    img.src = smileImageUrl;
  }, []);

  const { x, y, width, height } = calculateStickerLayout(sticker, imageLayout);

  return (
    image && (
      <KonvaImage image={image} x={x} y={y} width={width} height={height} />
    )
  );
}
