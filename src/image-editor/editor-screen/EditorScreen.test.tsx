import Konva from 'konva';
import { toast, Toaster } from 'sonner';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { Face } from '@/face-detection/face-detector.ts';
import { createTestImage } from '@/image-editor/test-utils.ts';
import { EditorScreen } from './EditorScreen.tsx';
import { copyCanvas, downloadCanvas } from './export-canvas.ts';

vi.mock(import('./export-canvas.ts'), () => ({
  copyCanvas: vi.fn(),
  downloadCanvas: vi.fn(),
}));

test('adds a sticker and selects it when the add sticker button is clicked', async () => {
  const { screen, stage } = await renderEditor();

  expect(stage.find('.sticker')).toHaveLength(0);

  await screen.getByRole('button', { name: 'スタンプを追加' }).click();

  const stickers = stage.find('.sticker');
  expect(stickers).toHaveLength(1);

  const transformer = getTransformer(stage);

  expect(transformer.nodes()).toContain(stickers[0]);
});

test('selects a sticker when it is clicked, and deselects the sticker when a non-sticker part of the canvas is clicked', async () => {
  const { stage, sticker } = await renderEditorWithFaceSticker({
    x: 50,
    y: 50,
    width: 10,
    height: 10,
    score: 0.9,
  });

  const transformer = getTransformer(stage);
  expect(transformer.nodes()).toHaveLength(0);

  // selects the sticker when it is clicked

  // テストの保守性のためスタンプのヒットエリア調整の影響を受けにくい中央をクリックする
  const stickerCenter = getCenter(sticker, stage);
  // テストの安定化のためCanvasにスタンプが描画されてクリック可能になるのを待機
  await expect.poll(() => stage.getIntersection(stickerCenter)).toBe(sticker);
  await userEvent.click(stage.container(), { position: stickerCenter });

  await expect.poll(() => transformer.nodes()).toContain(sticker);

  // deselects a sticker when a non-sticker part of the canvas is clicked

  await userEvent.click(stage.container(), { position: { x: 0, y: 0 } });

  await expect.poll(() => transformer.nodes()).toHaveLength(0);
});

test('enables the delete sticker button only when a selected sticker exists', async () => {
  const { screen, stage } = await renderEditor({
    detectedFaces: [{ x: 0, y: 0, width: 10, height: 10, score: 0.9 }],
  });

  expect(stage.find('.sticker')).toHaveLength(1);
  const transformer = getTransformer(stage);
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
  const { stage, sticker } = await renderEditorWithFaceSticker({
    x: 50,
    y: 50,
    width: 10,
    height: 10,
    score: 0.9,
  });
  const initialPosition = sticker.position();
  // テストの保守性のためスタンプのヒットエリア調整の影響を受けにくい中央をドラッグする
  const start = getCenter(sticker, stage);
  const end = { x: start.x + 50, y: start.y + 30 };
  // テストの安定化のためCanvasにスタンプが描画されてドラッグ可能になるのを待機
  await expect.poll(() => stage.getIntersection(start)).toBe(sticker);

  dragOnStage(stage, start, end);

  expect(sticker.x()).toBeCloseTo(initialPosition.x + 50);
  expect(sticker.y()).toBeCloseTo(initialPosition.y + 30);
});

