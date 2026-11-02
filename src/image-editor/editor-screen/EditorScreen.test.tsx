import Konva from 'konva';
import { toast, Toaster } from 'sonner';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { createTestImage } from '@/image-editor/test-utils.ts';
import { EditorScreen } from './EditorScreen.tsx';
import { copyCanvas, downloadCanvas } from './export-canvas.ts';

vi.mock(import('./export-canvas.ts'), () => ({
  copyCanvas: vi.fn(),
  downloadCanvas: vi.fn(),
}));

test('adds a sticker and selects it when the add sticker button is clicked', async () => {
  const screen = await render(
    <EditorScreen
      image={createTestImage()}
      stickerImage={createTestImage()}
      detectedFaces={[]}
      onReset={() => {}}
    />,
  );
  const stage = Konva.stages.at(-1)!;

  expect(stage.find('.sticker')).toHaveLength(0);

  await screen.getByRole('button', { name: 'スタンプを追加' }).click();

  const stickers = stage.find('.sticker');
  expect(stickers).toHaveLength(1);

  const transformer = stage.findOne<Konva.Transformer>('Transformer');
  if (!transformer) {
    throw new Error('Expected a Transformer');
  }

  expect(transformer.nodes()).toContain(stickers[0]);
});

test('selects a sticker when it is clicked, and deselects the sticker when a non-sticker part of the canvas is clicked', async () => {
  const screen = await render(
    <EditorScreen
      image={createTestImage()}
      stickerImage={createTestImage()}
      detectedFaces={[{ x: 50, y: 50, width: 10, height: 10, score: 0.9 }]}
      onReset={() => {}}
    />,
  );
  const stage = Konva.stages.at(-1)!;
  // テストの安定化のためResizeObserverによるStageサイズの計算結果が反映されるのを待機
  await expect.poll(() => stage.width()).toBeGreaterThan(0);
  await expect.poll(() => stage.height()).toBeGreaterThan(0);
  const stickers = stage.find('.sticker');
  expect(stickers).toHaveLength(1);

  const transformer = stage.findOne<Konva.Transformer>('Transformer');
  if (!transformer) {
    throw new Error('Expected a Transformer');
  }
  expect(transformer.nodes()).toHaveLength(0);

  // selects the sticker when it is clicked

  const sticker = stickers[0]!;
  const { x, y, width, height } = sticker.getClientRect({ relativeTo: stage });
  // テストの保守性のためスタンプのヒットエリア調整の影響を受けにくい中央をクリックする
  const stickerCenter = { x: x + width / 2, y: y + height / 2 };
  // テストの安定化のためCanvasにスタンプが描画されてクリック可能になるのを待機
  await expect.poll(() => stage.getIntersection(stickerCenter)).toBe(sticker);
  await userEvent.click(stage.container(), { position: stickerCenter });

  const deleteButton = screen.getByRole('button', { name: 'スタンプを削除' });
  // テストの安定化のためスタンプの選択状態が画面に反映されるのを待機
  await expect.element(deleteButton).toBeEnabled();
  expect(transformer.nodes()).toContain(sticker);

  // deselects a sticker when a non-sticker part of the canvas is clicked

  await userEvent.click(stage.container(), { position: { x: 0, y: 0 } });

  await expect.element(deleteButton).toBeDisabled();
  expect(transformer.nodes()).toHaveLength(0);
});

test('enables the delete sticker button only when a selected sticker exists', async () => {
  const screen = await render(
    <EditorScreen
      image={createTestImage()}
      stickerImage={createTestImage()}
      detectedFaces={[{ x: 0, y: 0, width: 10, height: 10, score: 0.9 }]}
      onReset={() => {}}
    />,
  );
  const stage = Konva.stages.at(-1)!;

  expect(stage.find('.sticker')).toHaveLength(1);
  const transformer = stage.findOne<Konva.Transformer>('Transformer');
  if (!transformer) {
    throw new Error('Expected a Transformer');
  }
  // 顔検出で追加されたスタンプは選択状態にない
  expect(transformer.nodes()).toHaveLength(0);

  const deleteButton = screen.getByRole('button', { name: 'スタンプを削除' });

  await expect.element(deleteButton).toBeDisabled();

  await screen.getByRole('button', { name: 'スタンプを追加' }).click();

  await expect.element(deleteButton).toBeEnabled();
});

test('deletes only the selected sticker when the delete sticker button is clicked', async () => {
  const { screen, stage, unselectedSticker } =
    await renderEditorWithTwoStickers();

  await screen.getByRole('button', { name: 'スタンプを削除' }).click();

  const remainingStickers = stage.find('.sticker');
  expect(remainingStickers).toHaveLength(1);
  expect(remainingStickers[0]).toBe(unselectedSticker);
});

test('deletes only the selected sticker when the Delete key is pressed', async () => {
  const { stage, unselectedSticker } = await renderEditorWithTwoStickers();

  await userEvent.keyboard('{Delete}');

  const remainingStickers = stage.find('.sticker');
  expect(remainingStickers).toHaveLength(1);
  expect(remainingStickers[0]).toBe(unselectedSticker);
});

test('deletes only the selected sticker when the Backspace key is pressed', async () => {
  const { stage, unselectedSticker } = await renderEditorWithTwoStickers();

  await userEvent.keyboard('{Backspace}');

  const remainingStickers = stage.find('.sticker');
  expect(remainingStickers).toHaveLength(1);
  expect(remainingStickers[0]).toBe(unselectedSticker);
});

