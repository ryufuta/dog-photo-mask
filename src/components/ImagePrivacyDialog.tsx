import { Info } from 'lucide-react';
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
          <button
            type="button"
            className="w-full rounded-lg bg-[#f5ebd6] px-3 py-2 text-center text-sm leading-relaxed font-semibold text-[#513b2c] transition-colors hover:bg-[#eee0bf] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#513b2c]"
          >
            <span className="inline-block">🔒 写真はサーバーに</span>
            <span className="inline-block">
              送信されません。
              <Info
                className="ml-1 inline-block size-3.5 align-middle"
                aria-hidden="true"
              />
            </span>
          </button>
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
          <p className="rounded-lg bg-[#f5ebd6] p-3 leading-6 text-[#513b2c]">
            ページの表示や顔の検出に必要なプログラムの取得などには通信を使いますが、選んだ写真は送信しません。
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
