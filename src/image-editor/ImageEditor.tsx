import { useState } from 'react';
import { LoadingIndicator } from '@/components/LoadingIndicator.tsx';
import { detectFaces } from '@/face-detection/face-detector.ts';
import { loadImage } from '@/lib/utils.ts';
import { EditorScreen } from './editor-screen/EditorScreen.tsx';
import { UploadScreen } from './upload-screen/UploadScreen.tsx';

type State =
  | { type: 'upload' }
  | { type: 'loading' }
  | { type: 'detecting' }
  | { type: 'editing'; image: HTMLImageElement };

export function ImageEditor() {
  const [state, setState] = useState<State>({ type: 'upload' });

  async function handleUpload(file: File) {
    setState({ type: 'loading' });

    try {
      const image = await loadImage(file);
      if (import.meta.env.DEV) {
        setState({ type: 'detecting' });
        const detectedFaces = await detectFaces(image);
        console.log(detectedFaces);
      }
      setState({ type: 'editing', image });
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
          onReset={() => {
            setState({ type: 'upload' });
          }}
        />
      );
  }
}
