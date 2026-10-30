import dogFacesPattern from '@/assets/dog-faces-pattern-small.webp';
import { useElementSize } from '@/hooks/useElementSize.ts';

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
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 hidden overflow-hidden sm:block"
      aria-hidden="true"
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${Math.max(1, columns)}, ${CELL_SIZE}px)`,
          gridAutoRows: CELL_SIZE,
        }}
      >
        {Array.from({ length: columns * rows }, (_, index) => {
          const row = Math.floor(index / columns);
          const column = index % columns;
          return (
            <span
              key={`${row}-${column}`}
              className="bg-no-repeat"
              style={{
                backgroundImage: `url(${dogFacesPattern})`,
                backgroundSize: `${CELL_SIZE * 2}px ${CELL_SIZE * 3}px`,
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
