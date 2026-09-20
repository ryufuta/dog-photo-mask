import { Layer } from 'react-konva';
import type { Face } from '@/face-detection/face-detector.ts';
import { CanvasFaceDetection } from './CanvasFaceDetection.tsx';

type Props = {
  faces: Face[];
  imageScale: number;
};

export function DebugOverlay({ faces, imageScale }: Props) {
  return (
    <Layer listening={false}>
      {faces.map((face) => (
        <CanvasFaceDetection
          key={`${face.x}-${face.y}-${face.width}-${face.height}-${face.score.toFixed(2)}`}
          face={face}
          imageScale={imageScale}
        />
      ))}
    </Layer>
  );
}
