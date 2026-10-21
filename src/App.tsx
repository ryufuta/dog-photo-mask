import githubLogoBlack from '@/assets/github-logo-black.svg';
import logo from '@/assets/logo.svg';
import { DogPattern } from '@/components/DogPattern.tsx';
import { LegalDialog } from '@/components/LegalDialog.tsx';
import { Toaster } from '@/components/ui/sonner.tsx';
import { ImageEditor } from '@/image-editor/ImageEditor.tsx';
import { PrivacyPolicyContent } from './PrivacyPolicyContent.tsx';
import { TermsContent } from './TermsContent.tsx';

function App() {
  return (
    <>
      <DogPattern />
      <div className="site-column relative mx-auto flex min-h-svh w-full max-w-160 flex-col bg-[#fffaf0]">
        <Toaster position="top-right" theme="light" closeButton />
        <header className="flex items-center justify-center gap-2 px-3 sm:gap-3">
          <img
            className="size-8 shrink-0 -rotate-12 sm:size-12"
            src={logo}
            alt=""
          />
          <h1 className="site-logo my-5 text-center text-[clamp(1.5rem,5.8vw,3rem)] leading-tight font-semibold sm:my-8">
            Dog Photo Mask
          </h1>
        </header>
        <main className="mx-auto flex w-full flex-1 flex-col p-5 lg:px-10">
          <ImageEditor />
        </main>
        <footer className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-3 py-4 text-sm md:gap-4 md:py-6">
          <LegalDialog title="利用規約">
            <TermsContent />
          </LegalDialog>
          <LegalDialog title="プライバシーポリシー">
            <PrivacyPolicyContent />
          </LegalDialog>
          <a
            href="https://github.com/ryufuta/dog-photo-mask"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHubリポジトリ"
          >
            <img src={githubLogoBlack} alt="" className="size-6" />
          </a>
        </footer>
      </div>
    </>
  );
}

export default App;
