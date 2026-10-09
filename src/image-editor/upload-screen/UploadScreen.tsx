import { type FileRejection, useDropzone } from 'react-dropzone';
import { cn } from '@/lib/cn.ts';

type Props = {
  onUpload: (file: File) => void;
};

export function UploadScreen({ onUpload }: Props) {
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragActive,
    fileRejections,
  } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/png': [],
      'image/jpeg': [],
    },
    onDrop: handleDrop,
  });

  const rejectedItems = fileRejections.map(({ file, errors }) => (
    <li key={`${file.name}-${file.size}`}>
      <span className="font-medium">{file.name}</span>
      <ul className="mt-1 list-inside list-disc">
        {errors.map((error) => (
          <li key={error.code}>{getRejectionMessage(error.code)}</li>
        ))}
      </ul>
    </li>
  ));

  function handleDrop(acceptedFiles: File[], fileRejections: FileRejection[]) {
    if (acceptedFiles.length === 1 && fileRejections.length === 0) {
      onUpload(acceptedFiles[0]);
    }
  }

  return (
    <div>
      <div className="mb-6 space-y-2 text-center">
        <p className="text-lg font-medium">
          画像をアップロードすると人の顔を自動でスタンプで隠します。
        </p>
        <p className="text-sm text-zinc-500">
          🔒 画像はサーバーに送信されません。
        </p>
      </div>

      <div
        {...getRootProps({
          'aria-label': 'ファイルのドロップエリア',
          className: cn(
            'flex items-center justify-center min-h-60 cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors',
            {
              'border-border-muted bg-surface hover:border-border-hover hover:bg-surface-hover':
                !isFocused && !isDragActive,
              'border-border-active bg-surface-active shadow-inner ring-4 ring-ring':
                isFocused || isDragActive,
            },
          ),
        })}
      >
        <input {...getInputProps()} />

        <p>
          ここにファイルをドラッグ&ドロップするか,
          クリックしてファイルを選択してください
        </p>
      </div>

      <div aria-live="polite">
        {rejectedItems.length > 0 && (
          <div className="border-danger-border bg-danger-surface text-danger-foreground mt-4 rounded-lg border p-4 text-sm">
            <p className="font-bold">ファイルをアップロードできませんでした</p>
            <p className="mt-1">
              PNG形式またはJPEG形式のファイルを1枚だけ選択してください。
            </p>
            <ul className="mt-3 space-y-2">{rejectedItems}</ul>
          </div>
        )}
      </div>
    </div>
  );
}

function getRejectionMessage(code: string) {
  switch (code) {
    case 'file-invalid-type':
      return 'PNG形式またはJPEG形式のファイルとして認識できませんでした。別の画像を選択してください。';
    case 'too-many-files':
      return '一度にアップロードできるファイルは1枚までです。';
    default:
      return 'このファイルは使用できません。';
  }
}
