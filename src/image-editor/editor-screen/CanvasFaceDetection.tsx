import { Group, Rect, Text } from 'react-konva';
import type { Face } from '@/face-detection/face-detector.ts';

type Props = {
  face: Face;
  imageScale: number;
};

export function CanvasFaceDetection({ face, imageScale }: Props) {
  const x = face.x * imageScale;
  const y = face.y * imageScale;
  const width = face.width * imageScale;
  const height = face.height * imageScale;

  return (
    <Group x={x} y={y}>
      <Rect x={0} y={0} width={width} height={height} stroke="green" />
      <Text
        text={face.score.toFixed(2)}
        x={4}
        y={4}
        fontSize={16}
        fill="green"
      />
    </Group>
  );
}
