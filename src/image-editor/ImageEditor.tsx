import { useState } from 'react';
import { EditorScreen } from './editor-screen/EditorScreen.tsx';
import { UploadScreen } from './upload-screen/UploadScreen.tsx';

export function ImageEditor() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  return image ? (
    <EditorScreen
      image={image}
      onReset={() => {
        setImage(null);
      }}
    />
  ) : (
    <UploadScreen onUpload={setImage} />
  );
}
