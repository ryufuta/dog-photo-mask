import { useState } from 'react';
import { DropZone } from '@/DropZone.tsx';
import { EditingScreen } from '@/EditingScreen.tsx';

export function ImageEditor() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  return image ? (
    <EditingScreen image={image} />
  ) : (
    <DropZone setImage={setImage} />
  );
}
