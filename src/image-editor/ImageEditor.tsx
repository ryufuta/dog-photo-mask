import { useState } from 'react';
import { toast } from 'sonner';
import { LoadingIndicator } from '@/components/LoadingIndicator.tsx';
import { detectFaces, type Face } from '@/face-detection/face-detector.ts';
import { ImageLoadError, loadImage } from '@/lib/utils.ts';
import { loadStickerImage } from '@/sticker/sticker-image.ts';
import { EditorScreen } from './editor-screen/EditorScreen.tsx';
import { UploadScreen } from './upload-screen/UploadScreen.tsx';

type State =
  | { type: 'upload' }
  | { type: 'loading' }
  | { type: 'detecting' }
  | {
      type: 'editing';
      image: HTMLImageElement;
      stickerImage: HTMLImageElement;
      detectedFaces: Face[];
    };

export function ImageEditor() {
  const [state, setState] = useState<State>({ type: 'upload' });

  async function handleUpload(file: File) {
    setState({ type: 'loading' });

    try {
      const image = await loadImage(file);

      setState({ type: 'detecting' });
      const [stickerImage, detectedFaces] = await Promise.all([
        loadStickerImage(),
        detectFaces(image),
      ]);

      setState({ type: 'editing', image, stickerImage, detectedFaces });
      if (detectedFaces.length === 0) {
        toast.warning('顔を検出できませんでした');
      }
    } catch (error) {
      setState({ type: 'upload' });
      if (error instanceof ImageLoadError) {
        toast.error('画像を読み込めませんでした', {
          description:
            'ファイルが壊れている可能性があります。もう一度お試しいただくか、別の画像を選択してください。',
        });
      } else {
        console.error(error);
      }
    }
  }

  switch (state.type) {
    case 'upload':
      return (
        <UploadScreen
          onUpload={(file: File) => {
            void handleUpload(file);
          }}
        />
      );

    case 'loading':
      return (
        <section className="min-h-svh p-5">
          <LoadingIndicator message="画像読み込み中..." />
        </section>
      );

    case 'detecting':
      return (
        <section className="min-h-svh p-5">
          <LoadingIndicator message="顔検出中..." />
        </section>
      );

    case 'editing':
      return (
        <EditorScreen
          image={state.image}
          stickerImage={state.stickerImage}
          detectedFaces={state.detectedFaces}
          onReset={() => {
            setState({ type: 'upload' });
          }}
        />
      );
  }
}
