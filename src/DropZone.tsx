import { useDropzone } from 'react-dropzone';

export function DropZone() {
  const {
    getRootProps,
    getInputProps,
    isDragGlobal,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
  });

  // TODO: 動作確認用なので画像表示できるようになったら削除する
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
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

      {/* TODO: 動作確認用なので画像表示できるようになったら削除する */}
      <aside>
        <h4>Accepted files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}
