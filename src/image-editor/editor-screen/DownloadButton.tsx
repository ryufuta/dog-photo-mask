type Props = {
  onDownload: () => void;
};

export function DownloadButton({ onDownload }: Props) {
  return (
    <button
      onClick={onDownload}
      className="bg-surface rounded-md px-4 py-2 text-sm font-medium"
    >
      ダウンロード
    </button>
  );
}
