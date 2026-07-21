import { useLayoutEffect, useRef, useState } from 'react';
import { Image, Layer, Stage } from 'react-konva';

export function CanvasArea({ image }: { image: HTMLImageElement }) {
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const targetElement = containerRef.current;
    if (!targetElement) return;

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;

      const { inlineSize, blockSize } = entry.contentBoxSize[0];
      setStageSize({
        width: inlineSize,
        height: blockSize,
      });
    });

    observer.observe(targetElement);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="bg-surface flex-1 overflow-hidden">
      <Stage width={stageSize.width} height={stageSize.height}>
        <Layer>
          <Image image={image} scaleX={0.5} scaleY={0.5} />
        </Layer>
      </Stage>
    </div>
  );
}
