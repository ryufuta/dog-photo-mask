import { render } from 'vitest-browser-react';
import { ImageEditor } from './ImageEditor.tsx';

test('shows the upload screen initially', async () => {
  const screen = await render(<ImageEditor />);

  await expect
    .element(
      screen.getByText(
        'ここにファイルをドラッグ&ドロップするか, クリックしてファイルを選択してください',
      ),
    )
    .toBeVisible();
});

// TODO: 機能追加と設計変更後にその他の状態遷移のテストを追加
