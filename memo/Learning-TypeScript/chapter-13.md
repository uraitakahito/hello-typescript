# 13 構成オプション

## 13.1 tscのオプション

## 13.2 TSConfigファイル

## 13.3 ファイルのインクルード

## 13.4 拡張機能

### 13.4.2 resolveJsonModule

```json
// activist.json
{
  "activist": "Mary Astell",
}
```

```typescript
// usesActivist.ts
import activist from "./activist.json";
console.log(activist); // Ok
```

## 13.5 JavaScriptファイルの出力

### 13.5.5 noEmit

ソースファイルをコンパイルしてJavaScriptを出力するのに、TypeScript以外のツールを利用するプロジェクトでは、ファイルを全く出力しないよう設定できます。noEmitを有効にすると、純粋に型チェッカーとして動きます。

## 13.6 型チェック

## 13.7 モジュール
