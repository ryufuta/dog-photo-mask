import { Image, Layer, Stage } from 'react-konva';
import { useElementSize } from '@/useElementSize.ts';

export function CanvasArea({ image }: { image: HTMLImageElement }) {
  const [setRef, size] = useElementSize<HTMLDivElement>();

  return (
    <div ref={setRef} className="bg-surface flex-1 overflow-hidden">
      <Stage width={size.width} height={size.height}>
        <Layer>
          <Image image={image} scaleX={0.5} scaleY={0.5} />
        </Layer>
      </Stage>
    </div>
  );
}
