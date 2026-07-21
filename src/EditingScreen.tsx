import { CanvasArea } from '@/CanvasArea.tsx';

export function EditingScreen({ image }: { image: HTMLImageElement }) {
  return (
    <section className="flex min-h-svh flex-col p-5">
      {/* TODO: 画像編集・保存用のツールバーやボタンを追加 */}
      <CanvasArea image={image} />
    </section>
  );
}
