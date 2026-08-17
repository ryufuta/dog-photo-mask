import { useEffect, useState } from 'react';
import { Image as KonvaImage } from 'react-konva';
import smileImageUrl from '@/assets/stickers/smile.png';
import type { Sticker } from './sticker.ts';

type Props = {
  sticker: Sticker;
};

export function CanvasSticker({ sticker }: Props) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImage(img);
    };
    img.src = smileImageUrl;
  }, []);

  const { x, y, width, height } = sticker;

  return (
    image && (
      <KonvaImage image={image} x={x} y={y} width={width} height={height} />
    )
  );
}
