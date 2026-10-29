import logo from '@/assets/logo.svg';
import { Button } from '@/components/ui/button.tsx';

export function ErrorPage() {
  return (
    <div className="flex min-h-svh items-center justify-center px-5 py-10">
      <main className="border-brand/10 shadow-brand/10 bg-surface w-full max-w-xl rounded-3xl border px-6 py-10 text-center shadow-xl sm:px-12 sm:py-14">
        <img className="mx-auto size-16 -rotate-12" src={logo} alt="" />
        <p className="mt-6 text-sm font-semibold tracking-[0.18em] text-[#8a6746]">
          DOG PHOTO MASK
        </p>
        <h1 className="text-brand mt-3 text-2xl font-bold sm:text-3xl">
          うまく表示できませんでした
        </h1>
        <p
          role="alert"
          className="mx-auto mt-4 max-w-sm text-sm leading-7 text-[#6b6259]"
        >
          予期しないエラーが発生しました。ページを再読み込みして、もう一度お試しください。
        </p>
        <Button
          className="bg-brand mt-8 h-12 rounded-full px-6 hover:bg-[#6a4e39]"
          onClick={() => window.location.reload()}
        >
          ページを再読み込み
        </Button>
      </main>
    </div>
  );
}
