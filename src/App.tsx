import { ImageEditor } from '@/ImageEditor.tsx';

function App() {
  return (
    <>
      <h1 className="my-5 text-center text-4xl font-medium tracking-tight text-[var(--text-h)] lg:my-8 lg:text-6xl">
        Dog Photo Mask
      </h1>
      <ImageEditor />
    </>
  );
}

export default App;
