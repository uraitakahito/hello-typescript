## 開発

以下の手順で必要なファイルをダウンロードしてください。

```
curl -L -O https://raw.githubusercontent.com/uraitakahito/hello-javascript/refs/tags/1.3.0/Dockerfile.dev
curl -L -O https://raw.githubusercontent.com/uraitakahito/hello-javascript/refs/tags/1.3.0/docker-entrypoint.sh
chmod 755 docker-entrypoint.sh
```

環境構築の詳細な手順は [Dockerfile.dev](https://github.com/uraitakahito/hello-javascript/blob/1.3.0/Dockerfile.dev) の冒頭に記載されています。

## 本番環境

ビルドと実行の手順は [Dockerfile.prod](Dockerfile.prod) の冒頭に記載されています。
