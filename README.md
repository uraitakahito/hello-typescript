## 開発

開発コンテナは macOS ホストでのみ動作確認されています。事前に GitHub の fine-grained PAT（[発行ページ](https://github.com/settings/personal-access-tokens/new)）を作成し、macOS Keychain に保存してください。必要な権限などの詳細は各 Dockerfile の冒頭を参照してください。

```
security add-generic-password -a "$USER" -s development-pat -w
```

### Apple Container を使う場合(今後推奨)

macOS 26 以降（Apple Silicon）で利用できます。

```
curl -L -O https://raw.githubusercontent.com/uraitakahito/hello-javascript/refs/tags/1.5.1/Dockerfile.dev.container
curl -L -O https://raw.githubusercontent.com/uraitakahito/hello-javascript/refs/tags/1.5.1/docker-entrypoint.sh
chmod 755 docker-entrypoint.sh
```

環境構築の詳細な手順は [Dockerfile.dev.container](https://github.com/uraitakahito/hello-javascript/blob/1.5.1/Dockerfile.dev.container) の冒頭に記載されています。

### Docker を使う場合

```
curl -L -O https://raw.githubusercontent.com/uraitakahito/hello-javascript/refs/tags/1.5.1/Dockerfile.dev.docker
curl -L -O https://raw.githubusercontent.com/uraitakahito/hello-javascript/refs/tags/1.5.1/docker-entrypoint.sh
chmod 755 docker-entrypoint.sh
```

環境構築の詳細な手順は [Dockerfile.dev.docker](https://github.com/uraitakahito/hello-javascript/blob/1.5.1/Dockerfile.dev.docker) の冒頭に記載されています。

