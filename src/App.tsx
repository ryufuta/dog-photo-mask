import { Toaster } from 'sonner';
import githubLogoBlack from '@/assets/github-logo-black.svg';
import githubLogoWhite from '@/assets/github-logo-white.svg';
import logo from '@/assets/logo.svg';
import { ImageEditor } from '@/image-editor/ImageEditor.tsx';

function App() {
  return (
    <div className="flex min-h-svh flex-col">
      <Toaster position="top-right" />
      <header className="flex items-center justify-center gap-3">
        <img className="size-9 shrink-0 lg:size-14" src={logo} alt="" />
        <h1 className="my-5 text-center text-4xl font-medium tracking-tight lg:my-8 lg:text-6xl">
          Dog Photo Mask
        </h1>
      </header>
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col p-5">
        <ImageEditor />
      </main>
      <footer className="flex items-center justify-center gap-4 py-6 text-sm">
        {/* TODO: 利用規約とプライバシーポリシーはモーダルで表示する */}
        <button type="button">利用規約</button>
        <button type="button">プライバシーポリシー</button>
        <a
          href="https://github.com/ryufuta/dog-photo-mask"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHubリポジトリ"
        >
          <picture>
            <source
              media="(prefers-color-scheme: dark)"
              srcSet={githubLogoWhite}
            />
            <img src={githubLogoBlack} alt="" className="size-6" />
          </picture>
        </a>
      </footer>
    </div>
  );
}

export default App;
