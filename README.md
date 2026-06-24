## 開発

開発コンテナは macOS ホストでのみ動作確認されています。事前に GitHub の fine-grained PAT（[発行ページ](https://github.com/settings/personal-access-tokens/new)）を作成し、macOS Keychain に保存してください。詳細は各 Dockerfile の冒頭に記載されているコメントを参照してください。

### VS Code 設定のリンク（共通）

`.vscode/` 配下の各 `*.sample.jsonc` から、`sample` を除いた名前のシンボリックリンク（例: `launch.json → launch.sample.jsonc`）を生成します。スクリプトは上流から取得します（コンテナ方式に依らず共通の初回作業です）。

```
curl -L -o .vscode/link-vscode-config.sh https://raw.githubusercontent.com/uraitakahito/hello-javascript/refs/tags/1.5.2/.vscode/link-vscode-config.sh
chmod 755 .vscode/link-vscode-config.sh
.vscode/link-vscode-config.sh
```

### Apple Container を使う場合(今後推奨)

macOS 26 以降（Apple Silicon）で利用できます。

```
curl -L -O https://raw.githubusercontent.com/uraitakahito/hello-javascript/refs/tags/1.5.2/Dockerfile.dev.container
curl -L -O https://raw.githubusercontent.com/uraitakahito/hello-javascript/refs/tags/1.5.2/docker-entrypoint.sh
chmod 755 docker-entrypoint.sh
```

環境構築の詳細な手順は [Dockerfile.dev.container](https://github.com/uraitakahito/hello-javascript/blob/1.5.2/Dockerfile.dev.container) の冒頭に記載されています。

### Docker を使う場合(メンテナンス遅れがち)

```
curl -L -O https://raw.githubusercontent.com/uraitakahito/hello-javascript/refs/tags/1.5.2/Dockerfile.dev.docker
curl -L -O https://raw.githubusercontent.com/uraitakahito/hello-javascript/refs/tags/1.5.2/docker-entrypoint.sh
chmod 755 docker-entrypoint.sh
```

環境構築の詳細な手順は [Dockerfile.dev.docker](https://github.com/uraitakahito/hello-javascript/blob/1.5.2/Dockerfile.dev.docker) の冒頭に記載されています。