test('resizes a sticker with its aspect ratio locked when its handle is dragged', async () => {
  const { stage, sticker } = await renderEditorWithFaceSticker({
    x: 50,
    y: 50,
    width: 10,
    height: 10,
    score: 0.9,
  });
  const initialWidth = sticker.width();
  const initialAspectRatio = initialWidth / sticker.height();
  const stickerCenter = getCenter(sticker, stage);
  await expect.poll(() => stage.getIntersection(stickerCenter)).toBe(sticker);
  await userEvent.click(stage.container(), { position: stickerCenter });

  const transformer = getTransformer(stage);
  await expect.poll(() => transformer.nodes()).toContain(sticker);
  const bottomRightAnchor = transformer.findOne<Konva.Shape>('.bottom-right');
  if (!bottomRightAnchor) {
    throw new Error('Expected a bottom-right Transformer anchor');
  }

  const start = bottomRightAnchor.absolutePosition();
  const end = { x: start.x + 50, y: start.y + 30 };
  await expect.poll(() => stage.getIntersection(start)).toBe(bottomRightAnchor);

  dragOnStage(stage, start, end);

  // リサイズ中にキャンバス上ではstickerノードのwidthとheightではなくscaleXとscaleYが更新される
  // リサイズ終了後にReactのstickerの状態が更新され、その更新がキャンバス上のstickerノードに反映されるのを待機
  await expect.poll(() => sticker.width()).toBeGreaterThan(initialWidth);
  expect(sticker.width() / sticker.height()).toBeCloseTo(initialAspectRatio);
});

test('shows sticker instructions when the first sticker is added', async () => {
  const { screen } = await renderEditor();

  await expect
    .element(screen.getByText('スタンプを選んでドラッグで移動、'))
    .not.toBeInTheDocument();

  await screen.getByRole('button', { name: 'スタンプを追加' }).click();

  await expect
    .element(screen.getByText('スタンプを選んでドラッグで移動、'))
    .toBeVisible();
});

test('dismissed sticker instructions stay closed when another sticker is added', async () => {
  const { screen } = await renderEditor({
    detectedFaces: [{ x: 0, y: 0, width: 10, height: 10, score: 0.9 }],
  });

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

  const { screen } = await renderEditor({ withToaster: true });

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

  const { screen } = await renderEditor({ withToaster: true });

  await screen.getByRole('button', { name: '画像を保存' }).click();

  await expect
    .element(screen.getByText('画像のダウンロードに失敗しました'))
    .toBeVisible();

  toast.dismiss();
});

async function renderEditorWithTwoStickers() {
  const { screen, stage } = await renderEditor();
  const addButton = screen.getByRole('button', { name: 'スタンプを追加' });

  await addButton.click();
  await addButton.click();

  const stickers = stage.find('.sticker');
  expect(stickers).toHaveLength(2);

  const transformer = getTransformer(stage);
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

async function renderEditorWithFaceSticker(face: Face) {
  const { stage } = await renderEditor({ detectedFaces: [face] });
  const stickers = stage.find('.sticker');
  expect(stickers).toHaveLength(1);

  return { stage, sticker: stickers[0]! };
}

async function renderEditor({
  detectedFaces = [],
  withToaster = false,
}: {
  detectedFaces?: Face[];
  withToaster?: boolean;
} = {}) {
  const editor = (
    <EditorScreen
      image={createTestImage()}
      stickerImage={createTestImage()}
      detectedFaces={detectedFaces}
      onReset={() => {}}
    />
  );
  const screen = await render(
    withToaster ? (
      <>
        <Toaster position="top-right" />
        {editor}
      </>
    ) : (
      editor
    ),
  );
  const stage = Konva.stages.at(-1)!;
  // テストの安定化のためResizeObserverによるStageサイズの計算結果が反映されるのを待機
  await expect.poll(() => stage.width()).toBeGreaterThan(0);
  await expect.poll(() => stage.height()).toBeGreaterThan(0);

  return { screen, stage };
}

function getTransformer(stage: Konva.Stage) {
  const transformer = stage.findOne<Konva.Transformer>('Transformer');
  if (!transformer) {
    throw new Error('Expected a Transformer');
  }

  return transformer;
}

function getCenter(sticker: Konva.Node, stage: Konva.Stage) {
  const { x, y, width, height } = sticker.getClientRect({ relativeTo: stage });

  return { x: x + width / 2, y: y + height / 2 };
}

function dragOnStage(
  stage: Konva.Stage,
  start: { x: number; y: number },
  end: { x: number; y: number },
) {
  const content = stage.container().querySelector('.konvajs-content');
  if (!content) {
    throw new Error('Expected Konva content');
  }
  const stageRect = stage.container().getBoundingClientRect();
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
}
