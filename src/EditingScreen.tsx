import { AddStickerButton } from '@/AddStickerButton.tsx';
import { CanvasArea } from '@/CanvasArea.tsx';
import { Toolbar } from '@/Toolbar.tsx';

export function EditingScreen({ image }: { image: HTMLImageElement }) {
  return (
    <section className="flex min-h-svh flex-col p-5">
      <Toolbar>
        <AddStickerButton />
      </Toolbar>
      <CanvasArea image={image} />
    </section>
  );
}
