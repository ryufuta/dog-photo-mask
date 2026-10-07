import { Toaster } from 'sonner';
import logo from '@/assets/logo.svg';
import { ImageEditor } from '@/image-editor/ImageEditor.tsx';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <header className="flex items-center justify-center gap-3">
        <img className="h-9 w-9 shrink-0 lg:h-14 lg:w-14" src={logo} alt="" />
        <h1 className="my-5 text-center text-4xl font-medium tracking-tight lg:my-8 lg:text-6xl">
          Dog Photo Mask
        </h1>
      </header>
      <ImageEditor />
    </>
  );
}

export default App;
