import { Image, Layer, Stage } from 'react-konva';
import { calculateImageLayout } from '@/calculateImageLayout.ts';
import { useElementSize } from '@/useElementSize.ts';

export function CanvasArea({ image }: { image: HTMLImageElement }) {
  const [setRef, size] = useElementSize<HTMLDivElement>();
  const canvasWidth = size.width;
  const canvasHeight = size.height;
  const imageWidth = image.width;
  const imageHeight = image.height;

  const { x, y, scale } = calculateImageLayout({
    canvasWidth,
    canvasHeight,
    imageWidth,
    imageHeight,
  });

  return (
    <div ref={setRef} className="bg-surface flex-1 overflow-hidden">
      <Stage width={canvasWidth} height={canvasHeight}>
        <Layer>
          <Image image={image} x={x} y={y} scaleX={scale} scaleY={scale} />
        </Layer>
      </Stage>
    </div>
  );
}
