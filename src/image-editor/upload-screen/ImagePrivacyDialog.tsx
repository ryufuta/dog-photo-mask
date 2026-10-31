import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';

export function ImagePrivacyDialog() {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="secondary"
            className="text-brand bg-highlight-surface focus-visible:ring-brand inline-block h-auto w-full px-3 py-2 text-center leading-relaxed font-semibold whitespace-normal hover:bg-[#eee0bf] focus-visible:ring-offset-2"
          >
            <span className="inline-block">🔒 写真はサーバーに</span>
            <span className="inline-block">
              送信されません。
              <Info
                className="ml-1 inline-block size-3.5 align-middle"
                aria-hidden="true"
              />
            </span>
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>なぜ、写真がサーバーに送られないの？</DialogTitle>
        </DialogHeader>
        <div className="modal-scroll -mx-4 max-h-[50vh] space-y-4 overflow-y-auto px-4 text-sm leading-7 md:text-base">
          <p>写真の加工は、お使いのスマホやPCのブラウザ内で完結します。</p>
          <p>
            写真を選ぶと、ブラウザがその写真を読み込みます。人の顔を見つける処理も、スタンプを重ねる処理も、お使いの端末内で行います。
          </p>
          <p>
            そのため、選んだ写真をサーバーにアップロードする必要がありません。このサービスが写真をサーバーに保存することもありません。
          </p>
          <p>
            加工後の画像もブラウザ内で作成し、端末へのダウンロードやコピーができます。チャットやSNSへの共有は、ご自身で行います。
          </p>
          <p className="text-brand bg-highlight-surface rounded-lg p-3 leading-6">
            ページの表示や顔の検出に必要なプログラムの取得などには通信を使いますが、選んだ写真は送信しません。
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
