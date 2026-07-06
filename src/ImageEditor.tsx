import { useState } from 'react';
import { EditingScreen } from '@/EditingScreen.tsx';
import { UploadScreen } from '@/UploadScreen.tsx';

export function ImageEditor() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  return image ? (
    <EditingScreen image={image} />
  ) : (
    <UploadScreen setImage={setImage} />
  );
}