test('moves a sticker when it is dragged', async () => {
  await render(
    <EditorScreen
      image={createTestImage()}
      stickerImage={createTestImage()}
      detectedFaces={[{ x: 50, y: 50, width: 10, height: 10, score: 0.9 }]}
      onReset={() => {}}
    />,
  );
  const stage = Konva.stages.at(-1)!;
  await expect.poll(() => stage.width()).toBeGreaterThan(0);
  await expect.poll(() => stage.height()).toBeGreaterThan(0);

  const stickers = stage.find('.sticker');
  expect(stickers).toHaveLength(1);
  const sticker = stickers[0]!;
  const initialPosition = sticker.position();

  const { x, y, width, height } = sticker.getClientRect({ relativeTo: stage });
  // テストの保守性のためスタンプのヒットエリア調整の影響を受けにくい中央をドラッグする
  const start = { x: x + width / 2, y: y + height / 2 };
  const end = { x: start.x + 50, y: start.y + 30 };
  // テストの安定化のためCanvasにスタンプが描画されてドラッグ可能になるのを待機
  await expect.poll(() => stage.getIntersection(start)).toBe(sticker);

  const container = stage.container();
  const content = container.querySelector('.konvajs-content');
  if (!content) {
    throw new Error('Expected Konva content');
  }
  const stageRect = container.getBoundingClientRect();
  const toClientPosition = ({ x, y }: { x: number; y: number }) => ({
    clientX: stageRect.left + x,
    clientY: stageRect.top + y,
  });
  content.dispatchEvent(
    new MouseEvent('mousedown', { ...toClientPosition(start), bubbles: true }),
  );
  window.dispatchEvent(
    new MouseEvent('mousemove', { ...toClientPosition(end), bubbles: true }),
  );
  window.dispatchEvent(
    new MouseEvent('mouseup', { ...toClientPosition(end), bubbles: true }),
  );

  expect(sticker.x()).toBeCloseTo(initialPosition.x + 50);
  expect(sticker.y()).toBeCloseTo(initialPosition.y + 30);
});

test('shows sticker instructions when the first sticker is added', async () => {
  const screen = await render(
    <EditorScreen
      image={createTestImage()}
      stickerImage={createTestImage()}
      detectedFaces={[]}
      onReset={() => {}}
    />,
  );

  await expect
    .element(screen.getByText('スタンプを選んでドラッグで移動、'))
    .not.toBeInTheDocument();

  await screen.getByRole('button', { name: 'スタンプを追加' }).click();

  await expect
    .element(screen.getByText('スタンプを選んでドラッグで移動、'))
    .toBeVisible();
});

test('dismissed sticker instructions stay closed when another sticker is added', async () => {
  const screen = await render(
    <EditorScreen
      image={createTestImage()}
      stickerImage={createTestImage()}
      detectedFaces={[{ x: 0, y: 0, width: 10, height: 10, score: 0.9 }]}
      onReset={() => {}}
    />,
  );

  await expect
    .element(screen.getByText('スタンプを選んでドラッグで移動、'))
    .toBeVisible();

  await screen
    .getByRole('button', { name: 'スタンプの操作説明を閉じる' })
    .click();

  await expect
    .element(screen.getByText('スタンプを選んでドラッグで移動、'))
    .not.toBeInTheDocument();

  await screen.getByRole('button', { name: 'スタンプを追加' }).click();

  await expect
    .element(screen.getByText('スタンプを選んでドラッグで移動、'))
    .not.toBeInTheDocument();
});

test('shows an error message when copying the canvas to the clipboard fails', async () => {
  vi.mocked(copyCanvas).mockRejectedValue(
    new Error('Konva: toBlob() failed, the canvas was not encoded'),
  );

  const image = createTestImage();
  const stickerImage = createTestImage();

  const screen = await render(
    <>
      <Toaster position="top-right" />
      <EditorScreen
        image={image}
        stickerImage={stickerImage}
        detectedFaces={[]}
        onReset={() => {}}
      />
    </>,
  );

  await screen.getByRole('button', { name: '画像をコピー' }).click();

  await expect
    .element(screen.getByText('画像のコピーに失敗しました'))
    .toBeVisible();

  // トーストが次のテストまで残るのを防ぐ
  toast.dismiss();
});

test('shows an error message when the canvas download fails', async () => {
  vi.mocked(downloadCanvas).mockRejectedValue(
    new Error('Konva: toBlob() failed, the canvas was not encoded'),
  );

  const image = createTestImage();
  const stickerImage = createTestImage();

  const screen = await render(
    <>
      <Toaster position="top-right" />
      <EditorScreen
        image={image}
        stickerImage={stickerImage}
        detectedFaces={[]}
        onReset={() => {}}
      />
    </>,
  );

  await screen.getByRole('button', { name: '画像を保存' }).click();

  await expect
    .element(screen.getByText('画像のダウンロードに失敗しました'))
    .toBeVisible();

  toast.dismiss();
});

async function renderEditorWithTwoStickers() {
  const screen = await render(
    <EditorScreen
      image={createTestImage()}
      stickerImage={createTestImage()}
      detectedFaces={[]}
      onReset={() => {}}
    />,
  );
  const stage = Konva.stages.at(-1)!;
  const addButton = screen.getByRole('button', { name: 'スタンプを追加' });

  await addButton.click();
  await addButton.click();

  const stickers = stage.find('.sticker');
  expect(stickers).toHaveLength(2);

  const transformer = stage.findOne<Konva.Transformer>('Transformer');
  if (!transformer) {
    throw new Error('Expected a Transformer');
  }
  const selectedNodes = transformer.nodes();
  expect(selectedNodes).toHaveLength(1);

  const selectedSticker = selectedNodes[0]!;
  expect(stickers).toContain(selectedSticker);

  return {
    screen,
    stage,
    unselectedSticker: stickers.find((sticker) => sticker !== selectedSticker)!,
  };
}
