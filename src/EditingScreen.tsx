import { Image, Layer, Stage } from 'react-konva';

export function EditingScreen({ image }: { image: HTMLImageElement }) {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Image image={image} scaleX={0.5} scaleY={0.5} />
      </Layer>
    </Stage>
  );
}
