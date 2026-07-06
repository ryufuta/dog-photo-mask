import React from 'react';
import { useDropzone } from 'react-dropzone';

export function DropZone({
  setImage,
}: {
  setImage: React.Dispatch<React.SetStateAction<HTMLImageElement | null>>;
}) {
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const objURL = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setImage(img);
      URL.revokeObjectURL(objURL);
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
    <section
      className="container"
      style={{ minHeight: '100vh', padding: '20px' }}
    >
      <div
        {...getRootProps({
          className: 'dropzone',
          style: {
            border: '2px dashed #ccc',
            borderRadius: '8px',
            padding: '40px',
            textAlign: 'center',
            backgroundColor: isDragAccept
              ? '#d4edda'
              : isDragReject
                ? '#f8d7da'
                : 'white',
            transition: 'all 0.2s',
          },
        })}
      >
        <input {...getInputProps()} />

        {isDragGlobal && !isDragAccept && !isDragReject && (
          <p style={{ color: '#6c757d' }}>
            ここにファイルをドロップしてください
          </p>
        )}

        {isDragAccept && (
          <p style={{ color: '#28a745', fontWeight: 'bold' }}>
            ✅ ここにファイルをドロップしてください
          </p>
        )}

        {isDragReject && (
          <p style={{ color: '#dc3545', fontWeight: 'bold' }}>
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
          <p style={{ color: '#dc3545', fontWeight: 'bold' }}>
            ファイルを読み込めませんでした
          </p>
          <ul>{rejectedItems}</ul>
        </div>
      )}
    </section>
  );
}
