import Konva from 'konva';
import { Stage } from 'react-konva';
import { render } from 'vitest-browser-react';
import { createTestImage } from '@/image-editor/test-utils';
import { StickersLayer } from './StickersLayer';

test.each([true, false])(
  'resize handle hit area follows touch input (%s) without covering the sticker center',
  async (touch) => {
    const matchMedia = window.matchMedia.bind(window);
    vi.spyOn(window, 'matchMedia').mockImplementation((query) => {
      const media = matchMedia(query);
      if (query === '(any-pointer: coarse)') {
        Object.defineProperty(media, 'matches', { value: touch });
      }
      return media;
    });
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
    canvas.draw();
    // This point is outside the visible handle, but inside its touch target.
    expect(
      canvas.getIntersection({ x: 80, y: 100 })?.hasName('top-left') ?? false,
    ).toBe(touch);
    expect(canvas.getIntersection({ x: 150, y: 150 })?.getClassName()).toBe(
      'Image',
    );
  },
);
