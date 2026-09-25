import { Image as KonvaImage, Layer } from 'react-konva';

type Props = {
  image: HTMLImageElement;
  width: number;
  height: number;
};

export function BackgroundLayer({ image, width, height }: Props) {
  return (
    <Layer>
      <KonvaImage
        name="background-image"
        image={image}
        x={0}
        y={0}
        width={width}
        height={height}
      />
    </Layer>
  );
}
