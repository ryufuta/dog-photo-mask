import { useState } from 'react';
import { LoadingIndicator } from '@/components/LoadingIndicator.tsx';
import { loadImage } from '@/lib/utils.ts';
import { EditorScreen } from './editor-screen/EditorScreen.tsx';
import { UploadScreen } from './upload-screen/UploadScreen.tsx';

type State =
  | { type: 'upload' }
  | { type: 'loading' }
  | { type: 'editing'; image: HTMLImageElement };

export function ImageEditor() {
  const [state, setState] = useState<State>({ type: 'upload' });

  async function handleUpload(file: File) {
    setState({ type: 'loading' });

    try {
      const image = await loadImage(file);
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
