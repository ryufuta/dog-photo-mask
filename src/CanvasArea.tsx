import { Image as KonvaImage, Layer, Stage } from 'react-konva';
import { calculateImageLayout } from '@/calculateImageLayout.ts';
import { useElementSize } from '@/useElementSize.ts';

export function CanvasArea({ image }: { image: HTMLImageElement }) {
  const [setRef, size] = useElementSize<HTMLDivElement>();
  const canvasWidth = size.width;
  const canvasHeight = size.height;
  const imageWidth = image.naturalWidth;
  const imageHeight = image.naturalHeight;

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
          <KonvaImage image={image} x={x} y={y} scaleX={scale} scaleY={scale} />
        </Layer>
      </Stage>
    </div>
  );
}
