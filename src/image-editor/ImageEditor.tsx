import { useState } from 'react';
import { EditorScreen } from './editor-screen/EditorScreen.tsx';
import { UploadScreen } from './upload-screen/UploadScreen.tsx';

type State =
  | { type: 'upload' }
  | { type: 'loading' }
  | { type: 'editing'; image: HTMLImageElement };

export function ImageEditor() {
  const [state, setState] = useState<State>({ type: 'upload' });

  function handleUpload(file: File) {
    setState({ type: 'loading' });

    const objURL = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      setState({ type: 'editing', image });
      URL.revokeObjectURL(objURL);
    };
    image.onerror = (e) => {
      setState({ type: 'upload' });
      URL.revokeObjectURL(objURL);
      // TODO: UIに表示するよう変更
      console.error(e);
    };
    image.src = objURL;
  }

  switch (state.type) {
    case 'upload':
      return <UploadScreen onUpload={handleUpload} />;

    case 'loading':
      return (
        <section className="min-h-svh p-5">
          <p className="bg-surface p-10 text-center">画像読み込み中...</p>
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
