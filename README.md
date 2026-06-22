## 開発

開発コンテナは macOS ホストでのみ動作確認されています。事前に GitHub の fine-grained PAT（[発行ページ](https://github.com/settings/personal-access-tokens/new)）を作成し、macOS Keychain に保存してください。必要な権限などの詳細は各 Dockerfile の冒頭を参照してください。

```
security add-generic-password -a "$USER" -s development-pat -w
```

### Docker を使う場合

以下の手順で必要なファイルをダウンロードしてください。

```
curl -L -O https://raw.githubusercontent.com/uraitakahito/hello-javascript/refs/tags/1.5.1/Dockerfile.dev.docker
curl -L -O https://raw.githubusercontent.com/uraitakahito/hello-javascript/refs/tags/1.5.1/docker-entrypoint.sh
chmod 755 docker-entrypoint.sh
```

環境構築の詳細な手順は [Dockerfile.dev.docker](https://github.com/uraitakahito/hello-javascript/blob/1.5.1/Dockerfile.dev.docker) の冒頭に記載されています。

### Apple Container を使う場合

macOS 26 以降（Apple Silicon）で利用できます。以下の手順で必要なファイルをダウンロードしてください。

```
curl -L -O https://raw.githubusercontent.com/uraitakahito/hello-javascript/refs/tags/1.5.1/Dockerfile.dev.container
curl -L -O https://raw.githubusercontent.com/uraitakahito/hello-javascript/refs/tags/1.5.1/docker-entrypoint.sh
chmod 755 docker-entrypoint.sh
```

環境構築の詳細な手順は [Dockerfile.dev.container](https://github.com/uraitakahito/hello-javascript/blob/1.5.1/Dockerfile.dev.container) の冒頭に記載されています。

## 本番環境

ビルドと実行の手順は [Dockerfile.prod](Dockerfile.prod) の冒頭に記載されています。
