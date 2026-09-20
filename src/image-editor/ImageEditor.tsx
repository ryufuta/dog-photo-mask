import { useState } from 'react';
import { LoadingIndicator } from '@/components/LoadingIndicator.tsx';
import { detectFaces, type Face } from '@/face-detection/face-detector.ts';
import { loadImage } from '@/lib/utils.ts';
import { EditorScreen } from './editor-screen/EditorScreen.tsx';
import { UploadScreen } from './upload-screen/UploadScreen.tsx';

type State =
  | { type: 'upload' }
  | { type: 'loading' }
  | { type: 'detecting' }
  | { type: 'editing'; image: HTMLImageElement; detectedFaces: Face[] };

export function ImageEditor() {
  const [state, setState] = useState<State>({ type: 'upload' });

  async function handleUpload(file: File) {
    setState({ type: 'loading' });

    try {
      const image = await loadImage(file);
      let detectedFaces: Face[] = [];
      if (import.meta.env.DEV) {
        setState({ type: 'detecting' });
        detectedFaces = await detectFaces(image);
      }
      setState({ type: 'editing', image, detectedFaces });
    } catch (error) {
      setState({ type: 'upload' });
      // TODO: UIに表示するよう変更
      console.error(error);
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
          detectedFaces={state.detectedFaces}
          onReset={() => {
            setState({ type: 'upload' });
          }}
        />
      );
  }
}
