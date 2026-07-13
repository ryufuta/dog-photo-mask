import React from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/cn.ts';

export function UploadScreen({
  setImage,
}: {
  setImage: React.Dispatch<React.SetStateAction<HTMLImageElement | null>>;
}) {
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    const objURL = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setImage(img);
      URL.revokeObjectURL(objURL);
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(objURL);
      // TODO: UIに表示するよう変更
      console.error(e);
    };
    img.src = objURL;
  };

  const {
    getRootProps,
    getInputProps,
    isDragGlobal,
    isDragActive,
    isDragAccept,
    isDragReject,
    fileRejections,
  } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    onDrop,
  });

  const rejectedItems = fileRejections.map(({ file, errors }) => (
    <li key={file.name}>
      {file.name}: {errors.map((e) => e.code).join(',')}
    </li>
  ));

  return (
    <section className="min-h-svh p-5">
      <div
        {...getRootProps({
          className: cn(
            'rounded-lg border-2 border-dashed border-gray-300 p-10 text-center transition-colors',
            {
              'bg-green-100': isDragAccept,
              'bg-red-100': isDragReject,
              'bg-surface': !isDragAccept && !isDragReject,
            },
          ),
        })}
      >
        <input {...getInputProps()} />

        {isDragGlobal && !isDragAccept && !isDragReject && (
          <p className="text-gray-500">ここにファイルをドロップしてください</p>
        )}

        {isDragAccept && (
          <p className="font-bold text-green-500">
            ✅ ここにファイルをドロップしてください
          </p>
        )}

        {isDragReject && (
          <p className="font-bold text-red-600">
            ❌ PNG形式またはJPEG形式のファイルを1つだけ選択してください
          </p>
        )}

        {!isDragGlobal && !isDragActive && (
          <p>
            ここにファイルをドラッグ&ドロップするか,
            クリックしてファイルを選択してください
          </p>
        )}
      </div>

      {rejectedItems.length > 0 && (
        <div>
          <p className="font-bold text-red-600">
            ファイルを読み込めませんでした
          </p>
          <ul>{rejectedItems}</ul>
        </div>
      )}
    </section>
  );
}
