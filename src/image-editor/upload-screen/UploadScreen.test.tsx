import { render } from 'vitest-browser-react';
import { UploadScreen } from './UploadScreen.tsx';

test('accepts an image file', async () => {
  const onUpload = vi.fn();

  const screen = await render(<UploadScreen onUpload={onUpload} />);

  const imageFile = createTestFile();
  await screen.getByRole('button').upload(imageFile);

  expect(onUpload).toHaveBeenCalledOnce();
  // fileに`path`などの情報を付与したオブジェクトがonDrop内部でonUploadに渡される
  // そのため以下は失敗する
  // expect(onUpload).toHaveBeenCalledWith(file);
});

test('rejects multiple image files', async () => {
  const onUpload = vi.fn();

  const screen = await render(<UploadScreen onUpload={onUpload} />);

  const imageFiles = [
    createTestFile('dummy1.png'),
    createTestFile('dummy2.png'),
  ];
  await screen.getByRole('button').upload(imageFiles);

  await expect
    .element(
      screen
        .getByText('一度にアップロードできるファイルは1枚までです。')
        .first(),
    )
    .toBeVisible();
  expect(onUpload).not.toHaveBeenCalled();
});

test('rejects a non-image file', async () => {
  const onUpload = vi.fn();

  const screen = await render(<UploadScreen onUpload={onUpload} />);

  const file = createTestFile('dummy.txt', 'text/plain');
  await screen.getByRole('button').upload(file);

  await expect
    .element(
      screen.getByText(
        '画像ファイルとして認識できませんでした。別の画像を選択してください。',
      ),
    )
    .toBeVisible();
  expect(onUpload).not.toHaveBeenCalled();
});

test('rejects an image file and a non-image file when they are selected at the same time', async () => {
  const onUpload = vi.fn();

  const screen = await render(<UploadScreen onUpload={onUpload} />);

  const files = [createTestFile(), createTestFile('dummy.txt', 'text/plain')];
  await screen.getByRole('button').upload(files);

  await expect
    .element(
      screen.getByText(
        '画像ファイルとして認識できませんでした。別の画像を選択してください。',
      ),
    )
    .toBeVisible();
  expect(onUpload).not.toHaveBeenCalled();
});

function createTestFile(
  fileName: string = 'dummy.png',
  type: string = 'image/png',
) {
  return new File(['dummy'], fileName, { type });
}
