import { useState } from 'react';
import { EditingScreen } from './editor-screen/EditingScreen.tsx';
import { UploadScreen } from './upload-screen/UploadScreen.tsx';

export function ImageEditor() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  return image ? (
    <EditingScreen image={image} />
  ) : (
    <UploadScreen setImage={setImage} />
  );
}
