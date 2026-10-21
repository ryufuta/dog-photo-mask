import { useElementSize } from '@/image-editor/editor-screen/useElementSize.ts';

const CELL_SIZE = 82;
// Align each face independently within its cell in the existing sprite sheet.
const positions = [
  '-3px -6px',
  '-78px -6px',
  '-3px -84px',
  '-78px -84px',
  '-3px -162px',
  '-78px -162px',
];

export function DogPattern() {
  const [ref, size] = useElementSize<HTMLDivElement>();
  const columns = Math.ceil(size.width / CELL_SIZE);
  const rows = Math.ceil(size.height / CELL_SIZE);

  return (
    <div ref={ref} className="dog-pattern" aria-hidden="true">
      <div
        className="dog-pattern-grid"
        style={{
          gridTemplateColumns: `repeat(${Math.max(1, columns)}, ${CELL_SIZE}px)`,
        }}
      >
        {Array.from({ length: columns * rows }, (_, index) => {
          const row = Math.floor(index / columns);
          const column = index % columns;
          return (
            <span
              key={`${row}-${column}`}
              className="dog-pattern-face"
              style={{
                backgroundPosition:
                  positions[(row * 2 + column) % positions.length],
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
