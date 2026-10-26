import { useLayoutEffect, useRef, useState } from 'react';

export function useElementSize<T extends HTMLElement>() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const setRef = useRef<T>(null);

  useLayoutEffect(() => {
    const targetElement = setRef.current;
    if (!targetElement) return;

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;

      const contentBoxSize = entry.contentBoxSize[0];
      if (!contentBoxSize) return;

      setSize({
        width: contentBoxSize.inlineSize,
        height: contentBoxSize.blockSize,
      });
    });

    observer.observe(targetElement);
    return () => observer.disconnect();
  }, []);

  return [setRef, size] as const;
}
