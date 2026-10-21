import { type FileRejection, useDropzone } from 'react-dropzone';
import { cn } from 'cn';
import { ArrowUp, Camera, ImageIcon } from 'lucide-react';
import shareExample from '@/assets/share-example.webp';
import smileSticker from '@/assets/stickers/smile.png';
import { ImagePrivacyDialog } from '@/components/ImagePrivacyDialog.tsx';
import { Button } from '@/components/ui/button.tsx';

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
    open,
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
    const [file] = acceptedFiles;
    if (file && acceptedFiles.length === 1 && fileRejections.length === 0) {
      onUpload(file);
    }
  }

  return (
    <div className="-mt-3">
      <div
        {...getRootProps({
          'aria-label': 'ファイルのドロップエリア',
          className: cn(
            'flex min-h-52 flex-col gap-5 items-center justify-center cursor-pointer rounded-lg border-2 border-dashed p-4 text-center transition-colors md:min-h-60 md:p-6',
            {
              'border-border bg-card hover:border-sky-300 hover:bg-sky-50 active:bg-sky-100':
                !isFocused && !isDragActive,
              'border-sky-400 bg-sky-50 ring-4 ring-sky-200/60':
                isFocused || isDragActive,
            },
          ),
        })}
      >
        <input {...getInputProps({ 'aria-label': '写真を選択' })} />

        <div
          className="flex items-center justify-center gap-5 text-[#513b2c]"
          aria-hidden="true"
        >
          <Camera
            className="hidden size-12 pointer-coarse:block"
            strokeWidth={1.75}
          />
          <ImageIcon className="size-12" strokeWidth={1.75} />
        </div>

        <p className="text-sm leading-relaxed md:text-base pointer-coarse:hidden">
          <span className="block">
            <span className="inline-block">ここにファイルを</span>
            <span className="inline-block">ドラッグ&ドロップするか、</span>
          </span>
          <span className="inline-block">クリックして</span>
          <span className="inline-block">ファイルを選択してください。</span>
        </p>
        <p className="hidden text-sm leading-relaxed md:text-base pointer-coarse:block">
          <span className="block">タップして写真を撮影するか、</span>
          <span className="inline-block">写真ライブラリから</span>
          <span className="inline-block">選択してください。</span>
        </p>
      </div>

      <section
        className="mt-5 space-y-5 text-center"
        aria-labelledby="about-heading"
      >
        <ArrowUp
          className="mx-auto size-8 text-[#513b2c]"
          strokeWidth={4}
          aria-hidden="true"
        />
        <h2
          id="about-heading"
          className="text-xl leading-relaxed font-bold text-[#513b2c] sm:text-2xl"
        >
          <span className="block lg:inline">愛犬の写真をシェア。</span>
          <span className="block lg:inline">人の顔はスタンプで隠す。</span>
        </h2>
        <div className="grid items-center gap-5 sm:grid-cols-[180px_1fr] sm:gap-6">
          <div className="order-2 space-y-3 text-sm leading-7 sm:order-0 sm:col-start-2 sm:row-start-1 sm:text-left sm:text-base">
            <p>
              <span className="block lg:inline">チャットやSNSで</span>
              <span className="block lg:inline">
                犬の写真をシェアする前に。
              </span>
              <span className="inline-block lg:inline">
                写り込んだ人の顔を自動で見つけ、
              </span>
              <span className="inline-block lg:inline">
                スタンプで隠します。
              </span>
            </p>
            <p>
              <span className="block lg:inline">
                見つけられなかった顔にも、
              </span>
              <span className="block lg:inline">自分で好きな位置に</span>
              <span className="block lg:inline">スタンプを追加できます。</span>
            </p>
            <ImagePrivacyDialog />
          </div>
          <figure className="mx-auto w-45 space-y-2 sm:col-start-1 sm:row-start-1">
            <div
              className="relative overflow-hidden rounded-xl"
              role="img"
              aria-label="加工例：犬の顔はそのままに、一緒に写った2人の顔を笑顔のスタンプで隠した写真"
            >
              <img
                src={shareExample}
                width={360}
                height={480}
                alt=""
                className="block w-full"
              />
              <img
                src={smileSticker}
                alt=""
                className="absolute top-[12%] left-[18%] w-[27%]"
              />
              <img
                src={smileSticker}
                alt=""
                className="absolute top-[9%] left-[54%] w-[27%]"
              />
            </div>
            <figcaption className="text-muted-foreground text-xs leading-relaxed">
              <span className="block">犬の顔はそのまま、</span>
              <span className="block">人の顔を隠せます。</span>
            </figcaption>
          </figure>
        </div>
        <Button
          type="button"
          onClick={open}
          className="h-12 w-full max-w-sm bg-[#513b2c] hover:bg-[#6a4e39] sm:hidden"
        >
          <ImageIcon aria-hidden="true" />
          写真を選ぶ
        </Button>
      </section>

      <div aria-live="polite">
        {rejectedItems.length > 0 && (
          <div className="border-destructive/20 bg-destructive/10 text-destructive mt-4 rounded-lg border p-4 text-sm">
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
