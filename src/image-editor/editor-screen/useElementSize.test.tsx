import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { useElementSize } from './useElementSize.ts';

function TestComponent() {
  const [ref, size] = useElementSize<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{ width: '100vw', height: '100vh' }}
      data-testid="target"
    >
      {size.width} x {size.height}
    </div>
  );
}

test('monitors the size of the target element', async () => {
  await page.viewport(100, 200);
  const screen = await render(<TestComponent />);
  const target = screen.getByTestId('target');

  await expect.element(target).toHaveTextContent('100 x 200');

  await page.viewport(200, 300);

  await expect.element(target).toHaveTextContent('200 x 300');
});
