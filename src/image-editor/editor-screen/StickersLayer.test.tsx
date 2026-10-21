import { Stage } from 'react-konva';
import Konva from 'konva';
import { render } from 'vitest-browser-react';
import { createTestImage } from '@/image-editor/test-utils.ts';
import { StickersLayer } from './StickersLayer.tsx';

test('resize handle has an enlarged hit area without covering the sticker center', async () => {
  let stage: Konva.Stage | null = null;
  await render(
    <Stage
      width={300}
      height={300}
      ref={(node) => {
        stage = node;
      }}
    >
      <StickersLayer
        image={createTestImage()}
        stickers={[{ id: 'sample', x: 100, y: 100, width: 100, height: 100 }]}
        imageScale={1}
        selectedStickerId="sample"
        onSelectSticker={() => {}}
        onStickerDragEnd={() => {}}
        onStickerTransformEnd={() => {}}
      />
    </Stage>,
  );
  const canvas = stage!;
  // `await render()`がReactのレンダーだけでなくcanvasの描画完了も待機するか不明
  // テストの安定性のためcanvasの描画を明示的に完了させる
  canvas.draw();

  // This point is outside the visible handle, but inside its enlarged hit area.
  expect(
    canvas.getIntersection({ x: 80, y: 100 })?.hasName('top-left') ?? false,
  ).toBe(true);
  expect(canvas.getIntersection({ x: 150, y: 150 })?.getClassName()).toBe(
    'Image',
  );
});
