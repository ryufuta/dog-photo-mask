type Props = {
  onCopy: () => void;
};

export function CopyButton({ onCopy }: Props) {
  return (
    <button
      onClick={onCopy}
      className="bg-surface rounded-md px-4 py-2 text-sm font-medium"
    >
      コピー
    </button>
  );
}
