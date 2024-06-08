# 11 宣言ファイル

## 11.2 ランタイム値の宣言

宣言ファイルでは、関数や変数などのランタイム値の作成はできませんが、それらの構成体が存在することを、declareキーワードを使って宣言できます。

declareを使った変数宣言は、通常の変数宣言と同じ構文を使いますが、初期値が許可されない点が異なります。

```typescript
// types.d.ts
declare let declared: string; // Ok
declare let initializer: string = "Hello, world!"; // error
```

関数やクラスも、それらの通常の形式と同じように宣言されますが、関数やメソッドの本体は持てません。

```typescript
// faries.d.ts
declare function canGrantWish(wish: string): boolean; // Ok
declare function grantWish(with: string) { return true; } // error
```

### 11.2.1 グローバルな値

import文やexport文を持たないTypeScriptファイルは、 **モジュール(module)** ではなく **スクリプト(script)** として扱われるので、それらの中で宣言されている構成体は、グローバルに利用できます。

```typescript
// globals.d.ts
declare const version: string;

// version.ts
export function logVersion() {
  console.log(`Version: ${version}`); // Ok
}
```

### 11.2.2 グローバルなインタフェースのマージ

```html
<script type="text/javascript">
window.myVersion = "1.0.0";
</script>
```

```typescript
// types/window.d.ts
interface Window {
  myVersion: string;
}

// index.ts
export function logWindowVersion() {
  console.log(`Window version: ${window.myVersion}`); // Ok
}
```

### 11.2.3 グローバルな拡張

declare globalという構文が用意されています。これにより、そのブロックの内容が -- それらの周囲は違うとしても -- グローバルなコンテキストの中にあることを指定できます。

```typescript
// types.d.ts
// (モジュールコンテキスト)

declare global {
  // (グローバルコンテキスト)
}

// (モジュールコンテキスト)
```

```typescript
// types/data.d.ts
export interface Data {
  version: string;
}

// types/globals.d.ts
import { Data } from "./data";
declare global {
  const globallyDeclared: Data;
}
declare const locallyDeclared: Data;

// index.ts
import { Data } from "./data";
function logData(data: Data) { // Ok
  console.log(data.version);
}
logData(globallyDeclared); // Ok
logData(locallyDeclared); // error
```

## 11.3 組み込み宣言

## 11.4 モジュール宣言

```typescript
// modules.d.ts
declare module "my-example-lib" {
  export const value: string;
}

// index.ts
import { value } from "my-example-lib";
console.log(value); // Ok
```

## 11.5 パッケージの型

### 11.5.1 declaration

TypeScriptは、JavaScriptの出力と一緒に、d.tsの出力を入力ファイルに対して作成するdeclarationオプションを提供しています。

例えば、次のようなindex.tsファイルがあると仮定して

```typescript
// index.ts
export const greet = (text: string) => {
  console.log(`Hello, ${text}!`);
};
```

declarationオプションを指定し、moduleを"es2015"、targetを"es2015"に設定すると、次のような出力が生成されます。

```typescript
// index.d.ts
export declare const greet: (text: string) => void;

// index.js
export const greet = (text) => {
  console.log(`Hello, ${text}!`);
};
```

