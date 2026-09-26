import { useDropzone } from 'react-dropzone';
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
      'image/*': [],
    },
    onDrop: handleDrop,
  });

  const rejectedItems = fileRejections.map(({ file, errors }) => (
    <li key={file.name}>
      {file.name}: {errors.map((e) => e.code).join(',')}
    </li>
  ));

  function handleDrop(acceptedFiles: File[]) {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    onUpload(file);
  }

  return (
    <section className="min-h-svh p-5">
      <div
        {...getRootProps({
          className: cn(
            'cursor-pointer rounded-lg border-2 border-dashed p-10 text-center transition-colors',
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

      {rejectedItems.length > 0 && (
        <div>
          <p className="font-bold text-red-600">
            ファイルを読み込めませんでした。画像ファイルを1つだけ選択してください。
          </p>
          <ul>{rejectedItems}</ul>
        </div>
      )}
    </section>
  );
}
