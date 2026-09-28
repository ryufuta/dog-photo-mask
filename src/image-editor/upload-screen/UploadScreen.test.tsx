import { render } from 'vitest-browser-react';
import { UploadScreen } from './UploadScreen.tsx';

test('accepts a PNG file', async () => {
  const onUpload = vi.fn();

  const screen = await render(<UploadScreen onUpload={onUpload} />);

  const imageFile = createTestFile();
  await screen.getByRole('button').upload(imageFile);

  expect(onUpload).toHaveBeenCalledOnce();
  // fileに`path`などの情報を付与したオブジェクトがonDrop内部でonUploadに渡される
  // そのため以下は失敗する
  // expect(onUpload).toHaveBeenCalledWith(file);
});

test('accepts a JPEG file', async () => {
  const onUpload = vi.fn();

  const screen = await render(<UploadScreen onUpload={onUpload} />);

  const imageFile = createTestFile('dummy.jpg', 'image/jpeg');
  await screen.getByRole('button').upload(imageFile);

  expect(onUpload).toHaveBeenCalledOnce();
});

test('rejects multiple PNG/JPEG files', async () => {
  const onUpload = vi.fn();

  const screen = await render(<UploadScreen onUpload={onUpload} />);

  const imageFiles = [
    createTestFile(),
    createTestFile('dummy.jpg', 'image/jpeg'),
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

test('rejects a non-PNG/JPEG file', async () => {
  const onUpload = vi.fn();

  const screen = await render(<UploadScreen onUpload={onUpload} />);

  const file = createTestFile('dummy.tiff', 'image/tiff');
  await screen.getByRole('button').upload(file);

  await expect
    .element(
      screen.getByText(
        'PNG形式またはJPEG形式のファイルとして認識できませんでした。別の画像を選択してください。',
      ),
    )
    .toBeVisible();
  expect(onUpload).not.toHaveBeenCalled();
});

test('rejects a PNG file and a non-PNG/JPEG file when they are selected at the same time', async () => {
  const onUpload = vi.fn();

  const screen = await render(<UploadScreen onUpload={onUpload} />);

  const files = [createTestFile(), createTestFile('dummy.txt', 'text/plain')];
  await screen.getByRole('button').upload(files);

  await expect
    .element(
      screen.getByText(
        'PNG形式またはJPEG形式のファイルとして認識できませんでした。別の画像を選択してください。',
      ),
    )
    .toBeVisible();
  expect(onUpload).not.toHaveBeenCalled();
});

test('accepts a PNG or JPEG file when it is dropped', async () => {
  const onUpload = vi.fn();

  const screen = await render(<UploadScreen onUpload={onUpload} />);

  const file = createTestFile();
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);

  const dropzone = screen.getByLabelText('ファイルのドロップエリア').element();
  dropzone.dispatchEvent(
    new DragEvent('drop', {
      bubbles: true,
      cancelable: true,
      dataTransfer,
    }),
  );

  await vi.waitFor(() => {
    expect(onUpload).toHaveBeenCalledExactlyOnceWith(file);
  });
});

function createTestFile(
  fileName: string = 'dummy.png',
  type: string = 'image/png',
) {
  return new File(['dummy'], fileName, { type });
}
