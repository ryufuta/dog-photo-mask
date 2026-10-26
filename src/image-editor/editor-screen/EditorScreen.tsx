import { useEffect, useEffectEvent, useReducer, useState } from 'react';
import * as Sentry from '@sentry/react';
import { Copy, CornerDownLeft, Download, Smile, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button.tsx';
import type { Face } from '@/face-detection/face-detector.ts';
import { createSticker } from '@/sticker/sticker.ts';
import { CanvasArea } from './CanvasArea.tsx';
import { copyCanvas, downloadCanvas } from './export-canvas.ts';
import {
  createInitialStickerEditorState,
  stickerEditorReducer,
} from './sticker-editor-state.ts';
import { Toolbar } from './Toolbar.tsx';

type Props = {
  image: HTMLImageElement;
  stickerImage: HTMLImageElement;
  detectedFaces: Face[];
  onReset: () => void;
};

const secondaryButtonClassName =
  'border-[#d7c3a5] bg-[#f5e6cc] text-[#513b2c] hover:bg-[#ecd6b3] hover:text-[#513b2c]';

export function EditorScreen({
  image,
  stickerImage,
  detectedFaces,
  onReset,
}: Props) {
  const [stickerEditor, dispatch] = useReducer(
    stickerEditorReducer,
    detectedFaces,
    createInitialStickerEditorState,
  );
  const [isHelpDismissed, setIsHelpDismissed] = useState(false);

  const { stickers, selectedStickerId } = stickerEditor;

  function handleAddSticker() {
    const imageWidth = image.naturalWidth;
    const imageHeight = image.naturalHeight;
    const newSticker = createSticker({ imageWidth, imageHeight });
    dispatch({ type: 'added', sticker: newSticker });
  }

  async function handleCopy() {
    try {
      await copyCanvas(image, stickerImage, stickers);
      toast.success('画像をコピーしました');
    } catch (error) {
      Sentry.captureException(error);

      toast.error('画像のコピーに失敗しました');
    }
  }

  async function handleDownload() {
    try {
      await downloadCanvas(image, stickerImage, stickers);
    } catch (error) {
      Sentry.captureException(error);

      toast.error('画像のダウンロードに失敗しました');
    }
  }

  function handleDeleteSticker() {
    dispatch({ type: 'deleted' });
  }

  const handleDeleteKey = useEffectEvent((e: KeyboardEvent) => {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      handleDeleteSticker();
    }
  });

  useEffect(() => {
    window.addEventListener('keydown', handleDeleteKey);

    return () => {
      window.removeEventListener('keydown', handleDeleteKey);
    };
  }, []);

  return (
    <div className="-mt-6 flex flex-1 flex-col">
      <Toolbar label="スタンプの編集">
        <Button
          type="button"
          variant="outline"
          className={secondaryButtonClassName}
          onClick={handleAddSticker}
        >
          <Smile aria-hidden="true" />
          スタンプを追加
        </Button>
        <Button
          type="button"
          variant="outline"
          className={secondaryButtonClassName}
          onClick={handleDeleteSticker}
          disabled={selectedStickerId === null}
        >
          <X aria-hidden="true" />
          スタンプを削除
        </Button>
      </Toolbar>
      <CanvasArea
        image={image}
        stickerImage={stickerImage}
        faces={detectedFaces}
        stickers={stickers}
        selectedStickerId={selectedStickerId}
        onSelectSticker={(id) => dispatch({ type: 'selected', id })}
        onStickerDragEnd={(id, position) =>
          dispatch({ type: 'moved', id, position })
        }
        onStickerTransformEnd={(id, rect) =>
          dispatch({ type: 'transformed', id, rect })
        }
        showHelp={stickers.length > 0 && !isHelpDismissed}
        onDismissHelp={() => setIsHelpDismissed(true)}
      />
      <div>
        <Toolbar label="画像の保存">
          <Button
            type="button"
            variant="outline"
            className={secondaryButtonClassName}
            onClick={() => {
              void handleCopy();
            }}
          >
            <Copy aria-hidden="true" />
            画像をコピー
          </Button>
          <Button
            type="button"
            className="bg-[#513b2c] hover:bg-[#6a4e39]"
            onClick={() => {
              void handleDownload();
            }}
          >
            <Download aria-hidden="true" />
            画像を保存
          </Button>
        </Toolbar>
      </div>
      <div className="mt-5 text-center">
        <Button type="button" variant="link" onClick={onReset}>
          <CornerDownLeft aria-hidden="true" />
          別の写真を選ぶ
        </Button>
      </div>
    </div>
  );
}
