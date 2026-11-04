![アプリの画像](public/ogp.png)

# Dog Photo Mask

犬の写真に写り込んだ人の顔を自動で検出し、スタンプで隠して共有できるWebアプリです。  
検出された顔の位置は編集でき、検出されなかった顔にもスタンプを追加できます。

## アプリの使い方

公開版: https://dog-photo-mask.ryufuta.workers.dev/

1. PNGまたはJPEG画像を1枚選ぶか、アップロード領域にドラッグ＆ドロップします。
2. 顔検出が終わると編集画面が開きます。検出された顔にはスタンプが配置されます。
3. 「スタンプを追加」でスタンプを追加します。スタンプをドラッグして移動し、選択時のハンドルで大きさを調整できます。
4. スタンプを選んで「スタンプを削除」を押すと削除できます。キーボードのDeleteまたはBackspaceでも削除できます。
5. 「画像を保存」で画像ファイルをダウンロードするか、「画像をコピー」でクリップボードにコピーします。
6. 「別の写真を選ぶ」で最初の画面に戻ります。

## 開発環境

- Node.js `^26.13.0`
- pnpm `12.17.0`
- mise（Node.jsとpnpmのバージョン管理に使用。任意）

このリポジトリはmiseの設定を`mise.toml`で管理しています。miseを使う場合は、miseをインストールしたうえで次を実行してください。

```sh
mise install
```

miseを使わない場合は、上記のNode.jsとpnpmを別途用意してから依存関係をインストールします。

Node.jsについてはnvmにも対応しています。
nvmを使う場合は、nvmをインストールしたうえで次を実行してください。

```sh
nvm install
nvm use
```

pnpm `12.17.0`を用意したうえで、依存パッケージをインストールします。

```sh
pnpm install
```

## 開発サーバー

```sh
pnpm dev
```

ターミナルに表示されるURL（通常は http://localhost:5173 ）をブラウザーで開きます。  
起動時にMediaPipeのWebAssemblyファイルが`public/`にコピーされます。

## テストと品質チェック

```sh
pnpm test          # Vitestによるユニット・コンポーネントテスト
pnpm test:e2e      # PlaywrightによるE2Eテスト（Chromium）
pnpm lint          # ESLint
pnpm format:check  # Prettierのフォーマット確認
pnpm build         # TypeScriptチェックと本番ビルド
```

E2EテストではPlaywrightのChromiumブラウザーが必要です。未インストールの場合は次を実行してください。

```sh
pnpm exec playwright install chromium
```

## 本番ビルドとプレビュー

```sh
pnpm build
pnpm preview
```

ターミナルに表示されるURL（通常は http://localhost:4173 ）をブラウザーで開きます。

Cloudflare環境でのプレビューおよびデプロイには、Cloudflareの認証設定が必要です。

```sh
pnpm build
pnpm cloudflare:preview
pnpm deploy
```

`pnpm cloudflare:preview`を実行すると、現在のGitブランチ用のプレビューがCloudflare上に作成または更新されます。完了時に表示されるプレビューURLをブラウザーで開いてください。  
`pnpm deploy`は本番環境へデプロイし、完了時に表示されるURLからアプリを確認できます。

## 技術スタック

- React / TypeScript / Vite
- Tailwind CSS
- MediaPipe Tasks Visionによる顔検出
- Konvaによる画像・スタンプ編集
- Cloudflare Workers
- Vitest（Browser Mode）によるユニット・コンポーネントテスト
- PlaywrightによるE2Eテスト
- GitHub ActionsによるCI（Lint、フォーマット、テスト、ビルド）

## ライセンス

[MIT License](LICENSE)
