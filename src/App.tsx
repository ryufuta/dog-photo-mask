import { Toaster } from 'sonner';
import { ImageEditor } from '@/image-editor/ImageEditor.tsx';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <h1 className="my-5 text-center text-4xl font-medium tracking-tight lg:my-8 lg:text-6xl">
        Dog Photo Mask
      </h1>
      <ImageEditor />
    </>
  );
}

export default App;
