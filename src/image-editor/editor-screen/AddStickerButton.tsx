type Props = {
  onAddSticker: () => void;
};

export function AddStickerButton({ onAddSticker }: Props) {
  return (
    <button
      onClick={onAddSticker}
      className="bg-surface rounded-md px-4 py-2 text-sm font-medium"
    >
      スタンプ追加
    </button>
  );
}
